<template>
  <section class="items-component items-value-ratio" :class="[{ active: active }]">
    <section class="label">
      <span>{{ data.value.label }}</span>
    </section>

    <section class="value">
      <ItemsValue :data="data.value" />
    </section>

    <section class="ratio">
      <ItemsRatio :data="data.ratio" />
    </section>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import ItemsValue from '@/components/Items/item.value.vue'
import ItemsRatio from '@/components/Items/item.ratio.vue'
import {get} from 'lodash-es'

const props = {
  data: { type: Object, default: () => ({}) },
  active: { type: Boolean, default: false }
}
export default defineComponent({
  name: 'ItemsValueRatio',

  components: { ItemsValue, ItemsRatio },

  props,

  setup (props: any) {
    const isUp = computed<boolean>(() => Number(get(props,'data.value', 0)) >= 0)
    return {
      isUp
    }
  }
})
</script>
<style lang="scss" scoped>
.items-value-ratio {
  width: 100%;
  display: flex;
  flex-direction: column;
  &.active {
    .label {
      color: $-primary-color;
    }
    .value {
      :deep {
        span {
          color: $-primary-color;
        }
      }
    }
  }
  & > section {
    padding: 2px 0;
  }
  .label {
    color: $-primary-color-title;
  }
}
</style>
