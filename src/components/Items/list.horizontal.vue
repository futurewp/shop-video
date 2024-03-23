<template>
  <section class="items-component">
    <section class="scroll-content">
      <slot></slot>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.items-component {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  // transform: translateX(-1000px);
  // transition-duration: 100s;
  .scroll-content {
    height: 100%;
    white-space: nowrap;
    :deep > * {
      display: inline-block;
      & ~ * {
        margin-left: 10px;
      }
    }
  }
}
</style>
