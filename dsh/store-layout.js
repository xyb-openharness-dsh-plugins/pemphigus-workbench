/**
 * 资料目录真机状态（2026-11-11 用户整改：装机时必须是真机状态，不留示意桩）。
 *
 * 家族口径（settings 页同屏）：
 *   - 默认资料目录 = 宿主给的 config.root（dshHomePath('pemphigus')），激活即创建子目录；
 *   - 子目录：原件区（报告原件登记）/ 派生区（可重算产物）；数据库在根（SQLite + WAL）；
 *   - 更改位置：用户可指定其它目录，先过「拒绝主目录、桌面、下载根目录、tmp」口径，
 *     通过则创建目录树并写覆盖记录（<root>/store-root.json），**重启后生效**（Workbench 在
 *     open() 时绑定目录）；用户取消或口径拒绝都不产生副作用。
 * 演示数据与正式目录分开：清理只按 demo_id，不按目录名猜测（docs/04）。
 */
import { mkdirSync, existsSync, statSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { isAbsolute, join, resolve, sep } from 'node:path';
import { homedir, tmpdir } from 'node:os';

export const SUBDIRS = [
  { key: 'originals', label: '原件区', name: '原件', note: '报告与化验单原件按登记存放；只登记不判读' },
  { key: 'derived', label: '派生区', name: '派生', note: '可重算的解析与导出产物；删了也能从原件重建' },
];
export const LAYOUT_VERSION = 1;
const OVERRIDE_FILE = 'store-root.json';
const STATE_FILE = 'store-layout.json';

const TMP_ROOTS = () => new Set(['/tmp', tmpdir()].filter(Boolean));

/** 口径校验：返回拒绝原因字符串，通过返回 null。纯函数（不碰盘）。 */
export function rejectReason(rawPath, { home = homedir() } = {}) {
  const path = typeof rawPath === 'string' ? rawPath.trim() : '';
  if (!path) return '路径为空：请填写或选择一个目录';
  if (!isAbsolute(path)) return `必须是绝对路径（当前输入：${path.slice(0, 80)}）`;
  const resolved = resolve(path);
  if (resolved === home) return '拒绝主目录：不能把整个家目录当资料目录';
  if (resolved === join(home, 'Desktop')) return '拒绝桌面';
  if (resolved === join(home, 'Downloads')) return '拒绝下载根目录';
  for (const t of TMP_ROOTS()) {
    if (resolved === t || resolved.startsWith(t + sep)) return '拒绝 tmp：临时目录不保存业务资料';
  }
  return null;
}

/** 目录树就绪（幂等）；返回每个子目录的最终路径。 */
export function createTree(base) {
  const made = [];
  for (const sub of SUBDIRS) {
    const dir = join(base, sub.name);
    if (!existsSync(dir)) { mkdirSync(dir, { recursive: true }); made.push(sub.name); }
    else if (!statSync(dir).isDirectory()) throw new Error(`路径被同名文件占用：${dir}`);
  }
  return made;
}

function countFiles(dir) {
  try {
    let n = 0;
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isFile()) n += 1;
    }
    return n;
  } catch { return 0; }
}

/**
 * 布局管理：绑定 workbench 的数据根（root）与当前生效的资料目录。
 * 覆盖记录存在 root 下（根由宿主管理、总是可写），资料目录本身可以在任何通过口径的盘位。
 */
export class StoreLayout {
  constructor(root) {
    if (typeof root !== 'string' || !root.trim()) throw new Error('StoreLayout 需要 root');
    this.root = resolve(root);
    this.override = null;
  }

  /** 读取覆盖记录；文件缺失/损坏都按无覆盖处理（不抛，根目录必须可用）。 */
  #readOverride() {
    try {
      const raw = JSON.parse(readFileSync(join(this.root, OVERRIDE_FILE), 'utf8'));
      if (raw && typeof raw.path === 'string' && raw.path.trim()) return { path: resolve(raw.path), setOn: raw.setOn || '' };
    } catch { /* 无覆盖或损坏：走默认 */ }
    return null;
  }

  /** 幂等创建当前资料目录树并回写状态文件；返回真实状态对象。 */
  ensure() {
    if (!existsSync(this.root)) {
      try { mkdirSync(this.root, { recursive: true }); } catch (e) { throw new Error(`数据根不可创建（${this.root}）：${e.message}`); }
    }
    this.override = this.#readOverride();
    let base = this.root;
    let overrideNote = null;
    if (this.override) {
      const reason = rejectReason(this.override.path);
      if (reason == null && existsSync(this.override.path)) base = this.override.path;
      else overrideNote = `覆盖记录不可用（${reason || '目录不存在'}），已回退默认资料目录`;
    }
    const made = createTree(base);
    const state = {
      layoutVersion: LAYOUT_VERSION,
      root: this.root,
      storeRoot: base,
      isOverride: Boolean(this.override && base === this.override.path),
      overrideNote,
      dbFile: join(this.root, 'pemphigus-workbench.sqlite'),
      dirs: SUBDIRS.map((sub) => ({ ...sub, path: join(base, sub.name), fileCount: countFiles(join(base, sub.name)) })),
      policy: '拒绝主目录、桌面、下载根目录、tmp；更改位置重启后生效',
      made,
    };
    try { writeFileSync(join(this.root, STATE_FILE), JSON.stringify({ layoutVersion: LAYOUT_VERSION, storeRoot: base, setOn: this.override?.setOn || new Date().toISOString().slice(0, 10) }, null, 2)); } catch { /* 状态文件写失败不阻断 */ }
    return state;
  }

  /** 更改位置：口径校验 → 建树 → 写覆盖记录。拒绝/异常零副作用，返回 {ok, ...}。 */
  choose(rawPath) {
    const reason = rejectReason(rawPath);
    if (reason) return { ok: false, reason };
    const target = resolve(String(rawPath).trim());
    try {
      if (existsSync(target) && !statSync(target).isDirectory()) return { ok: false, reason: '该路径是文件，不是目录' };
      const made = createTree(target);
      writeFileSync(join(this.root, OVERRIDE_FILE), JSON.stringify({ path: target, setOn: new Date().toISOString().slice(0, 10) }, null, 2));
      this.override = { path: target, setOn: new Date().toISOString().slice(0, 10) };
      const state = this.ensure();
      return { ok: true, state, made: made.length ? made : ['目录树已就绪'], note: '资料目录已创建并记录；数据库与档案引用在新位置重启后生效，当前会话仍用旧目录。' };
    } catch (e) {
      return { ok: false, reason: `创建失败：${String(e.message || e)}` };
    }
  }
}
