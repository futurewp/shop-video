<template>
  <section class="items-component items-box">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemsComponent',

  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.items-box {
  border-radius: 10px;
}
</style>
