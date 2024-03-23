<template>
  <section class="list-counts">
    共<span class="color-mark">{{ total }}条</span>数据
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const props = {
  total: { type: Number, default: 0 }
}
export default defineComponent({
  name: 'ItemsTotal',

  props,

  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.list-counts {
  height: 24px;
  font-size: 13px;
  color: #233D35;
  span {
    margin: 0 2px;
  }
}
</style>
