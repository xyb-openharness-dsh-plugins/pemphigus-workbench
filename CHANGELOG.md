# CHANGELOG · 小愈宝 HealPal 天疱疮工作台

## 0.1.0 — 2026-11-11（夜间无人值守 M0–M9 全链首发）

- 认领 Issue #70（R2 非肿瘤慢性病型 T2）；0 患者访谈、0 临床审核如实标注，全部判定性输出不做。
- 原型 v0.2：两套合成档案（A 刚确诊 / B 两年随访）唯一源联动；抗 Dsg1/3 ELISA 指数可比组；发作—缓解区间带（累及部位维度）；激素减量/输注按次登记；疾病概要四段整页面板（L1 指南原件直链已核验）；试验四段链路（无匹配指数判读列）。
- 探针实测：P1–P9 10/10；A1–A10 13/13；M2 全量 36/36；check 链 22 项全绿；单测 34/34；双 audit 44/44。
- 开发版 0.1.0：dsh 七模块 + lib 五件 + public 定点移植（占位符注入）；schema 0001 冻结（sha256 758f2acc…）；试验快照 223 条（ictrp 211 / chinadrugtrials 11 / ctv 1；chictr_online FAILED 如实记）。
- 装机：DSH Desktop profile 实测加载（V2）；真机库 20 表种子数据；UI 人眼走查待人工（V3 部分）。
- 待晨审追认：G1/G2/G3/V1/V2 自动签认；品牌占位名「小愈宝 HealPal」；NMPA 利妥昔超说明书口径（L3 检索级）。

## 0.1.1 — 2026-11-11（AI 对话会话契约整改与校验升级）

- 会话契约七项静态断言全过（scripts/check-agent-pane-contract.mjs 同步 starter 最新版）：
  1. 不用 Boolean(conversation) 判断会话（customFrame 下宿主恒传隐藏容器）——以 service.currentSession() + ownsSession() 判归属；
  2. 无 ensureSession({})；
  3. 无会话时 service.newSession(workspaceId) 创建；
  4. workspaceId 优先 service.defaultWorkspace?.()?.workspaceId，无工作区交给宿主目录选择流程；
  5. 订阅 service.subscribe 触发重渲染（新建/切换会话面板及时显示）；
  6. agent-draft 草稿桥存在且只填不发（无 send:true）；
  7. lib/client.js 无残留注入占位符。
- 已有会话点击=打开/收起原生面板，不重复创建；取消目录选择不留空会话并提示可重试；创建失败在工作台内显示错误原因。
- 原生 conversation 节点由宿主传入并直接渲染进右侧面板（customFrame 隐藏容器仅作排版宿主）。
- 静态校验：check 链全绿 + 契约检查器 7/7；打包 0.1.1；安装与实机验证状态见 PROGRESS（如实记录）。

## 0.1.2 — 2026-11-11（资料目录真机状态整改）

- 设置页「业务资料根目录」去示意桩：开发版/装机形态读真实目录状态（GET /api/store），显示资料目录、数据根、数据库路径与原件/派生区文件计数；file:// 原型保持示意并如实标注。
- 新增 dsh/store-layout.js：激活即创建默认目录树（原件区/派生区，幂等）+ store-layout.json 状态文件；「更改位置」POST /api/store/choose 先过口径（拒绝主目录/桌面/下载根目录/tmp 子树）再建树，覆盖记录 store-root.json 重启生效；取消/拒绝零副作用。
- 修复 BOOT_BLOCK 移植残留：window.__PERI_APP__→__PEM_APP__、picked 默认指标 CRP/ESR→Dsg1/Dsg3（此前宿主形态 bootstrap 拉到数据但静默不生效）。
- 测试：test/store-layout.test.mjs 8 项（口径拒绝/建树/覆盖/重开生效/取消零副作用/文件路径拒绝）+ 真路由冒烟（GET/choose 合法/tmp 拒绝/空输入）。
- 版本 0.1.2；装机与实机验证状态如实记录（见 PROGRESS）。
