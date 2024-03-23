<template>
  <section class="app-container">
    <section class="content">
      <van-empty :description="tips" />
    </section>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route: any = useRoute()
    const tips = computed(() => {
      return route?.query?.tips || '网关错误'
    })
    return {
      tips
    }
  }
})
</script>
