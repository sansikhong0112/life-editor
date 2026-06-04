/* ============ 人生节点记录器 · 示例数据 ============ */

// 分类（底部图例 + 右侧下拉）
const CATEGORIES = [
  { id: "edu",    name: "教育学习", color: "#34B864", icon: "📚" },
  { id: "work",   name: "工作事业", color: "#3B82F6", icon: "💼" },
  { id: "family", name: "家庭生活", color: "#14B8A6", icon: "🏠" },
  { id: "travel", name: "旅行体验", color: "#EF5364", icon: "✈️" },
  { id: "social", name: "人际关系", color: "#8B5CF6", icon: "🧑‍🤝‍🧑" },
  { id: "growth", name: "个人成长", color: "#F59E0B", icon: "🌱" },
  { id: "other",  name: "其他",     color: "#9AA1AC", icon: "✨" },
];

// 人生阶段（左侧 + 画布分行）
const STAGES = [
  { id: "childhood", name: "童年",     age: "0-12岁",  color: "#34B864", icon: "🧒" },
  { id: "student",   name: "学生时代", age: "13-22岁", color: "#3B82F6", icon: "⭐" },
  { id: "explore",   name: "探索阶段", age: "23-30岁", color: "#F59E0B", icon: "🧭" },
  { id: "growth",    name: "成长阶段", age: "31-40岁", color: "#8B5CF6", icon: "🚀" },
  { id: "future",    name: "未来",     age: "40+岁",   color: "#9AA1AC", icon: "🔮" },
];

// 标签
const TAGS = [
  { id: "important", name: "重要",   color: "#EF5364" },
  { id: "turning",   name: "转折点", color: "#F59E0B" },
  { id: "first",     name: "第一次", color: "#3B82F6" },
  { id: "milestone", name: "里程碑", color: "#34B864" },
  { id: "challenge", name: "挑战",   color: "#F5A623" },
];

// 情绪选项
const EMOTIONS = [
  { id: "happy",   label: "开心", emoji: "😄" },
  { id: "expect",  label: "期待", emoji: "🙂" },
  { id: "calm",    label: "平静", emoji: "😌" },
  { id: "proud",   label: "自豪", emoji: "😎" },
  { id: "sad",     label: "难过", emoji: "😢" },
  { id: "anxious", label: "焦虑", emoji: "😰" },
];

/* 节点：x = 画布横向像素坐标；stage 决定所在分行。
   cat = 分类id，icon = 卡片图标，year = 年份标签。
   variant: "group" = 虚线分组卡（更大）。 */
