<template>
  <div class="ItemComment">
    <p class="name">{{ data.annoy ? '匿名用户' : data.coUserName }}</p>
    <p class="content">{{ data.content }}</p>
    <p class="info">
      <span>
        {{ parseTime(data.createTime) }}
      </span>
      <van-rate
        v-model="data.totalScore"
        :size="14"
        readonly
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { parseTime } from '@/utils'

export default defineComponent({
  name: 'ItemComment',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    return {
      parseTime
    }
  }
})
</script>

<style lang="scss" scoped>
.ItemComment {
  font-size: 13px;
  padding: 8px 0;
  border-bottom: 1px solid #F2F2F2;
  color: #222;

  .name {
    font-weight: bold;
    line-height: 20px;
  }

  .content {
    line-height: 16px;
    height: 32px;
    @include ellipsisMultiline(2);
  }

  .info {
    display: flex;
    justify-content: space-between;
    color: #666666;
  }
}
</style>
