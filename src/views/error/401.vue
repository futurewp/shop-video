<template>
  <section class="app-container">
    <section class="content">
      <van-empty :description="tips">
        <template #description>
          <!-- <p v-html="tips"></p> -->
          <section style="text-align: center;">
            <p>您暂未分配诉求办理权限</p>
            <p>有疑问请联系区服务企业办</p>
          </section>
        </template>
      </van-empty>
    </section>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const route: any = useRoute()
    const tips = computed(() => {
      return route?.query?.tips || '未知错误'
    })
    return {
      tips
    }
  }
})
</script>
