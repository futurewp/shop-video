<template>
  <section class="items-component">
    <span class="value color-mark">{{ data.value }}</span>
    <span class="label color-info">{{ data.label }}</span>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const props = {
  data: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'ItemsBlock',

  props,

  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.items-component {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(149, 201, 185, 0.10);
  border-radius: 10px;
  .value {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 2px;
  }
}
</style>
