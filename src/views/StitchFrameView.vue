<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ src: string }>()
const route = useRoute()
const enhancerSrc = `${import.meta.env.BASE_URL}stitch/enhance.js`

const frameRef = ref<HTMLIFrameElement | null>(null)
const frameKey = computed(() => `${route.fullPath}:${props.src}`)

const injectEnhancer = () => {
  const frame = frameRef.value
  const doc = frame?.contentDocument

  if (!frame || !doc) {
    return
  }

  if (!doc.querySelector('meta[data-codex-stitch-enhancer="true"]')) {
    const marker = doc.createElement('meta')
    marker.setAttribute('data-codex-stitch-enhancer', 'true')
    doc.head.appendChild(marker)
  }

  if (!doc.querySelector('script[data-codex-stitch-enhancer="true"]')) {
    const script = doc.createElement('script')
    script.src = enhancerSrc
    script.defer = true
    script.setAttribute('data-codex-stitch-enhancer', 'true')
    doc.head.appendChild(script)
  } else {
    frame.contentWindow?.dispatchEvent(new Event('codex:stitch-refresh'))
  }
}

onMounted(() => {
  injectEnhancer()
})

watch(
  () => props.src,
  () => {
    window.requestAnimationFrame(() => {
      injectEnhancer()
    })
  },
)

watch(
  () => route.fullPath,
  () => {
    window.requestAnimationFrame(() => {
      injectEnhancer()
    })
  },
)
</script>

<template>
  <div class="stitch-frame-wrap">
    <iframe
      ref="frameRef"
      :key="frameKey"
      :src="src"
      class="stitch-frame"
      title="stitch-page"
      @load="injectEnhancer"
    />
  </div>
</template>
