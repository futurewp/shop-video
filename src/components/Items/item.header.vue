<template>
  <section class="items-header" :class="[size, { borderBottom: options.borderBottom }]">
    <section class="title">
      <span class="h-prefix">
        <template v-if="!!options.picture">
          <img :src="options.picture">
        </template>
        <template v-else-if="options.icon">
          <i :class="options.icon"></i>
        </template>
        <template v-else>
          <span class="row"></span>
        </template>
      </span>
      <span class="text">{{ title }}</span>
      <span class="sub">{{ subTitle }}</span>
    </section>
    <section class="extra" @click="onExtra">
      <slot name="extra" v-bind="options.extra || {}">
        <template v-if="Object.keys(extra).length">
          <span>{{ extra.label }}</span>
          <template v-if="!!extra.icon">
            <img :src="extra.icon">
          </template>
          <template v-else>
            >
          </template>
        </template>
      </slot>
    </section>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'

export interface HeaderExtra {
  label: string
  path?: string
  link?: string
  icon?: string
  query?: any
}

const props = {
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  size: { type: String as PropType<'large' | 'middle' | 'small'>, default: 'middle' },
  options: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'ItemsHeader',

  props,

  setup (props: any) {
    const router = useRouter()
    const extra = computed<HeaderExtra>(() => props.options.extra || {})

    function onExtra () {
      if (!extra.value.path) return
      router.push({ path: extra.value.path, query: extra.value.query || {} })
    }

    return {
      extra,

      // fn
      onExtra
    }
  }
})
</script>
<style lang="scss" scoped>
.items-header {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $-page-header-padding;
  border-bottom: 1px solid #F2F2F2;

  .title {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
    color: $-primary-color-title;

    .text {
      position: relative;
      z-index: 1;
    }

    .h-prefix {
      display: flex;
      align-items: center;

      i {
        font-size: 16px;
      }

      span.row {
        width: 53px;
        height: 5px;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 0;
        background: linear-gradient(90deg, $-primary-color 0%, rgba(17, 183, 101, 0) 100%);
      }
    }

    .sub {
      font-weight: 400;
      margin-left: 4px;
      font-size: 12px;
      color: $-primary-color-info;
    }
  }

  &.borderBottom {
    border-bottom: $-border-solid;
  }

  &.large {
    .title {
      font-size: 18px;
    }

    img {
      width: 20px;
    }
  }

  &.small {
    .title {
      font-size: 14px;
    }

    img {
      width: 14px;
    }
  }

  img {
    width: 16px;
    vertical-align: text-top;
  }

  .extra {
    font-size: 14px;
    color: $-primary-color-info;
  }
}
</style>
