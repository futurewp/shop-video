<template>
  <section class="items-component">
    <label class="label">
      <slot name="label">
        <span>{{ data.label || '' }}：</span>
      </slot>
    </label>
    <section class="value-box">
      <slot name="value">
        <span>{{ data.value || '' }}</span>
        <span>{{ data.unit || '' }}</span>
      </slot>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemsItemHorizontal',

  props: {
    data: { type: Object, default: () => ({}) }
  },

  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.items-component {
  height: 26px;
  line-height: 26px;
  display: flex;
  align-items: center;
  font-size: 12px;
  .label {
    color: #888;
  }
  .value-box {
    color: #444;
  }
}
</style>
