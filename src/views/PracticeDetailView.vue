<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { exerciseMap, topicMap } from '../data/site'

const route = useRoute()

const exercise = computed(() => exerciseMap[String(route.params.exerciseSlug)])
const topic = computed(() => (exercise.value ? topicMap[exercise.value.topicId] : null))

const nextCards = computed(() => {
  if (!exercise.value) return []
  return exercise.value.recommendedNext.map((slug) => exerciseMap[slug]).filter(Boolean)
})

const stackPreview = computed(() => {
  const text = exercise.value?.title ?? ''
  return text
    .replace(/\s+/g, '')
    .slice(0, 4)
    .split('')
    .reverse()
})
</script>

<template>
  <div v-if="exercise && topic" class="detail-page">
    <header class="detail-header">
      <div class="crumbs">
        <router-link to="/">首页</router-link>
        <span>/</span>
        <router-link :to="`/topic/${topic.slug}`">{{ topic.name }}</router-link>
        <span>/</span>
        <strong>{{ exercise.title }}</strong>
      </div>
      <div class="tag-line">
        <span class="chip-small">{{ topic.name }}</span>
        <span class="line"></span>
        <small>{{ exercise.difficulty }} · Neural Mode</small>
      </div>
      <h1>{{ exercise.title }} <em>{{ exercise.short }}</em></h1>
      <p>{{ exercise.overview }}</p>
    </header>

    <section class="detail-grid">
      <article class="panel panel-interaction">
        <div class="panel-top">
          <label>输入区域 INPUT</label>
          <span>ACTIVE</span>
        </div>
        <div class="input-box">{{ exercise.tags.join(' · ') }}</div>
        <div class="panel-actions">
          <button class="btn btn-primary">运行模拟</button>
          <button class="btn btn-secondary">单步执行</button>
        </div>
      </article>

      <article class="panel panel-stack">
        <h3>结构状态可视化</h3>
        <div class="stack-visual">
          <div v-for="(item, idx) in stackPreview" :key="`${item}-${idx}`" class="stack-item">
            {{ item }}
          </div>
        </div>
        <p class="sub">根据当前练习自动生成演示栈</p>
      </article>

      <article class="panel panel-steps">
        <h3>操作流程</h3>
        <ol>
          <li v-for="step in exercise.steps" :key="step">{{ step }}</li>
        </ol>
      </article>

      <article class="panel panel-console">
        <h3>执行日志</h3>
        <div class="console">
          <p>> boot {{ exercise.slug }}</p>
          <p>> topic {{ topic.slug }}</p>
          <p>> mode visualize</p>
          <p class="ok">status: ready</p>
        </div>
      </article>
    </section>

    <section class="next-section">
      <h2>下一步推荐</h2>
      <div class="next-grid">
        <router-link v-for="item in nextCards" :key="item.id" :to="`/practice/${item.slug}`" class="next-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.short }}</p>
          <span>{{ topicMap[item.topicId].name }}</span>
        </router-link>
      </div>
    </section>

    <section class="cta-row">
      <router-link class="btn btn-ghost" to="/">返回首页</router-link>
      <router-link v-if="nextCards[0]" class="btn btn-primary" :to="`/practice/${nextCards[0].slug}`">
        继续下一练习
      </router-link>
      <router-link class="btn btn-secondary" :to="`/topic/${topic.slug}`">回到本专题</router-link>
    </section>
  </div>

  <div v-else class="not-found-block">
    <h2>练习不存在</h2>
    <router-link to="/practice" class="btn btn-primary">返回专题练习</router-link>
  </div>
</template>
