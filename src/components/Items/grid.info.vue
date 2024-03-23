<template>
  <section class="items-component">
    <template v-for="(item, index) in data" :key="index">
      <section class="item" :class="{ 'odd-item': item.props?!!item.props.full:false }">
        <section class="title-box">
          <span>{{ item.label }}</span>
        </section>
        <section class="value-box">
          <template v-if="item.type==='image'">
            <img
              v-for="(src,i) in parseImage(item.value)"
              :key="i"
              :src="src && src.url?src.url:''"
              alt
            />
          </template>
          <template v-else-if="item.type==='date'">{{ parseTime(item.value, '{y}-{m}-{d}') }}</template>
          <template v-else-if="item.type==='slot'">
            <slot :name="item.slotName || item.key" v-bind="item"></slot>
          </template>
          <template v-else>
            <span>{{ item.tValue || item.value }}</span>
          </template>
        </section>
      </section>
    </template>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { parseTime } from '@/utils'

export default defineComponent({
  name: 'ItemsGridInfo',

  props: {
    data: { type: Array, default: () => [] }
  },

  setup(props: any) {
    function parseImage(value: any) {
      if (typeof value === 'string' && value.indexOf('[') >= 0) {
        const data = JSON.parse(value)
        if (data.length > 0) {
          return JSON.parse(value)
        } else {
          return []
        }
      } else if (typeof value === 'string') {
        return value
      }
    }

    return {
      parseImage,
      parseTime
    }
  }
})
</script>
<style lang="scss" scoped>
$border: 1px solid #eee;
.items-component {
  display: flex;
  flex-wrap: wrap;
  border-bottom: $border;
  border-left: $border;
  font-size: 14px;

  .item {
    width: 50%;
    height: auto;
    min-height: 40px;
    display: flex;
    border-top: $border;
    border-right: $border;
    color: #999;

    & > section {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .title-box {
      width: 120px;
      justify-content: flex-start;
      padding: 5px 15px;
      color: #999;
      background-color: #f9f9fb;
    }

    .value-box {
      flex: 1;
      padding: 10px;
      color: #333;

      img {
        max-width: 120px;
        max-height: 120px;
      }
    }

    &.odd-item {
      width: 100%;
    }
  }
}
</style>
