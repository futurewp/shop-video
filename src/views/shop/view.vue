<template>
  <section class="app-container votcie_h5">
    <section class="content">
      <section class="form">

      </section>
    </section>
    <shopMask ref="vRef" v-model="isShowShop" v-model:params="params" @change="voticeChange" />
  </section>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { Toast } from 'vant'
import shopMask from './components/shopMask.vue'
const vRef = ref()
const isShowShop = ref(true)
const params: any = ref({
  type: '爱奇艺',
  days: '一月'
})
</script>
<style lang="scss" scoped>
.votcie_h5 {
  width: 100vw;
  height: 100vh;
  background: #fff;

  .content {
    padding: 20px;

    .form {
      :deep {
        .van-cell-group {
          background: transparent;

          .van-cell {
            height: 50px;
            border-radius: 10px;

            &~.van-cell {
              margin-top: $-padding-size-layout;
            }
          }
        }
      }
    }
  }
}
</style>
