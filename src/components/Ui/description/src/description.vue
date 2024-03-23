<template>
  <section class="items-component items-desc">
    <van-cell-group inset v-bind="groupProps">
      <template v-if="!!title">
        <ItemsHeader :title="title" />
      </template>
      <div class="content">
        <template v-for="(item, index) in items" :key="index">
          <van-cell
            :title="item.label"
            v-bind="cellProps"
            :class="[item.props?.labelPosition && `labelPosition-${item.props?.labelPosition}`, labelAlign, valueAlign]"
          >
            <template v-if="item.type === 'slot'">
              <slot :name="`${item.key}-input`" v-bind="item"></slot>
            </template>
            <template v-else-if="item.type === 'image'">
              <template v-for="(image, i) in item.value" :key="i">
                <img class="image" :src="image">
              </template>
            </template>
            <template v-else>
              <span>{{ item.value }}</span>
            </template>
          </van-cell>
        </template>
      </div>
    </van-cell-group>
  </section>
</template>
<script lang="ts">
import { insetData } from '@/hooks/state/use-code-data'
import useDictOptions from '@/hooks/state/use-dict-options'
import { computed, defineComponent } from 'vue'
import ItemsHeader from '@/components/Items/item.header.vue'

const props = {
  title: { type: String, default: '' },
  data: { type: Object, default: () => ({}) },
  labels: { type: Array, default: () => [] },
  groupProps: { type: Object, default: () => ({}) },
  cellProps: { type: Object, default: () => ({}) },
  options: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'UiDescription',

  components: { ItemsHeader },

  props,

  setup (props: any) {
    const useData = computed<any>(() => props.data)
    const propsLabels = computed<any>(() => props.labels || [])
    const mapper = computed<any>(() => Object.assign({ name: 'name', id: 'id' }, props.options.mapper || {}))
    const { labels } = useDictOptions(propsLabels.value, mapper.value)
    const items = computed<any>(() => insetData(labels.value, useData.value))

    const labelAlign = computed<string>(() => `label-align-${props.cellProps.align || 'left'}`)
    const valueAlign = computed<string>(() => `value-align-${props.cellProps.align || 'left'}`)

    return {
      items,
      labelAlign,
      valueAlign
    }
  }
})
</script>
<style lang="scss" scoped>
.items-desc {
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 5px;

  .image {
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .content {
    padding: 8px 0;
  }

  :deep {
    .van-cell {
      color: #222222;

      &.label-align-right {
        .van-cell__title {
          text-align: right;
        }
      }

      &.value-align-left {
        .van-cell__value {
          text-align: left;
        }
      }

      &.labelPosition-top {
        display: flex;
        flex-direction: column;

        .van-cell__title {
          max-width: 100%;
          width: 100% !important;
          margin-bottom: 6px;
        }

        .van-cell__value {
          text-align: left;
        }
      }
    }
  }
}
</style>
