<template>
  <section class="items-component">
    <template v-for="item in size" :key="item">
      <span :class="[{ active: item <= activeSize }]"></span>
    </template>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'

const props = {
  percent: { type: Number, default: 10 },
  options: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'ItemsProgress',

  props,

  setup (props: any) {
    const state = reactive<any>({
      size: 13
    })

    const activeColor = computed<string>(() => props.options.color || '#00A86B')
    const activeSize = computed<number>(() => {
      const value = props.percent || 0
      return (value * state.size) / 100
    })

    return {
      ...toRefs(state),
      activeColor,
      activeSize
    }
  }
})
</script>
<style lang="scss" scoped>
.items-component {
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    width: calc(100% / 13 - 1px);
    height: 5px;
    border-radius: 2px;
    background: #EFEFEF;
    &.active {
      background: v-bind(activeColor);
    }
  }
}
</style>
