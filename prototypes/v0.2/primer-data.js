/* 36 号 · 疾病概要数据（天疱疮）· 纯字面量，正则可扫
 * 来源分级：L1 原件已取得并核验（gov.cn 直链 PDF，2026-11-10 夜间实测下载）。
 * 0 临床审核：全部内容为待核占位（【待核】），解释层不生成判断层结论。
 */
window.DISEASE_PRIMER = {
  brand: '小愈宝 HealPal',
  name: '天疱疮',
  en: 'Pemphigus',
  updated: '2026-11-10（0 临床审核 · L1 原件已取得并核验：15,611,195 字节 / 517 页 / application/pdf）',
  sections: [
    {
      id: 'definition',
      title: '定义',
      intro: '天疱疮是一组罕见但严重的自身免疫性皮肤黏膜大疱性疾病：体内产生的抗桥粒芯蛋白（Dsg）抗体沉积在表皮和/或黏膜上皮细胞之间，破坏细胞间连接，形成松弛性水疱、大疱。本段只做事实整理，不做诊断。',
      points: [
        '主要类型包括寻常型、增殖型、落叶型和红斑型，其中寻常型和落叶型可占到诊断的 90%～95%；我国流行病学调查表明寻常型天疱疮最常见。',
        '寻常型天疱疮常先出现口腔水疱和糜烂并伴疼痛，严重者可因进食困难导致体重下降；皮肤损害可出现在全身任何部位。落叶型以头面、躯干等脂溢性区域为主，黏膜受累罕见。',
        '好发于 45～65 岁人群；不同地区发病率差异较大。具体到个人，是否患病、属于哪一型，由医生结合检查判断。',
        '天疱疮列入《86 个罕见病病种诊疗指南（2025 年版）》目录第 58 条。',
        '注意：天疱疮与「大疱性类天疱疮」名字相近但是不同疾病（类天疱疮疱壁较厚、不易破溃，尼氏征阴性——这是指南里的鉴别要点，不是自我判断工具）。'
      ],
      sources: [
        { org: '国家卫生健康委员会等', doc: '《86 个罕见病病种诊疗指南（2025 年版）》第 58 条 天疱疮', version: '2025 年版', original: true, kind: 'pdf', url: 'https://www.gov.cn/zhengce/zhengceku/202507/P020250710595668350272.pdf', page: '目录页 346–349（PDF 第 350–353 页）', note: '原件已取得并核验：200 / application/pdf / 15,611,195 字节 / 517 页（2026-11-10 下载实测）' }
      ]
    },
    {
      id: 'evidence',
      title: '医学资料规范和指南情况',
      intro: '下表是可查到的规范与指南入口。是否适用、适用哪一条，由医生判断；本台不把指南变成自测题。',
      table: {
        head: ['资料', '发布方', '版本', '语言', '入口'],
        rows: [
          ['《86 个罕见病病种诊疗指南（2025 年版）》第 58 条 天疱疮', '国家卫生健康委员会等', '2025 年版', '中文', { text: '官方全文 PDF（gov.cn，本台已核验）', kind: 'pdf', url: 'https://www.gov.cn/zhengce/zhengceku/202507/P020250710595668350272.pdf' }],
          ['中国天疱疮诊疗指南（2024 版）', '中国医师协会皮肤科医师分会等', '2024', '中文', { text: 'DOI 10.35541/cjd.20240222（题录入口，未取得全文）', kind: 'link', url: 'https://doi.org/10.35541/cjd.20240222' }],
          ['天疱疮患者健康教育共识（2023 版）', '中国医师协会皮肤科医师分会等', '2023', '中文', { text: 'DOI 10.35541/cjd.20230123（题录入口，未取得全文）', kind: 'link', url: 'https://doi.org/10.35541/cjd.20230123' }],
          ['Diagnosis and management of pemphigus: recommendations of an international panel of experts', 'J Am Acad Dermatol', '2020', '英文', { text: 'PubMed 检索入口', kind: 'link', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=pemphigus+recommendations+international+panel' }]
        ]
      },
      points: [
        '中文规范以中国官方发布为准；本表只给入口，不摘要成「你该怎么做」。',
        '期刊指南未取得全文的按题录级标注；是否更新请以发布方页面为准。'
      ],
      sources: [
        { org: '国务院办公厅 政策文件库', doc: '86 个罕见病病种诊疗指南（2025 年版）全文 PDF', version: '2025 年版', original: true, kind: 'pdf', url: 'https://www.gov.cn/zhengce/zhengceku/202507/P020250710595668350272.pdf', page: '第 58 条', note: '原件已取得并核验（2026-11-10 实测）；章节定位见定义段来源行' }
      ]
    },
    {
      id: 'landscape',
      title: '治疗全景',
      intro: '下面只列「医生在治疗天疱疮时通常会谈到哪些方向」这一事实，不代表任何一项适合你；具体用药、剂量与疗程需要问你的医生。',
      groups: [
        { label: '糖皮质激素方向', points: ['系统性应用糖皮质激素是指南中列出的天疱疮一线治疗方案方向', '指南原文提示治疗分初始与巩固维持两个阶段，减量速度由医生按个体情况掌握，本台不写具体剂量建议【待核】'] },
        { label: '免疫抑制剂联合方向', points: ['指南列举的吗替麦考酚酯、硫唑嘌呤、甲氨蝶呤、环磷酰胺、环孢素等属于「中重度患者早期联合、帮助减少激素用量」的方向，是否使用由医生决定'] },
        { label: '利妥昔单抗方向', points: ['利妥昔单抗可与糖皮质激素联合用于中重度患者（指南推荐方向）；在中国它用于天疱疮属超说明书用药，说明书适应证以药监局与说明书为准——这一句需要问你的医生'] },
        { label: '其他方向', points: ['静脉丙种球蛋白（IVIG）、血浆置换、免疫吸附等在指南中列为特定情形下可考虑的方向', '糖皮质激素相关并发症（血糖、血压、骨、眼等）的筛查与随访频率以医生安排为准【待核】'] }
      ],
      points: [
        '本段各方向按受累器官与病情轻重排列（黏膜与皮肤受累控制 → 联合减量 → 特定情形补充 → 长期随访监测），不代表任何一项适合你；具体选择需要问你的医生。'
      ],
      sources: [
        { org: '国家卫生健康委员会等', doc: '《86 个罕见病病种诊疗指南（2025 年版）》第 58 条 治疗部分', version: '2025 年版', original: true, kind: 'pdf', url: 'https://www.gov.cn/zhengce/zhengceku/202507/P020250710595668350272.pdf', page: '目录页 348（PDF 第 352 页）', note: '原件已取得并核验；只列方向不列方案，剂量一律【待核】' },
        { org: '国家药品监督管理局', doc: '药品数据查询（利妥昔单抗说明书以药监局登记为准）', version: '持续更新', entry: true, url: 'https://www.nmpa.gov.cn/datasearch/home-index.html', note: '官方入口：需自行检索具体说明书条目，本台不冒充直链；超说明书用药判断据公开检索（L3），晨审复核' }
      ]
    },
    {
      id: 'trend',
      title: '发展趋势',
      intro: '只写已经发生的事实，不预测。',
      points: [
        '2019 年，美国 FDA 批准利妥昔单抗用于成人寻常型天疱疮（据 FDA 官网新闻页；未取得原件，据二次来源）。中国境内说明书适应证状态见治疗全景段——需要问你的医生。',
        '2024 年，中国《中国天疱疮诊疗指南（2024 版）》发布（题录级，DOI 见「医学资料规范和指南情况」表）。',
        'ClinicalTrials.gov 可检索到天疱疮相关的登记条目；本台不做任何入选判断。',
        '本台不预测任何治疗何时可用；可及性变化以官方发布为准。'
      ],
      sources: [
        { org: 'U.S. FDA', doc: 'FDA approves Rituxan for pemphigus vulgaris（新闻页）', version: '2019', original: false, secondaryUrl: 'https://www.fda.gov/news-events/press-announcements', note: '未取得原件，据二次来源；晨审建议定位原始新闻页并留档' },
        { org: 'ClinicalTrials.gov', doc: '登记条目检索：pemphigus', version: '持续更新', original: false, secondaryUrl: 'https://clinicaltrials.gov/search?cond=Pemphigus', note: '登记平台入口，条目状态以官网为准' }
      ]
    }
  ]
}
