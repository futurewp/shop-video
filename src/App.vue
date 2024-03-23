<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const route = useRoute()
    watch(route, async () => {
      await nextTick()
      window.scrollTo(0, 0)
    })
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
