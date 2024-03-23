<template>
  <section class="items-component">
    <van-image class="items-image" v-bind="props" :src="src" />
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import noPicture from 'static/images/app/no-picture.png'

export default defineComponent({
  name: 'ItemsBgImage',

  props: {
    src: {
      type: String,
      default: noPicture
    },
    props: { type: Object, default: () => ({}) }
  },

  setup () {
    return {
    }
  }
})
</script>
<style lang="scss" scoped>
.items-component {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  .items-image {
    width: 100%;
    height: 100%;
  }
}
</style>
