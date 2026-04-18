<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { exercisesByTopic, topicMap, topics } from '../data/site'

const route = useRoute()

const topic = computed(() => topics.find((item) => item.slug === String(route.params.topicSlug)))
const cards = computed(() => (topic.value ? exercisesByTopic(topic.value.id) : []))
const nextTopic = computed(() => {
  if (!topic.value?.nextTopic) return null
  return topicMap[topic.value.nextTopic]
})
</script>

<template>
  <div v-if="topic" class="topic-view">
    <section class="page-title panel">
      <p class="chip-small">首页 / {{ topic.name }} / 专题</p>
      <h1>{{ topic.name }}</h1>
      <p>{{ topic.subtitle }}</p>
    </section>

    <section class="section-block">
      <article class="topic-summary panel">
        <h2>专题说明</h2>
        <p>{{ topic.description }}</p>
      </article>
    </section>

    <section class="section-block">
      <div class="exercise-grid">
        <article v-for="item in cards" :key="item.id" class="exercise-card panel">
          <p class="chip-small">{{ topic.name }}</p>
          <h3>{{ item.title }}</h3>
          <p class="sub">{{ item.short }}</p>
          <p>{{ item.overview }}</p>
          <router-link class="btn btn-primary" :to="`/practice/${item.slug}`">进入练习</router-link>
        </article>
      </div>
    </section>

    <section v-if="nextTopic" class="section-block compact">
      <div class="compact-note panel">
        <h2>下一阶段推荐</h2>
        <p>建议继续学习：{{ nextTopic.name }}，保持连续进阶。</p>
        <router-link class="btn btn-secondary" :to="`/topic/${nextTopic.slug}`">进入下一阶段</router-link>
      </div>
    </section>
  </div>

  <div v-else class="not-found-block panel">
    <h2>专题不存在</h2>
    <router-link to="/" class="btn btn-primary">返回首页</router-link>
  </div>
</template>
