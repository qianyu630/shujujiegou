<script setup lang="ts">
import { exercisesByTopic, topicOrder, topicMap } from '../data/site'
</script>

<template>
  <div class="practice-view">
    <section class="page-title panel">
      <p class="chip-small">专题练习</p>
      <h1>全部练习入口</h1>
      <p>对应 Stitch 的专题页集合，保持统一样式和流畅跳转关系。</p>
    </section>

    <section class="section-block">
      <div v-for="topicId in topicOrder" :key="topicId" class="topic-group panel">
        <div class="topic-head">
          <div>
            <h2>{{ topicMap[topicId].name }}</h2>
            <p class="sub">{{ topicMap[topicId].subtitle }}</p>
          </div>
          <router-link class="text-link" :to="`/topic/${topicMap[topicId].slug}`">专题页</router-link>
        </div>
        <div class="topic-grid">
          <router-link
            v-for="exercise in exercisesByTopic(topicId)"
            :key="exercise.id"
            :to="`/practice/${exercise.slug}`"
            class="topic-card"
          >
            <h3>{{ exercise.title }}</h3>
            <p class="sub">{{ exercise.short }}</p>
            <span class="chip-small">{{ exercise.difficulty }}</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
