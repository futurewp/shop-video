<template>
  <section class="items-card">
    <van-card v-bind="data">
      <template #tags>
        <slot name="tags"></slot>
      </template>

      <template #bottom>
        <slot name="bottom"></slot>
      </template>

      <template #footer>
        <slot name="footer"></slot>
      </template>
    </van-card>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemsCard',

  props: {
    data: {
      type: Object ,
      default: () => ({})
    }
  },

  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.items-card {
  :deep .van-card {
    .van-card__title {
      margin-bottom: 3px;
      -webkit-line-clamp: 1;
      font-size: 14px;
      color: $-primary-color-title;
    }
    .van-ellipsis {
      max-height: 28px;
      display: -webkit-box;
      white-space: unset;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .van-card__bottom {
      line-height: 1.2;
    }
  }
}
</style>
