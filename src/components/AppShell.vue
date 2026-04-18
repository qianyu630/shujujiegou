<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: '首页', to: '/' },
  { label: '学习路径', to: '/learning-path' },
  { label: '专题练习', to: '/practice' },
  { label: '文档说明', to: '/docs' },
]

const sideItems = [
  { label: '数据结构', to: '/learning-path', code: 'CORE' },
  { label: '专题练习', to: '/practice', code: 'PRACTICE' },
  { label: '快速入口', to: '/practice/stack-basic', code: 'START' },
]

const activeBase = computed(() => {
  if (route.path.startsWith('/learning-path')) return '/learning-path'
  if (route.path.startsWith('/practice') || route.path.startsWith('/topic')) return '/practice'
  if (route.path.startsWith('/docs')) return '/docs'
  return '/'
})

const activeSide = computed(() => {
  if (route.path.startsWith('/practice') || route.path.startsWith('/topic')) return '/practice'
  if (route.path.startsWith('/learning-path')) return '/learning-path'
  return '/practice/stack-basic'
})
</script>

<template>
  <div class="site-shell">
    <header class="global-header">
      <div class="header-brand">
        <span class="brand-mark"></span>
        <router-link to="/" class="brand-title">数据结构可视化</router-link>
      </div>
      <nav class="global-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: activeBase === item.to }"
        >
          {{ item.label }}
        </router-link>
      </nav>
      <div class="header-actions">
        <button class="action-dot" aria-label="action one"></button>
        <button class="action-dot" aria-label="action two"></button>
      </div>
    </header>

    <aside class="side-nav">
      <div class="side-top">
        <p class="side-title">数据结构</p>
        <p class="side-meta">NEURAL V2</p>
      </div>
      <nav class="side-links">
        <router-link
          v-for="item in sideItems"
          :key="item.to"
          :to="item.to"
          class="side-link"
          :class="{ active: activeSide === item.to }"
        >
          <span>{{ item.label }}</span>
          <small>{{ item.code }}</small>
        </router-link>
      </nav>
      <div class="side-bottom">
        <router-link to="/docs">技术文档</router-link>
      </div>
    </aside>

    <main class="page-canvas">
      <router-view />

      <footer class="global-footer">
        <div class="footer-grid">
          <section>
            <h4>平台简介</h4>
            <p>基于 Stitch 设计稿生成的前端站点，强化可视化学习和连续练习。</p>
          </section>
          <section>
            <h4>学习路径</h4>
            <router-link to="/learning-path">按阶段学习</router-link>
          </section>
          <section>
            <h4>专题练习</h4>
            <router-link to="/practice">查看全部练习</router-link>
          </section>
          <section>
            <h4>文档说明</h4>
            <router-link to="/docs">项目说明与扩展</router-link>
          </section>
        </div>
        <p class="footer-line">从基础结构到综合实践，形成连续学习体验。</p>
      </footer>
    </main>
  </div>
</template>
