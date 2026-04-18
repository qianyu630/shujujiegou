export type TopicId = 'linear' | 'stack-queue' | 'tree' | 'graph' | 'integrated'

export interface Topic {
  id: TopicId
  slug: string
  name: string
  subtitle: string
  description: string
  recommendedStart?: boolean
  nextTopic?: TopicId
}

export interface Exercise {
  id: string
  slug: string
  topicId: TopicId
  title: string
  short: string
  overview: string
  difficulty: '入门' | '进阶' | '综合'
  tags: string[]
  recommendedNext: string[]
  steps: string[]
}

export const topicOrder: TopicId[] = ['linear', 'stack-queue', 'tree', 'graph', 'integrated']

export const topics: Topic[] = [
  {
    id: 'linear',
    slug: 'linear',
    name: '线性结构',
    subtitle: '从顺序表与链表开始，建立数据组织基础',
    description: '掌握顺序存储与链式存储、索引访问、插删代价与场景选择。',
    recommendedStart: true,
    nextTopic: 'stack-queue',
  },
  {
    id: 'stack-queue',
    slug: 'stack-queue',
    name: '栈与队列',
    subtitle: '后进先出与先进先出，连接抽象结构和真实场景',
    description: '用入栈出栈、入队出队解决表达式、匹配与排队模型问题。',
    nextTopic: 'tree',
  },
  {
    id: 'tree',
    slug: 'tree',
    name: '树结构',
    subtitle: '进入层次化组织与查找效率优化',
    description: '通过二叉搜索树理解递归、遍历和动态结构维护。',
    nextTopic: 'graph',
  },
  {
    id: 'graph',
    slug: 'graph',
    name: '图结构',
    subtitle: '从节点关系到路径决策',
    description: '在多关系网络中练习路径搜索、权重与最优策略。',
    nextTopic: 'integrated',
  },
  {
    id: 'integrated',
    slug: 'integrated',
    name: '综合实践',
    subtitle: '把前面能力组合成完整问题求解流程',
    description: '以汉诺塔等综合挑战训练分解问题、构造步骤与验证结果。',
  },
]

export const exercises: Exercise[] = [
  {
    id: 'student-management',
    slug: 'student-management',
    topicId: 'linear',
    title: '学生信息管理系统',
    short: '顺序表/链表对比演示',
    overview: '比较顺序表与链表在插入、删除和遍历时的行为差异。',
    difficulty: '入门',
    tags: ['线性结构', '顺序表', '链表'],
    recommendedNext: ['josephus', 'bank-queue'],
    steps: ['加载学生数据', '选择顺序表或链表模式', '执行增删改查并观察复杂度变化'],
  },
  {
    id: 'josephus',
    slug: 'josephus',
    topicId: 'linear',
    title: '约瑟夫环',
    short: '循环链表淘汰过程可视化',
    overview: '展示循环结构下的报数淘汰过程，理解索引偏移与边界处理。',
    difficulty: '进阶',
    tags: ['线性结构', '循环链表'],
    recommendedNext: ['bank-queue', 'stack-basic'],
    steps: ['设置总人数与步长', '启动循环淘汰动画', '查看剩余节点与下一个起点'],
  },
  {
    id: 'stack-basic',
    slug: 'stack-basic',
    topicId: 'stack-queue',
    title: '栈基础',
    short: '入栈与出栈交互演示',
    overview: '理解 LIFO 行为和典型边界：空栈弹出、容量扩展、栈顶更新。',
    difficulty: '入门',
    tags: ['栈与队列', '栈'],
    recommendedNext: ['bracket-matching', 'expression-evaluation'],
    steps: ['输入元素入栈', '执行出栈观察栈顶变化', '查看操作日志与状态快照'],
  },
  {
    id: 'bracket-matching',
    slug: 'bracket-matching',
    topicId: 'stack-queue',
    title: '括号匹配',
    short: '栈处理嵌套表达式',
    overview: '按字符流入栈出栈，验证括号配对并定位错误位置。',
    difficulty: '进阶',
    tags: ['栈与队列', '栈', '表达式'],
    recommendedNext: ['expression-evaluation', 'stack-basic'],
    steps: ['输入表达式', '逐字符匹配并标记异常', '输出匹配结果与错误索引'],
  },
  {
    id: 'expression-evaluation',
    slug: 'expression-evaluation',
    topicId: 'stack-queue',
    title: '表达式求值',
    short: '双栈法与运算优先级',
    overview: '通过操作符栈和操作数栈还原中缀表达式求值流程。',
    difficulty: '进阶',
    tags: ['栈与队列', '算法实践'],
    recommendedNext: ['binary-search-tree', 'stack-basic'],
    steps: ['输入中缀表达式', '执行分步求值', '查看每一步栈状态与中间结果'],
  },
  {
    id: 'bank-queue',
    slug: 'bank-queue',
    topicId: 'stack-queue',
    title: '银行排队系统',
    short: '队列调度与窗口分流',
    overview: '模拟多窗口服务，观察队列长度、等待时间与吞吐变化。',
    difficulty: '进阶',
    tags: ['栈与队列', '队列', '调度'],
    recommendedNext: ['stack-basic', 'binary-search-tree'],
    steps: ['设置窗口数量与到达率', '运行排队模拟', '分析平均等待时间和拥塞点'],
  },
  {
    id: 'binary-search-tree',
    slug: 'binary-search-tree',
    topicId: 'tree',
    title: '二叉搜索树模拟',
    short: '插入/删除/查找动态演示',
    overview: '动态显示 BST 形态变化，帮助理解有序性和查找路径。',
    difficulty: '进阶',
    tags: ['树结构', '二叉搜索树'],
    recommendedNext: ['shortest-path', 'hanoi'],
    steps: ['批量插入节点', '执行查找与删除', '查看中序遍历结果'],
  },
  {
    id: 'shortest-path',
    slug: 'shortest-path',
    topicId: 'graph',
    title: '最短路径搜索',
    short: '图上路径优化可视化',
    overview: '在加权图上展示最短路径迭代过程与路径回溯。',
    difficulty: '进阶',
    tags: ['图结构', '最短路径'],
    recommendedNext: ['hanoi', 'student-management'],
    steps: ['创建或加载图', '选择起点终点并运行算法', '查看路径与总权重'],
  },
  {
    id: 'hanoi',
    slug: 'hanoi',
    topicId: 'integrated',
    title: '汉诺塔',
    short: '递归挑战与步骤分解',
    overview: '通过递归拆解建立综合解题能力，强化状态转换思维。',
    difficulty: '综合',
    tags: ['综合实践', '递归'],
    recommendedNext: ['shortest-path', 'stack-basic'],
    steps: ['设置盘子数量', '执行自动演示或单步模式', '回放关键步骤并复盘策略'],
  },
]

export const topicMap = Object.fromEntries(topics.map((topic) => [topic.id, topic])) as Record<TopicId, Topic>
export const exerciseMap = Object.fromEntries(exercises.map((item) => [item.slug, item])) as Record<string, Exercise>

export const exercisesByTopic = (topicId: TopicId) =>
  exercises.filter((exercise) => exercise.topicId === topicId)
