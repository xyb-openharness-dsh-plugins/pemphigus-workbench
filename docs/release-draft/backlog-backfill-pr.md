# BACKLOG 回填 PR 草稿（冻结备稿 · 无人值守不得对外推送）

- 仓库：xyb-openharness-dsh-plugins/.github（main）
- 分支名：backfill/pemphigus-v0.1.0
- PR 标题：BACKLOG 回填：天疱疮（#58）⬜ → 🔵 v0.1.0（2026-11-11 夜间 M0–M6 实测）
- 依据：31 号口径只改状态列；🔵 = 开发中（G1–V2 已自动签认待追认、V3 服务层实测）
- 状态行（2026-11-10 快照第 326 行；PR 前先 pull 最新 main 并核对行内容未漂移）：

```
- | 58 | 天疱疮 | 346 | T2 | ⬜ 招募中 | 👤🤝📝 |
+ | 58 | 天疱疮 | 346 | T2 | 🔵 v0.1.0（2026-11-11，G1–V2 自动签认待追认，[认领 Issue #70](https://github.com/xyb-openharness-dsh-plugins/.github/issues/70)） | 👤🤝📝 |
```

- 执行步骤（晨审追认后）：
  1. gh repo clone xyb-openharness-dsh-plugins/.github /tmp/gh-backfill && git -C /tmp/gh-backfill pull（ff-only）
  2. 核对 R2 表 #58 行与快照一致（不一致则按实际行改状态列，不动其他列）
  3. 建分支 → 只改该行 → commit「BACKLOG 回填：天疱疮 🔵 v0.1.0（Issue #70）」→ push 分支 → gh pr create --fill
- 冻结原因：无人值守禁止向他人仓库推送（§1）
