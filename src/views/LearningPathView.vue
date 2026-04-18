<script setup lang="ts">
import { exercisesByTopic, topicOrder, topicMap } from '../data/site'
</script>

<template>
  <div class="learning-path-view">
    <section class="page-title panel">
      <p class="chip-small">学习路径</p>
      <h1>按阶段推进</h1>
      <p>线性结构 → 栈与队列 → 树结构 → 图结构 → 综合实践。</p>
    </section>

    <section class="timeline">
      <article v-for="(topicId, index) in topicOrder" :key="topicId" class="timeline-item panel">
        <div class="timeline-index">{{ index + 1 }}</div>
        <div class="timeline-content">
          <h2>{{ topicMap[topicId].name }}</h2>
          <p class="sub">{{ topicMap[topicId].subtitle }}</p>
          <p>{{ topicMap[topicId].description }}</p>
          <div class="pill-list">
            <span v-for="exercise in exercisesByTopic(topicId)" :key="exercise.id" class="pill">
              {{ exercise.title }}
            </span>
          </div>
          <router-link class="btn btn-primary" :to="`/topic/${topicMap[topicId].slug}`">进入该阶段</router-link>
        </div>
      </article>
    </section>
  </div>
</template>
