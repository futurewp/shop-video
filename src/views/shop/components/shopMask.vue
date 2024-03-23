<template>
  <section>
    <van-popup v-model:show="popupVisible" v-bind="popupProps" :before-close="beforeClose">
      <section class="popup_content">
        <section class="content_top">
          <img v-if="model.type" class="shop_img" :src="`static/images/video/${model.type}.png`">
          <section class="shop_info">
            <p></p>
            <p>
              <span>已选择：</span>
              <span v-if="model.type">{{ model.type || '' }}</span>
              <span v-if="model.days">&nbsp;{{ model.days || '' }}</span>
            </p>
          </section>
        </section>
        <section class="content_main">
          <viewSku v-model="model" />
        </section>
        <van-button class="submit_btn flex-center" type="primary" @click="goSubmit">
          立即激活
        </van-button>
      </section>
    </van-popup>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { useRoute } from 'vue-router'
import viewSku from './sku.vue'
import { Dialog, Toast } from 'vant'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  params: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emits = defineEmits(['change', 'update:modelValue', 'update:params'])
const route = useRoute()
const popupVisible = useVModel(props, 'modelValue', emits)
const model = useVModel(props, 'params', emits)
const popupProps = ref({
  overlay: true,
  closeable: false,
  class: 'shop_popup',
  position: 'bottom',
  round: true,
})
function beforeClose () {
  // closeVotice()
  return false
}
function goSubmit () {
  if (!model.value.dyId) {
    Toast('请填写抖音Id')
    return false
  }
  Dialog.alert({
    title: '立即激活',
    message: '请在抖音商城查收订单',
    className: 'fk_mask',
    confirmButtonText: '知道了',
    showCancelButton: false,
    cancelButtonText: '取消',
    closeOnClickOverlay: false,
    allowHtml: true
  }).then(() => {
    model.value.dyId = ''
  })
}

</script>
<style lang="scss" scoped>
@keyframes move {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(2);
  }
}

.shop_popup {

  .popup_content {
    width: 100%;
    background: #fff;
    padding: 20px 20px;
    box-shadow: 0px 40px 40px 0px rgba(34, 123, 124, 0.1);
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    font-weight: normal;
    color: #666;

    .content_top {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;

      .shop_img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        margin-right: 15px;
      }

      .shop_info {
        flex: 1;
        width: calc(100% - 80px - 15px);
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }
    }

    .content_main {
      width: 100%;
      height: auto;
      padding: 20px 0 20px;
    }

  }


  .submit_btn {
    width: 302px;
    height: 45px;
    background: $-theme-btn-linear-gradient !important;
    border-radius: 23px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 24px;
    margin: 0 auto 10px;

    &.disabled {
      opacity: 0.5;
    }

    &.border {
      background: rgba($-primary-color, 0.1) !important;
      border: 1px solid $-primary-color;
      color: $-primary-color;
    }
  }

  .submit_text {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $-primary-color;
    line-height: 22px;
    text-align: center;
    margin-bottom: 10px;

    &.small {
      font-size: 12px;
    }
  }
}
</style>
