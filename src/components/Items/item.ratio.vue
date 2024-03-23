<template>
  <section class="items-component items-ratio">
    <span class="label">{{ data.label }}</span>
    <span class="value">
      <i :class="['tlba', isUp ? 'tlba-shuzhishangsheng' : 'tlba-shuzhixiajiang']"></i>
      {{ data.value }}{{ data.unit }}
    </span>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { get } from 'lodash-es'

const props = {
  data: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'ItemsRatio',

  props,

  setup (props: any) {
    const isUp = computed<boolean>(() => Number(get(props,'data.value',0)) >= 0)
    return {
      isUp
    }
  }
})
</script>
<style lang="scss" scoped>
.items-ratio {
  display: flex;
  align-items: center;
  .label {
    margin-right: 5px;
  }
  .value {
    display: flex;
    font-size: 12px;
    color: $-primary-color-down;
    i {
      margin-left: 4px;
    }
    &.isUp {
      color: $-primary-color-up;
    }
  }
}
</style>
