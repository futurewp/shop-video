<template>
  <section class="items-component items-sort">
    <template v-for="(item, index) in data" :key="index">
      <section class="item" @click="onClick(item)">
        <span class="text">{{ item.label }}</span>
        <span :class="['icon', type]">
          <i class="tlba tlba-biaotou-zhengxu" :class="[{ active: type === 'asc' }]"></i>
          <i class="tlba tlba-biaotou-daoxu" :class="[{ active: type === 'desc' }]"></i>
        </span>
      </section>
    </template>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue'
import {get} from 'lodash-es'

export interface SortItemMode {
  [key: string]: string | undefined
}

const props = {
  data: { type: Array, default: () => ([]) },
  split: { type: String, default: '_' }
}
export default defineComponent({
  name: 'ItemsSort',

  props,

  emits: ['change'],

  setup (props: any, ctx: SetupContext) {
    const type = ref('')

    function onClick (item: SortItemMode) {
      const sort = type.value = type.value === 'asc' ? 'desc' : 'asc'
      const split = get(item,'split') || get(props,'split')
      ctx.emit('change', { key: item.key, sort, value: `${item.key}${split}${sort}` })
    }

    return {
      type,

      // fn
      onClick
    }
  }
})
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 13px;

  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0px;

    i {
      height: 7px;
      line-height: 7px;
      font-size: 20px;
      color: rgba($color: $-primary-color-info, $alpha: 0.3);

      &.active {
        color: $-primary-color;
      }
    }
  }
}
</style>
