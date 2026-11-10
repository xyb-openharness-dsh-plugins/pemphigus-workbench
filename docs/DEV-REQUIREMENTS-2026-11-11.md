# DEV-REQUIREMENTS · 2026-11-11 夜班硬约束清单（可验证）

| # | 约束 | 验证方式 |
| --- | --- | --- |
| 1 | 非肿瘤发作—缓解语义；无分期/线序/疗效/预后 | grep 断言 + check-wording + 独立评审 P0=0 |
| 2 | demo 双档案唯一源，页面不写死业务数字 | demo-parity.test + 独立评审抽查 |
| 3 | 指南 L1 原件 kind=pdf 直链 + 下载核验记录 | check-primer-links 10/10 |
| 4 | schema 冻结 sha256，判读列 0 | check-schema-words + freeze-contract |
| 5 | trials 快照 manifest=jsonl=sqlite 计数一致 | check-trial-snapshot 223/223 |
| 6 | private 三出口同一 sharedOnly 过滤 | probe Q35a/b/c 实测 |
| 7 | 版本占位符注入（public 无版本字面量） | check-version-literal + version-inject.test |
| 8 | 探针必须显式 --url 打本仓原型（禁 examples 假绿） | probe 输出带 URL；check-probe-coverage |
| 9 | patch config.root: !!js dshHomePath('pemphigus') | cordis.patch.yml 实文 + audit |
| 10 | UI 与原型 parity（public 与 prototypes 一致，版本占位符除外） | check-ui-parity + ui-parity.test |
