# MORNING-REVIEW · 2026-11-11 晨审（pemphigus-workbench 夜班）

## 一、一句话结论
天疱疮工作台 M0–M9 全链走完：认领→原型→schema→快照→开发版→装机加载→发布/回填草稿→starter 回流；六个闸口自动签认（待追认），V3 UI 人眼走查待人工；无停闸。

## 二、原型审查入口
- 打开方式：`open /Users/qinxiaoqiang/Downloads/pemphigus-workbench/prototypes/v0.2/index.html`（file:// 可直接双击）
- 截图位置与清单：`docs/screenshots/v0.2-01..08`（看板/指标卡正反面/一图秀/发作区间带/疾病概要整页/试验折叠收展）
- 探针复核命令（须带 --url 打本仓原型，禁 examples 假绿）：
  `node scripts/probe-disease-primer.mjs --url http://127.0.0.1:<port>/prototypes/v0.2/index.html`
- 2026-11-11 实测：P1–P9 10/10、A1–A10 13/13、M2 全量 36/36、check 22 项 0✗、单测 34/34、双 audit 44/44

## 三、自动签认清单（全部待追认）
docs/signoffs/：G1（00:25）· G2（03:45）· G3（04:05）· V1（05:45 记录时点，实际 03:10）· V2/V3（03:30）
- 共同声明：自动签认 ≠ 用户已确认；晨审逐份追认后按需改写结论词。

## 四、待用户决策项
1. 默认值追认（DEV-REQUIREMENTS §五）：品牌占位名「小愈宝 HealPal」、MinerU 默认未接入、评分只按医生原文、NMPA 利妥昔超说明书口径（L3 检索级，建议说明书数据库复核）
2. V3 UI 走查：真机会话打开工作台逐页走查 + 实机截图刷新 README（装机已在 profiles/web，重启 Desktop 即见）
3. 冻结待发：GitHub release（docs/release-draft/github-release-v0.1.0.md + tgz sha256 4214e46a…）与 BACKLOG 回填 PR（docs/release-draft/backlog-backfill-pr.md）已备稿，晨审追认后执行
4. 装机过程动了 profile：24 个失效 file: 依赖改指 release/rebuilt/ 同版本重打包件（零升级副作用）——晨审知悉
5. 私有仓推送：本机 commit 至 107bc36，未推送（晨审确认后 `git push origin main`，勿推 tag）

## 五、消耗
- 时长：2026-11-10 23:02 → 2026-11-11 04:15（约 5 小时 13 分，未到 8:00 时间盒）
- token：客户端可见数据不可得，写「未取得」
- 免费模型约束：全程单模型执行，未发生额度/鉴权类重试停跑

## 六、未验证与异常
- V3 UI 人眼走查：未验证（服务层已实测：真机库 20 表、subjects 2、metric_defs 8）
- 真机实机截图：未取得（需重启后新建会话再截图）
- chictr_online：FAILED（未查过，不写零结果）；chictr 离线语料 NEEDS_SETUP（仅胰腺癌覆盖）
- probe-page-view A4b 曾失败：判定为探针竞态（+50ms BODY/+120ms 回位实测），修探针等事件就绪，非改断言迁就
- 装机侧异常：24 个 stale file: 依赖（姊妹仓旧版本 tgz 被清理）→ 同版本重打包修复，已记录 V2/V3 签认表