const NODES = [
  // —— 童年 ——
  { id: "n_birth",  title: "出生",   year: "1988", x: 117, stage: "childhood", cat: "family", icon: "👶",
    date: "1988-03", place: "杭州, 中国", emotion: "happy", tags: ["milestone"],
    note: "一切的开始。", created: "1988-03-12 08:00", updated: "2024-01-10 09:20" },
  { id: "n_primary", title: "小学", year: "1994", x: 250, stage: "childhood", cat: "edu", icon: "🏫",
    date: "1994-09", place: "杭州, 中国", emotion: "happy", tags: ["first"],
    note: "背上小书包的第一天。", created: "1994-09-01 08:00", updated: "2024-01-10 09:20" },
  { id: "n_move",   title: "搬家",   year: "1998", x: 367, stage: "childhood", cat: "family", icon: "📦",
    date: "1998-06", place: "上海, 中国", emotion: "expect", tags: ["turning"],
    note: "全家搬到了新的城市。", created: "1998-06-20 10:00", updated: "2024-01-10 09:20" },

  // —— 学生时代 ——
  { id: "n_middle", title: "初中",   year: "2001", x: 234, stage: "student", cat: "edu", icon: "📖",
    date: "2001-09", place: "上海, 中国", emotion: "calm", tags: ["milestone"],
    note: "开始了少年时代。", created: "2001-09-01 08:00", updated: "2024-01-10 09:20" },
  { id: "n_trip",   title: "第一次旅行", year: "2004", x: 367, stage: "student", cat: "travel", icon: "✈️",
    date: "2004-07", place: "北京, 中国", emotion: "happy", tags: ["first","important"],
    note: "第一次独自远行，看到了更大的世界。", created: "2004-07-15 10:00", updated: "2024-01-10 09:20" },
  { id: "n_high",   title: "高中",   year: "2007", x: 499, stage: "student", cat: "edu", icon: "🎓",
    date: "2007-09", place: "上海, 中国", emotion: "anxious", tags: ["challenge"],
    note: "为了梦想全力以赴的三年。", created: "2007-09-01 08:00", updated: "2024-01-10 09:20" },

  // —— 探索阶段 ——
  { id: "n_college", title: "大学", year: "2008", x: 484, stage: "explore", cat: "edu", icon: "🏛️",
    date: "2008-09", place: "南京, 中国", emotion: "expect", tags: ["milestone","first"],
    note: "踏入大学校门，开启独立生活。", created: "2008-09-01 08:00", updated: "2024-01-10 09:20" },
  { id: "n_grad",   title: "毕业",   year: "2012", x: 640, stage: "explore", cat: "edu", icon: "🎉",
    date: "2012-06", place: "南京, 中国", emotion: "proud", tags: ["milestone"],
    note: "四年时光，画上句号也是新的开始。", created: "2012-06-30 10:00", updated: "2024-01-10 09:20" },
  // 分组卡：大学时光
  { id: "g_college", title: "大学时光", sub: "2008–2012", year: "", x: 733, stage: "studentLow", cat: "edu", icon: "🧑‍🎓",
    variant: "group", date: "2008-09", place: "南京, 中国", emotion: "happy", tags: ["important"],
    note: "人生中最自由的一段时光。", created: "2012-06-30 10:00", updated: "2024-01-10 09:20" },

  // —— 成长阶段 ——
  { id: "n_job",    title: "第一份工作", year: "2014", x: 593, stage: "growth", cat: "work", icon: "💼",
    date: "2014-07", endDate: "", place: "上海, 中国", emotion: "expect", tags: ["important","first"],
    note: "毕业后的第一份正式工作，进入了一家互联网公司，开始了职业生涯。充满挑战，也收获了很多成长。",
    created: "2014-07-15 10:30", updated: "2024-05-20 16:45",
    attachments: ["办公环境.jpg","团队合照.jpg","工牌.jpg"] },
  { id: "n_city",   title: "新的城市", year: "2016", x: 733, stage: "growth", cat: "family", icon: "🏙️",
    date: "2016-04", place: "深圳, 中国", emotion: "expect", tags: ["turning"],
    note: "为了更好的机会，再次出发。", created: "2016-04-10 10:00", updated: "2024-01-10 09:20" },
  { id: "n_love",   title: "重要的人", year: "2018", x: 874, stage: "growth", cat: "social", icon: "💗",
    date: "2018-10", place: "深圳, 中国", emotion: "happy", tags: ["important"],
    note: "遇见了想要携手一生的人。", created: "2018-10-01 10:00", updated: "2024-01-10 09:20" },
  // 分组卡：关系发展
  { id: "g_rel",    title: "关系发展", sub: "2018–至今", year: "", x: 889, stage: "growthLow", cat: "social", icon: "🧑‍🤝‍🧑",
    variant: "group", date: "2018-10", place: "深圳, 中国", emotion: "happy", tags: ["important"],
    note: "一起经历的点点滴滴。", created: "2018-10-01 10:00", updated: "2024-01-10 09:20" },

  // —— 未来 ——
  { id: "n_future", title: "持续成长", year: "2025+", x: 1037, stage: "future", cat: "growth", icon: "🌱",
    date: "2025-01", place: "", emotion: "expect", tags: ["milestone"],
    note: "保持好奇，持续向前。", created: "2024-01-01 10:00", updated: "2024-05-20 16:45" },
];

// 顶部缩放轴 / 底部缩略图上散布的彩色小点（年份 + 分类）
const SCATTER = [
  [1988,"family"],[1989,"work"],[1990,"edu"],[1991,"work"],[1993,"edu"],[1994,"edu"],
  [1996,"family"],[1998,"family"],[2000,"travel"],[2001,"edu"],[2002,"social"],[2003,"work"],
  [2004,"travel"],[2004,"edu"],[2005,"edu"],[2006,"growth"],[2007,"edu"],[2008,"edu"],
  [2009,"work"],[2010,"social"],[2011,"work"],[2012,"edu"],[2013,"travel"],[2014,"work"],
  [2015,"family"],[2016,"family"],[2017,"growth"],[2018,"social"],[2019,"work"],[2020,"travel"],
  [2022,"work"],[2023,"growth"],[2024,"family"],[2026,"work"],[2028,"social"],[2030,"growth"],
];

const ZOOM_LEVELS = ["年","季度","月","周"];

Object.assign(window, { CATEGORIES, STAGES, TAGS, EMOTIONS, NODES, SCATTER, ZOOM_LEVELS });
