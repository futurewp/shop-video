<template>
  <section class="items-component items-group">
    <section class="img">
      <template v-if="data.picture">
        <img :src="data.picture">
      </template>
      <template v-else-if="data.icon">
        <i :class="data.icon"></i>
      </template>
    </section>
    <section class="text">
      <section class="value" :class="data.classList || []">
        <span>{{ data.value }}</span>
        <small>{{ data.unit }}</small>
      </section>
      <section class="label">
        <span>{{ data.label }}</span>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const props = {
  data: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'ItemsGroup',

  props,

  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.items-group {
  display: flex;
  .img {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }
  .text {
    padding: 0 6px 0 8px;
    .value {
      font-size: 20px;
      span {
        font-weight: bold;
      }
      small {
        margin-left: 4px;
        font-size: 12px;
      }
    }
    .label {
      font-size: 12px;
      color: $-primary-color-label;
    }
  }
}
</style>
