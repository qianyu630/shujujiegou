import { createRouter, createWebHashHistory } from 'vue-router'
import StitchFrameView from '../views/StitchFrameView.vue'

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const stitchPageByRoute = {
  home: withBase('stitch/home.html'),
  stack: withBase('stitch/stack.html'),
  student: withBase('stitch/student.html'),
  josephus: withBase('stitch/josephus.html'),
  expression: withBase('stitch/expression.html'),
  bracket: withBase('stitch/bracket.html'),
  bst: withBase('stitch/bst.html'),
  bank: withBase('stitch/bank.html'),
  shortest: withBase('stitch/shortest.html'),
  hanoi: withBase('stitch/hanoi.html'),
} as const

const frame = (src: string) => ({
  component: StitchFrameView,
  props: { src },
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', ...frame(stitchPageByRoute.home) },
    { path: '/learning-path', name: 'learning-path', ...frame(stitchPageByRoute.home) },
    { path: '/practice', name: 'practice', ...frame(stitchPageByRoute.home) },
    { path: '/docs', name: 'docs', ...frame(stitchPageByRoute.home) },
    { path: '/topic/linear', name: 'topic-linear', ...frame(stitchPageByRoute.student) },
    { path: '/topic/stack-queue', name: 'topic-stack-queue', ...frame(stitchPageByRoute.stack) },
    { path: '/topic/tree', name: 'topic-tree', ...frame(stitchPageByRoute.bst) },
    { path: '/topic/graph', name: 'topic-graph', ...frame(stitchPageByRoute.shortest) },
    { path: '/topic/integrated', name: 'topic-integrated', ...frame(stitchPageByRoute.hanoi) },
    { path: '/practice/stack-basic', name: 'practice-stack-basic', ...frame(stitchPageByRoute.stack) },
    { path: '/practice/student-management', name: 'practice-student-management', ...frame(stitchPageByRoute.student) },
    { path: '/practice/josephus', name: 'practice-josephus', ...frame(stitchPageByRoute.josephus) },
    { path: '/practice/expression-evaluation', name: 'practice-expression-evaluation', ...frame(stitchPageByRoute.expression) },
    { path: '/practice/bracket-matching', name: 'practice-bracket-matching', ...frame(stitchPageByRoute.bracket) },
    { path: '/practice/binary-search-tree', name: 'practice-binary-search-tree', ...frame(stitchPageByRoute.bst) },
    { path: '/practice/bank-queue', name: 'practice-bank-queue', ...frame(stitchPageByRoute.bank) },
    { path: '/practice/shortest-path', name: 'practice-shortest-path', ...frame(stitchPageByRoute.shortest) },
    { path: '/practice/hanoi', name: 'practice-hanoi', ...frame(stitchPageByRoute.hanoi) },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
