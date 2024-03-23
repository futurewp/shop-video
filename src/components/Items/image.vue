<template>
  <template v-if="lazy">
    <img v-lazy="state" class="items-img">
  </template>
  <template v-else>
    <img :src="state" class="items-img">
  </template>
</template>
<script lang="ts">
import { computed, defineComponent, Ref } from 'vue'
import { loadImg } from '@/utils'

export default defineComponent({
  name: 'ItemsImage',

  props: {
    lazy: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: 'no-picture.png'
    }
  },
  setup (props) {
    const state: Ref<string | HTMLImageElement> = computed(() =>
      loadImg(props.url)
    )
    return {
      state
    }
  }
})
</script>
<style lang="scss" scoped>
.items-img {
  width: 100%;
  height: 100%;
}
</style>
