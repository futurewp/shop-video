<template>
  <section class="items-component">
    <section class="left" :class="[size]">
      <slot name="left">
        <span class="title">{{ title }}</span>
      </slot>
    </section>

    <section v-if="arrow" class="right" @click="onArrow">
      <slot name="right">
        <i class="tr trarrow-right"></i>
      </slot>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ItemsArrowHead',

  props: {
    title: {
      type: String,
      default: ''
    },
    arrow: {
      type: Boolean,
      default: true
    },
    size: {
      type: String as PropType<'mini' | 'small' | 'large'>,
      default: 'small'
    }
  },

  emits: ['onClick'],

  setup (props, ctx) {

    const onArrow = () => {
      ctx.emit('onClick')
    }
    return {
      // fn
      onArrow
    }
  }
})
</script>
<style lang="scss" scoped>
$itemsHeaderBox-height: 35px;

.items-component {
  width: 100%;
  height: $itemsHeaderBox-height;
  line-height: $itemsHeaderBox-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $-padding-size-content;

  .left {
    color: $-color-4;

    &.large {
      font-size: 20px;

      i {
        font-size: 22px;
      }
    }

    &.small {
      font-size: 16px;

      i {
        font-size: 18px;
      }
    }

    &.mini {
      font-size: 12px;

      i {
        font-size: 14px;
      }
    }

    .left {
      color: $-primary-color-title;
    }

    .title {
      font-weight: 600;
    }

    .right {
      i {
        font-size: 18px;
        color: #000;
      }
    }
  }
}
</style>

