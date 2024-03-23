<template>
  <section class="items-components items-value">
    <span>{{ data.value }}</span>
    <small>{{ data.unit }}</small>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const props = {
  data: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'ItemsValue',

  props,

  setup () {
    return {
      // ...toRefs(options)
    }
  }
})
</script>
<style lang="scss" scoped>
.items-value {
  display: flex;
  align-items: baseline;
  font-weight: bold;
  font-size: 20px;
  color: $-primary-color;
  span {
    color: $black;
  }
  small {
    margin-left: 4px;
    font-size: 12px;
    color: $-primary-color-unit;
  }
}
</style>
