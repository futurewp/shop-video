<template>
  <section class="items-component items-desc">
    <van-cell-group inset>
      <template v-for="(item, index) in items" :key="index">
        <van-cell :title="item.label" :value="item.value" />
      </template>
    </van-cell-group>
  </section>
</template>
<script lang="ts">
import { insetData } from '@/hooks/state/use-code-data'
import useDictOptions from '@/hooks/state/use-dict-options'
import { computed, defineComponent } from 'vue'

const props = {
  data: { type: Object, default: () => ({}) },
  labels: { type: Array, default: () => [] }
}
export default defineComponent({
  name: 'ItemsDescription',

  props,

  setup (props: any) {
    const propsLabels = computed<any>(() => props.labels || [])
    const { labels } = useDictOptions(propsLabels.value)
    const items = computed<any>(() => insetData(labels.value, props.data))
    return {
      items
    }
  }
})
</script>
