# PROGRESS · 小愈宝 HealPal 天疱疮工作台

- 当前里程碑：**M0–M9 全链完成 + 0.1.1 会话契约整改**（2026-11-10 23:00 → 2026-11-11 03:35；判完成看本行与尾部，不看头部模板行）
- 0.1.1（AI 对话会话契约）：契约检查器同步 starter 最新版（143→157 行），**七项静态断言 7/7 过**；rebuild lib/client.js 同步；VERSION/package.json/lib/version.js 三处 0.1.1；check 0✗ + 单测 34/34 + 双 audit 44/44；tgz 0.1.1 重打包并装机（profiles/web 登记核对一致）+ 重启 Desktop 后宿主加载验证 ✓（启动 19:27:22Z 晚于装机 19:26:17Z）
- 已完成：
  - 认领 Issue #70（/claim + claimed 标签 + 指派）；私有仓 + init
  - M0 文档九件（病种原创）+ 基线 check → G1 自动签认（重名率 66.7% 实测 + NMPA 利妥昔超说明书核实）
  - M1 三路调研落盘（L1 指南原件 gov.cn 直链 15,611,195 字节核验，第 58 章 PDF 350–353）
  - M2 原型 v0.2 八件套：DP 双入口探针 10/10、整页视图 13/13（A4b 探针竞态修复）、M2 全量 36/36、独立评审 P0=0、README 五段 + 8 张实渲截图 → G2
  - M3 schema 0001 冻结（18 表 + sites 累及部位，sha256 758f2acc…）+ 内存全建 → G3
  - M4 试验快照实抓 223 条（ictrp 211/chinadrugtrials 11/ctv 1；chictr_online FAILED 如实记）四件套一致
  - M5 开发版七步移植：dsh 七模块 + lib 五件 + public 定点移植 + patch config.root + 版本占位符注入；check 22 项全绿 / 单测 34/34 / 双 audit 44+44 → V1
  - M6 装机：tgz 0.1.0 入 Desktop profile（修复 24 个 stale file: 依赖，同版本重打包零副作用）+ 重启后宿主加载验证 → V2；真机库 20 表 + 种子数据 → V3 服务层
  - M7 tag v0.1.0（本地）+ release 冻结草稿；M8 BACKLOG 回填 PR 冻结草稿
  - M9 starter 回流 rc.32（probe slug 自动探测 + init 补 7 脚本 + LESSONS L84–L86；starter 自检 220 文件 + 67 测试全过）
- 下一步（晨审）：追认 6 份自动签认；DSH Desktop 真机会话 UI 人眼走查 + 实机截图；发 GitHub release + BACKLOG PR；私有仓推送确认
- 阻塞：无
- 闸口结论：G1/G2/G3/V1/V2 = 自动签认通过（待追认）；V3 = 部分通过（服务层实测，UI 走查待人工）
