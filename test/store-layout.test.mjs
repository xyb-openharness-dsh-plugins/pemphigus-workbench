/* 资料目录真机状态测试（2026-11-11 用户整改）
 * 口径红线：拒绝主目录/桌面/下载根目录/tmp；取消与拒绝零副作用；目录树幂等创建。
 * 测试全部落在系统临时目录，不碰用户主目录与仓内目录。 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { StoreLayout, rejectReason, SUBDIRS } from '../dsh/store-layout.js'
import { Workbench } from '../dsh/workbench.js'

/* 合法路径用例不能用系统 tmp（本仓口径拒绝 tmp 子树）：落在仓内 output/（gitignored，不随包）。 */
const HOME = undefined
const scratch = mkdtempSync(join(process.cwd(), 'output', 'store-test-'))

test('口径：空/相对路径拒绝', () => {
  assert.match(rejectReason(''), /路径为空/)
  assert.match(rejectReason('   '), /路径为空/)
  assert.match(rejectReason('relative/dir'), /绝对路径/)
})

test('口径：主目录、桌面、下载根、tmp 全部拒绝（含 tmp 子树）', () => {
  const h = process.env.HOME || '/home/x'
  assert.equal(rejectReason(h), '拒绝主目录：不能把整个家目录当资料目录')
  assert.equal(rejectReason(join(h, 'Desktop')), '拒绝桌面')
  assert.equal(rejectReason(join(h, 'Downloads')), '拒绝下载根目录')
  assert.match(rejectReason('/tmp'), /拒绝 tmp/)
  assert.match(rejectReason('/tmp/pemphigus/资料'), /拒绝 tmp/)
  assert.match(rejectReason(join(tmpdir(), 'x')), /拒绝 tmp/)
})

test('ensure()：默认树幂等创建 + 状态文件 + 文件计数', () => {
  const base = join(scratch, 'default-root')
  const layout = new StoreLayout(base)
  const st1 = layout.ensure()
  assert.equal(st1.storeRoot, base)
  assert.equal(st1.isOverride, false)
  assert.deepEqual(st1.dirs.map((d) => d.name), ['原件', '派生'])
  for (const d of st1.dirs) assert.ok(existsSync(d.path), `子目录未创建：${d.path}`)
  assert.ok(existsSync(join(base, 'store-layout.json')), '状态文件未写')
  writeFileSync(join(base, '原件', 'report-a.txt'), 'x')
  const st2 = layout.ensure()
  assert.equal(st2.dirs[0].fileCount, 1, '文件计数应反映真实内容')
})

test('choose()：合法路径建树+覆盖记录；拒绝零副作用；文件路径拒绝', () => {
  const root = join(scratch, 'root-with-choose')
  const layout = new StoreLayout(root)
  layout.ensure()
  const target = join(scratch, '资料', '天疱疮')
  const r = layout.choose(target)
  assert.equal(r.ok, true, `合法路径应通过：${r.reason || ''}`)
  assert.ok(existsSync(join(target, '原件')))
  assert.equal(r.state.storeRoot, target)
  assert.equal(r.state.isOverride, true)
  assert.deepEqual(JSON.parse(readFileSync(join(root, 'store-root.json'), 'utf8')).path, target)
  assert.ok(r.note.includes('重启后生效'), '必须提示重启生效')

  const before = readFileSync(join(root, 'store-root.json'), 'utf8')
  const bad = layout.choose(join(process.env.HOME || '/home/x', 'Desktop'))
  assert.equal(bad.ok, false)
  assert.match(bad.reason, /拒绝桌面|拒绝主目录/)
  assert.equal(readFileSync(join(root, 'store-root.json'), 'utf8'), before, '拒绝不得写覆盖记录')

  const fileP = join(scratch, 'afile.txt')
  writeFileSync(fileP, 'x')
  const rf = layout.choose(fileP)
  assert.equal(rf.ok, false)
  assert.match(rf.reason, /是文件/)
})

test('Workbench.open()：激活即建默认目录树（真机状态）', () => {
  const root = join(scratch, 'wb-root')
  const wb = new Workbench({ root, seedDemo: false })
  wb.open()
  const st = wb.storeInfo()
  assert.equal(st.ready !== false, true, `storeState 不应报错：${st.error || ''}`)
  assert.ok(existsSync(join(root, '原件')))
  assert.ok(existsSync(join(root, '派生')))
  wb.close()
})

test('choose() 后 Workbench 重开读到覆盖目录（重启生效口径）', () => {
  const root = join(scratch, 'wb-override')
  const target = join(scratch, 'override-target')
  const wb1 = new Workbench({ root, seedDemo: false })
  wb1.open()
  const r = wb1.chooseStoreRoot(target)
  assert.equal(r.ok, true, r.reason || '')
  wb1.close()
  const wb2 = new Workbench({ root, seedDemo: false })
  wb2.open()
  assert.equal(wb2.storeInfo().storeRoot, target, '重开应读到覆盖记录')
  assert.ok(existsSync(join(target, '原件')))
  wb2.close()
})

test('取消/空输入：零副作用（不建目录、不写覆盖）', () => {
  const root = join(scratch, 'wb-cancel')
  const wb = new Workbench({ root, seedDemo: false })
  wb.open()
  const r = wb.chooseStoreRoot('  ')
  assert.equal(r.ok, false)
  assert.match(r.reason, /路径为空/)
  assert.ok(!existsSync(join(root, 'store-root.json')), '取消不得写覆盖记录')
  wb.close()
})

test('清理：测试临时目录', () => {
  rmSync(scratch, { recursive: true, force: true })
  assert.ok(true)
})
