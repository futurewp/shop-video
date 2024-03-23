<template>
  <section class="items-component">
    <section class="image">
      <template v-if="!!data.picture">
        <img :src="data.picture">
      </template>
      <template v-else-if="!!data.icon">
        <i :class="data.icon"></i>
      </template>
    </section>
    <label class="label">
      <span>{{ data.label || '' }}</span>
    </label>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemsMenu',

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $-primary-color-title;
  .image {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $-primary-color-icon;
    img {
      width: 31px;
    }
    i {
      margin: 0 auto;
      font-size: 33px;
      font-weight: bold;
    }
  }
  .label {
    margin-top: 5px;
  }
}
</style>
