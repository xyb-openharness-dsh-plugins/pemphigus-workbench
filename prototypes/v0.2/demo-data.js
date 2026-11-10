/* 演示数据（唯一源）· 两组合成档案
 * A：刚确诊寻常型天疱疮、记录少、多处未知；B：两年随访、发作多次、指标与用药都多。
 * 全部为合成示例，不冒充真实病历；页面不写死数字，一切从这里读。
 * 本文件只放数据，不放逻辑；TODAY 由 app.js 固定为 2026-11-10。
 * 实体名沿用家族数据合同：flaps=发作—缓解（起止日期+累及部位）；treatments=剂量调整/输注按次登记。
 * 指标口径：抗 Dsg 抗体 ELISA 指数为活动相关化验，按「方法+机构」可比组展示，不同方法不合并。
 */
window.DEMO_DATA = {
  TODAY: '2026-11-10',
  /* 指标元数据（唯一源）：app.js 与服务端 metric_defs 都从这里读 */
  metricDefs: [
    { key: 'Dsg1', db: 'anti_dsg1', title: '抗 Dsg1 抗体（ELISA 指数）', category: 'immune', unit: 'U/mL', color: '#8a4f6d', ord: 0 },
    { key: 'Dsg3', db: 'anti_dsg3', title: '抗 Dsg3 抗体（ELISA 指数）', category: 'immune', unit: 'U/mL', color: '#2f6f8f', ord: 1 },
    { key: 'Eos', db: 'eos', title: '嗜酸性粒细胞', category: 'hemogram', unit: '×10⁹/L', color: '#2e7d5b', ord: 2 },
    { key: 'GLU', db: 'glu', title: '空腹血糖', category: 'steroid', unit: 'mmol/L', color: '#c96f2f', ord: 3 },
    { key: 'SBP', db: 'sbp', title: '收缩压', category: 'steroid', unit: 'mmHg', color: '#a3405e', ord: 4 },
    { key: 'ALT', db: 'alt', title: '丙氨酸转氨酶（ALT）', category: 'safety', unit: 'U/L', color: '#b98a1f', ord: 5 },
    { key: 'Cr', db: 'cr', title: '血肌酐（Cr）', category: 'safety', unit: 'µmol/L', color: '#5a7d2a', ord: 6 },
    { key: '体重', db: 'weight', title: '体重', category: 'vitals', unit: 'kg', color: '#6b5b95', ord: 7 }
  ],
  metricGroups: [
    { key: 'immune', title: '免疫指标（ELISA 指数）', items: ['Dsg1', 'Dsg3'] },
    { key: 'hemogram', title: '血象', items: ['Eos'] },
    { key: 'steroid', title: '激素相关监测（按医嘱筛查）', items: ['GLU', 'SBP'] },
    { key: 'safety', title: '用药安全监测（基线与随访）', items: ['ALT', 'Cr'] },
    { key: 'vitals', title: '体征', items: ['体重'] }
  ],
  /* M4 快照元信息（与 research/pemphigus/manifest.json 一致；clinical 页与设置 tab 同口径；2026-11-11 实抓 223 条） */
  snapshotMeta: { count: 223, date: '2026-11-11' },
  /* 临床登记浏览的内置示例：虚构条目，不是真实研究，不含可用登记号（35 号 E2 口径） */
  trialsDemo: [
    { recordId: 'demo-t1', registryNumbers: [{ registry: 'NCT', value: 'NCT-DEMO-001' }], title: '（虚构示例）利妥昔单抗联合糖皮质激素在寻常型天疱疮中的前瞻登记', studyType: '介入性', source: '快照摘录', statusNote: '登记状态，未核实' },
    { recordId: 'demo-t2', registryNumbers: [{ registry: 'NCT', value: 'NCT-DEMO-002' }], title: '（虚构示例）新生物制剂治疗天疱疮的剂量探索研究', studyType: '介入性', source: '快照摘录', statusNote: '登记状态，未核实' },
    { recordId: 'demo-t3', registryNumbers: [{ registry: 'ChiCTR', value: 'ChiCTR-DEMO-003' }], title: '（虚构示例）天疱疮患者报告结局与随访节奏的队列登记', studyType: '观察性', source: '快照摘录', statusNote: '登记状态，未核实' },
    { recordId: 'demo-t4', registryNumbers: [{ registry: 'EUCTR', value: 'EUCTR-DEMO-004' }], title: '（虚构示例）天疱疮抗体指数与皮损结局相关性观察', studyType: '观察性', source: '快照摘录', statusNote: '登记状态，未核实' },
    { recordId: 'demo-t5', registryNumbers: [{ registry: 'NCT', value: 'NCT-DEMO-005' }], title: '（虚构示例）糖皮质激素减量方案在寻常型天疱疮缓解维持中的比较研究', studyType: '介入性', source: '快照摘录', statusNote: '登记状态，未核实' }
  ],
  profiles: [
    {
      id: 'demo-a',
      name: '示例档案 A',
      tag: '刚确诊 · 记录少',
      isDemo: true,
      profile: {
        确诊经过: '2026-09 口腔糜烂就诊，皮肤活检+免疫荧光+抗 Dsg 抗体阳性，医生诊断寻常型天疱疮（原文照录）',
        发作登记: '发作次数由事件数据计算（见状态卡；私密发作不进聚合）',
        就诊医院: '示例市第一医院皮肤科',
        医生行动计划原话: '若出现新发水疱、发热或口腔糜烂加重影响进食，当天联系我（李医生）。'
      },
      flaps: [
        { id: 'a-f1', start: '2026-09-08', end: '2026-10-12', sites: '口腔', note: '口腔糜烂起，进食受影响；治疗后逐渐愈合（原文照录）', private: false },
        { id: 'a-f2', start: '2026-10-26', end: null, sites: '口腔+胸背', note: '新发水疱复诊调药；结束日期未发生（进行中）', private: false }
      ],
      labs: [
        { id: 'a-l1', metric: 'Dsg3', date: '2026-09-10', value: 168, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市第一医院', private: false },
        { id: 'a-l2', metric: 'Dsg1', date: '2026-09-10', value: 74, unit: 'U/mL', method: 'ELISA（抗Dsg1）', org: '示例市第一医院', private: false },
        { id: 'a-l3', metric: 'Dsg3', date: '2026-10-14', value: 95, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市第一医院', private: false },
        { id: 'a-l4', metric: '体重', date: '2026-09-08', value: 63, unit: 'kg', method: '门诊称重', org: '示例市第一医院', private: false },
        { id: 'a-l5', metric: '体重', date: '2026-10-14', value: 59, unit: 'kg', method: '门诊称重', org: '示例市第一医院', private: false },
        { id: 'a-l6', metric: 'GLU', date: '2026-10-14', value: 6.8, unit: 'mmol/L', method: '实验室生化', org: '示例市第一医院', private: false },
        { id: 'a-l7', metric: 'SBP', date: '2026-10-14', value: 138, unit: 'mmHg', method: '诊室水银柱', org: '示例市第一医院', private: false },
        { id: 'a-l8', metric: 'ALT', date: '2026-10-14', value: 28, unit: 'U/L', method: '速率法', org: '示例市第一医院', private: false },
        { id: 'a-l9', metric: 'Cr', date: '2026-10-14', value: 66, unit: 'µmol/L', method: '苦味酸法', org: '示例市第一医院', private: false }
      ],
      treatments: [
        { id: 'a-t1', date: '2026-09-10', kind: '剂量调整', name: '泼尼松（医生处方：起始剂量按体重计，原文见处方原件）', note: '开始服药；本台不录判定、不写具体建议剂量', private: false },
        { id: 'a-t2', date: '2026-10-26', kind: '剂量调整', name: '复诊（原文照录：目前剂量维持，两周后复查抗体）', note: '', private: false }
      ],
      meds: [
        { id: 'a-m1', name: '糖皮质激素（泼尼松）', schedule: '每日（具体剂量见处方原件）', since: '2026-09-10', note: '合成示例：剂量只进治疗记录，不在用药清单写数值' },
        { id: 'a-m2', name: '护胃辅助（医生安排）', schedule: '每日', since: '2026-09-10', note: '合成示例' }
      ],
      questions: [],
      hospitals: [
        { id: 'a-h1', name: '示例市第一医院', dept: '皮肤科', contact: '电话见挂号单（未录入）', ver: 1 }
      ],
      reports: [
        { id: 'a-r1', title: '皮肤活检病理报告（2026-09-10）', date: '2026-09-10', kind: '病理', source: '原件已登记', finding: '表皮内水疱、棘层松解（报告原文）', private: false },
        { id: 'a-r2', title: '化验单（抗 Dsg 抗体 2026-09-10）', date: '2026-09-10', kind: '化验', source: '未取得原件', finding: '', private: false }
      ],
      docs: [
        { id: 'a-d1', name: '2026-09-12 出院小结', date: '2026-09-12', type: '病历', state: '已登记' },
        { id: 'a-d2', name: '（日期未知示例）外院抗体检测描述单', date: null, type: '化验', state: '待核对' }
      ],
      mind: {
        feel: [
          { d: '2026-10-20', text: '嘴里疼得吃不下饭，体重掉得快，有点慌。', author: '本人', private: false },
          { d: '2026-11-01', text: '（私密记录示例）夜里疼醒过一次，不想让家人担心。', author: '本人', private: true }
        ],
        family: [
          { d: '2026-10-27', text: '家属陪诊并帮忙记了新发水疱那天的日期。', author: '家属', private: false }
        ]
      }
    },
    {
      id: 'demo-b',
      name: '示例档案 B',
      tag: '两年随访 · 发作多次 · 记录多',
      isDemo: true,
      profile: {
        确诊经过: '2024-03 口腔+皮肤水疱起病，活检与抗体确诊寻常型天疱疮（合成示例）',
        发作登记: '发作次数由事件数据计算（见状态卡；私密发作不进聚合）',
        就诊医院: '示例市中心医院皮肤科；2026 起跨院随诊',
        医生行动计划原话: '若出现新发水疱、发热超过 38℃ 或进食明显困难，当天联系我或到皮肤科急诊。（王医生 2026-10-30 门诊原话照录）'
      },
      flaps: [
        { id: 'b-f1', start: '2024-03-05', end: '2024-04-10', sites: '口腔+胸背', note: '首次发作（时间按病历整理）', private: false },
        { id: 'b-f2', start: '2024-07-18', end: '2024-08-22', sites: '口腔', note: '第一次反复，口腔为主', private: false },
        { id: 'b-f3', start: '2025-01-06', end: '2025-02-18', sites: '口腔+头皮', note: '冬季反复，较长', private: false },
        { id: 'b-f4', start: '2025-06-14', end: '2025-07-08', sites: '胸背+腋下', note: '皮肤糜烂反复', private: false },
        { id: 'b-f5', start: '2026-03-02', end: '2026-04-01', sites: '口腔+生殖器', note: '黏膜受累范围扩大，复诊加药（原文照录）', private: false },
        { id: 'b-f6', start: '2026-10-04', end: '2026-10-28', sites: '口腔+胸背', note: '减量后反复；结束日期按复诊记录整理', private: false },
        { id: 'b-f7', start: '2026-09-10', end: '2026-09-14', sites: '腋下', note: '（私密示例）短暂新发水疱，未就医，仅自己记', private: true }
      ],
      labs: [
        { id: 'b-l01', metric: 'Dsg3', date: '2024-03-06', value: 182, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: false },
        { id: 'b-l02', metric: 'Dsg1', date: '2024-03-06', value: 88, unit: 'U/mL', method: 'ELISA（抗Dsg1）', org: '示例市中心医院', private: false },
        { id: 'b-l03', metric: 'Dsg3', date: '2024-04-12', value: 76, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: false },
        { id: 'b-l04', metric: 'Dsg3', date: '2024-08-02', value: 118, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: false },
        { id: 'b-l05', metric: 'Dsg1', date: '2024-08-02', value: 52, unit: 'U/mL', method: 'ELISA（抗Dsg1）', org: '示例市中心医院', private: false },
        { id: 'b-l06', metric: 'Dsg3', date: '2025-01-08', value: 141, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: false },
        { id: 'b-l07', metric: 'Dsg3', date: '2025-02-20', value: 68, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: false },
        { id: 'b-l08', metric: 'Dsg3', date: '2026-03-04', value: 97, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: false },
        { id: 'b-l09', metric: 'Dsg3', date: '2026-10-06', value: 84, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: false },
        { id: 'b-l10', metric: 'Dsg3', date: '2026-11-04', value: 39, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例大学附属医院', private: false },
        { id: 'b-l11', metric: 'Dsg1', date: '2026-11-04', value: 21, unit: 'U/mL', method: 'ELISA（抗Dsg1）', org: '示例大学附属医院', private: false },
        { id: 'b-l12', metric: 'Dsg3', date: '2026-09-12', value: 71, unit: 'U/mL', method: 'ELISA（抗Dsg3）', org: '示例市中心医院', private: true },
        { id: 'b-l13', metric: 'Eos', date: '2024-03-06', value: 0.42, unit: '×10⁹/L', method: '血常规 五分类', org: '示例市中心医院', private: false },
        { id: 'b-l14', metric: 'Eos', date: '2025-06-16', value: 0.61, unit: '×10⁹/L', method: '血常规 五分类', org: '示例市中心医院', private: false },
        { id: 'b-l15', metric: 'GLU', date: '2024-04-12', value: 5.6, unit: 'mmol/L', method: '实验室生化', org: '示例市中心医院', private: false },
        { id: 'b-l16', metric: 'GLU', date: '2025-01-08', value: 7.2, unit: 'mmol/L', method: '实验室生化', org: '示例市中心医院', private: false },
        { id: 'b-l17', metric: 'GLU', date: '2025-06-16', value: 6.1, unit: 'mmol/L', method: '快速血糖仪', org: '自录', private: false },
        { id: 'b-l18', metric: 'GLU', date: '2026-10-06', value: 5.8, unit: 'mmol/L', method: '实验室生化', org: '示例市中心医院', private: false },
        { id: 'b-l19', metric: 'SBP', date: '2024-04-12', value: 128, unit: 'mmHg', method: '诊室水银柱', org: '示例市中心医院', private: false },
        { id: 'b-l20', metric: 'SBP', date: '2025-01-08', value: 142, unit: 'mmHg', method: '诊室水银柱', org: '示例市中心医院', private: false },
        { id: 'b-l21', metric: 'SBP', date: '2026-10-06', value: 132, unit: 'mmHg', method: '电子血压计', org: '自录', private: false },
        { id: 'b-l22', metric: 'ALT', date: '2024-04-12', value: 24, unit: 'U/L', method: '速率法', org: '示例市中心医院', private: false },
        { id: 'b-l23', metric: 'ALT', date: '2025-06-16', value: 41, unit: 'U/L', method: '速率法', org: '示例市中心医院', private: false },
        { id: 'b-l24', metric: 'ALT', date: '2026-11-04', value: 27, unit: 'U/L', method: '干化学法', org: '示例大学附属医院', private: false },
        { id: 'b-l25', metric: 'Cr', date: '2024-04-12', value: 72, unit: 'µmol/L', method: '苦味酸法', org: '示例市中心医院', private: false },
        { id: 'b-l26', metric: 'Cr', date: '2026-11-04', value: 70, unit: 'µmol/L', method: '苦味酸法', org: '示例大学附属医院', private: false },
        { id: 'b-l27', metric: '体重', date: '2024-03-06', value: 68, unit: 'kg', method: '门诊称重', org: '示例市中心医院', private: false },
        { id: 'b-l28', metric: '体重', date: '2024-04-12', value: 64, unit: 'kg', method: '门诊称重', org: '示例市中心医院', private: false },
        { id: 'b-l29', metric: '体重', date: '2025-02-20', value: 66, unit: 'kg', method: '门诊称重', org: '示例市中心医院', private: false },
        { id: 'b-l30', metric: '体重', date: '2026-10-06', value: 67, unit: 'kg', method: '门诊称重', org: '示例市中心医院', private: false },
        { id: 'b-l31', metric: '体重', date: '2026-11-04', value: 66.5, unit: 'kg', method: '门诊称重', org: '示例大学附属医院', private: false }
      ],
      treatments: [
        { id: 'b-t01', date: '2024-03-06', kind: '剂量调整', name: '泼尼松（医生处方，起始量按体重计）', note: '首次发作开始服药；剂量数值只看处方原件', private: false },
        { id: 'b-t02', date: '2024-04-12', kind: '剂量调整', name: '复诊（原文照录：按计划逐步减量，每月复查抗体）', note: '', private: false },
        { id: 'b-t03', date: '2024-08-02', kind: '剂量调整', name: '复诊（原文照录：加用免疫抑制剂联合，减少激素用量）', note: '吗替麦考酚酯开始（见日常用药）', private: false },
        { id: 'b-t04', date: '2025-06-16', kind: '剂量调整', name: '复诊（原文照录：肝酶略高，免疫抑制剂剂量调整，加密肝功能随访）', note: '', private: false },
        { id: 'b-t05', date: '2026-03-04', kind: '剂量调整', name: '复诊（原文照录：维持联合方案）', note: '', private: false },
        { id: 'b-t06', date: '2026-08-05', kind: '输注', name: '利妥昔单抗输注 第 1 次（医生处方，合成示例）', note: '方案细节见处方原件；输注反应按医嘱观察', private: false },
        { id: 'b-t07', date: '2026-08-19', kind: '输注', name: '利妥昔单抗输注 第 2 次（合成示例）', note: '', private: false },
        { id: 'b-t08', date: '2026-10-30', kind: '剂量调整', name: '复诊（原文照录：继续目前方案，下次复诊 2026-12）', note: '', private: false }
      ],
      meds: [
        { id: 'b-m1', name: '糖皮质激素（泼尼松）', schedule: '每日（当前剂量见最近一次治疗记录与处方原件）', since: '2024-03-06', note: '合成示例；减量过程看治疗记录链' },
        { id: 'b-m2', name: '吗替麦考酚酯', schedule: '每日（剂量见处方）', since: '2024-08-02', note: '合成示例' },
        { id: 'b-m3', name: '利妥昔单抗（输注）', schedule: '按次（医生安排，见治疗记录）', since: '2026-08-05', note: '合成示例；说明书适应证以药监局为准，见疾病概要' }
      ],
      questions: [
        { id: 'b-q1', q: '利妥昔输注后什么时候复查抗体指数？', addedOn: '2026-10-20', answered: false, private: false },
        { id: 'b-q2', q: '不同医院的抗体指数能放一张图里看趋势吗？', addedOn: '2026-10-20', answered: false, private: false },
        { id: 'b-q3', q: '激素还要减多久？减量期间多久查一次？', addedOn: '2026-11-04', answered: false, private: false },
        { id: 'b-q4', q: '（私密示例）口腔护理用品有没有要注意的？', addedOn: '2026-10-21', answered: false, private: true }
      ],
      hospitals: [
        { id: 'b-h1', name: '示例市中心医院', dept: '皮肤科', contact: '0XX-00000000（合成）', ver: 2 },
        { id: 'b-h2', name: '示例大学附属医院', dept: '皮肤科（跨院随诊）', contact: '出处：2026-11 挂号单', ver: 1 },
        { id: 'b-h3', name: '示例市第一医院', dept: '皮肤科（第二意见）', contact: '未录入', ver: 1 }
      ],
      reports: [
        { id: 'b-r1', title: '皮肤活检病理（2024-03-06）', date: '2024-03-06', kind: '病理', source: '原件已登记', finding: '表皮内水疱、棘层松解（报告原文）', private: false },
        { id: 'b-r2', title: '直接免疫荧光（2024-03-06）', date: '2024-03-06', kind: '病理', source: '原件已登记', finding: 'IgG/C3 表皮细胞间网格状沉积（报告原文）', private: false },
        { id: 'b-r3', title: '化验单（2025-01-08）', date: '2025-01-08', kind: '化验', source: '未取得原件', finding: '', private: false },
        { id: 'b-r4', title: '化验单（2026-11-04）', date: '2026-11-04', kind: '化验', source: '原件已登记', finding: '', private: false },
        { id: 'b-r5', title: '门诊病历（2026-08-05）', date: '2026-08-05', kind: '病历', source: '原件已登记', finding: '', private: false },
        { id: 'b-r6', title: '输注记录单（2026-08-19）', date: '2026-08-19', kind: '治疗', source: '原件已登记', finding: '', private: false },
        { id: 'b-r7', title: '异地随诊小结（2026-11-04）', date: '2026-11-04', kind: '病历', source: '原件已登记', finding: '', private: false },
        { id: 'b-r8', title: '（私密示例）2025 心理咨询小结', date: '2025-06-20', kind: '其他', source: '原件已登记', finding: '', private: true }
      ],
      docs: [
        { id: 'b-d1', name: '2024-03-09 出院小结', date: '2024-03-09', type: '病历', state: '已登记' },
        { id: 'b-d2', name: '2024-03-06 皮肤活检病理', date: '2024-03-06', type: '病理', state: '已核对' },
        { id: 'b-d3', name: '2024-03-06 化验单', date: '2024-03-06', type: '化验', state: '待核对' },
        { id: 'b-d4', name: '2025-01-08 化验单', date: '2025-01-08', type: '化验', state: '已核对' },
        { id: 'b-d5', name: '2026-08-05 门诊病历', date: '2026-08-05', type: '病历', state: '已核对' },
        { id: 'b-d6', name: '2026-11-04 化验单', date: '2026-11-04', type: '化验', state: '待核对' },
        { id: 'b-d7', name: '2026-11-04 随诊小结', date: '2026-11-04', type: '病历', state: '已登记' }
      ],
      mind: {
        feel: [
          { d: '2025-06-20', text: '反反复复最难熬的是不知道这次会不会再长出来。', author: '本人', private: false },
          { d: '2026-08-10', text: '开始输注治疗后心里踏实了一点，但还是怕反复。', author: '本人', private: false },
          { d: '2026-10-30', text: '这次复诊说指标降了不少，总算有个盼头。', author: '本人', private: false },
          { d: '2026-10-25', text: '（私密记录示例）最近情绪很低落，不想让人知道。', author: '本人', private: true }
        ],
        family: [
          { d: '2026-08-06', text: '家人负责记住输注日期和复诊日期。', author: '家属', private: false },
          { d: '2026-10-05', text: '这次口腔疼得厉害，家属帮忙做了几天软食。', author: '家属', private: false }
        ]
      }
    }
  ]
}
