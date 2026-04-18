<script setup lang="ts">
import { exercises, topicOrder, topicMap } from '../data/site'

const featured = ['student-management', 'stack-basic', 'binary-search-tree', 'shortest-path']
const featuredExercises = exercises.filter((item) => featured.includes(item.slug))
</script>

<template>
  <div class="home-view">
    <section class="hero-panel">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <p class="hero-chip">新一代数据引擎</p>
        <h1>
          数据结构<br />
          <span>可视化交互平台</span>
        </h1>
        <p>
          在深度交互的学习环境中探索核心结构。保留 Stitch 设计稿的深色科技质感，并把多页面串联成真实可用网站。
        </p>
        <div class="hero-actions">
          <router-link class="btn btn-primary" to="/topic/linear">开始学习</router-link>
          <router-link class="btn btn-secondary" to="/practice">查看演示</router-link>
        </div>
      </div>

      <div class="hero-stats">
        <article class="stat-card">
          <strong>124+</strong>
          <span>可视化节点</span>
        </article>
        <article class="stat-card">
          <strong>99.9%</strong>
          <span>流程准确率</span>
        </article>
        <article class="stat-card wide">
          <strong>神经链路激活</strong>
          <div class="progress"><div></div></div>
        </article>
      </div>
    </section>

    <section class="section-header">
      <div>
        <h2>核心结构单元</h2>
        <p>Core Architectural Units</p>
      </div>
    </section>

    <section class="bento-grid">
      <article class="bento-card large">
        <div class="image fake-grid"></div>
        <div class="card-body">
          <h3>线性结构</h3>
          <p>顺序存储与链式存储的动态模拟，理解内存布局本质。</p>
          <router-link class="btn btn-ghost" to="/topic/linear">进入专题</router-link>
        </div>
      </article>

      <article class="bento-card small stack-theme">
        <h3>栈</h3>
        <p>进栈与出栈的原子级可视化</p>
        <router-link to="/practice/stack-basic">进入练习</router-link>
      </article>

      <article class="bento-card small queue-theme">
        <h3>队列</h3>
        <p>循环队列与优先队列形态演变</p>
        <router-link to="/practice/bank-queue">进入练习</router-link>
      </article>

      <article class="bento-card large">
        <div class="image fake-tree"></div>
        <div class="card-body">
          <h3>树结构</h3>
          <p>二叉树遍历、平衡调整与检索路径交互。</p>
          <router-link class="btn btn-ghost" to="/topic/tree">进入专题</router-link>
        </div>
      </article>

      <article class="bento-card full">
        <div>
          <h3>学习路径</h3>
          <p>按阶段推进：线性结构 → 栈与队列 → 树结构 → 图结构 → 综合实践。</p>
        </div>
        <div class="pill-flow">
          <span v-for="topicId in topicOrder" :key="topicId">{{ topicMap[topicId].name }}</span>
        </div>
      </article>
    </section>

    <section class="section-header compact">
      <div>
        <h2>继续探索</h2>
      </div>
      <router-link to="/practice">全部练习</router-link>
    </section>

    <section class="exercise-grid">
      <article v-for="item in featuredExercises" :key="item.id" class="exercise-card">
        <p class="chip-small">{{ topicMap[item.topicId].name }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.short }}</p>
        <router-link class="btn btn-secondary" :to="`/practice/${item.slug}`">进入</router-link>
      </article>
    </section>
  </div>
</template>
