<template>
  <section class="page_form">
    <UiForm ref="sendForm" v-model:params="model" :groups="groups" :props="{}" :options="{}">
      <template #btns-input="{ key, options }">
        <ViewBtns v-model="model[key]" :data="options" @change="emits('changeProduct')" />
      </template>
    </UiForm>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { UiForm } from '@/components/Ui/form'
import { useVModel } from '@vueuse/core'
import ViewBtns from './btns.vue'
import { get, cloneDeep } from 'lodash-es'
import { useRouter } from 'vue-router'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {}
    }
  },
  formType: {
    type: String,
    default: ''
  },
  // 产品列表
  productList: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 小分类列表
  sortList: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 当前tab内含信息
  tabInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  disInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  productInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  pageInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  hotList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const emits = defineEmits(['update:modelValue', 'changeProduct'])
const model: any = useVModel(props, 'modelValue', emits)
const router = useRouter()

const groups = ref([
  {
    items: [
      {
        label: '影视APP',
        key: 'type',
        type: 'slot',
        slotName: 'btns',
        options: [
          {
            type: 'img',
            childList: [
              { label: '爱奇艺', value: '爱奇艺', icon: 'static/images/video/爱奇艺.png' },
              { label: '优酷视频', value: '优酷视频', icon: 'static/images/video/优酷视频.png' },
              { label: '腾讯视频', value: '腾讯视频', icon: 'static/images/video/腾讯视频.png' },
              { label: '芒果视频', value: '芒果视频', icon: 'static/images/video/芒果视频.png' }
            ]
          }
        ],
        props: {
          labelPosition: 'top'
        }
      },
      {
        label: '选择天数',
        key: 'days',
        type: 'slot',
        slotName: 'btns',
        options: [
          {
            type: 'btn',
            childList: [
              { label: '一月', value: '一月', icon: '' },
              { label: '一季', value: '一季', icon: '' },
              { label: '一年', value: '一年', icon: '' }
            ]
          }
        ],
        props: {
          labelPosition: 'top'
        }
      },
      {
        label: '抖音ID',
        key: 'dyId',
        type: 'input',
        props: {
          labelPosition: 'top'
        }
      },
    ]
  }
])

</script>
<style lang="scss" scoped>
.page_form {
  width: calc(100% + 20px);
  padding: 6px 12px;
  margin: 0 -10px;

  :deep(.ui-form) {
    .van-cell-group {
      &::after {
        display: none;
      }

      .van-cell {
        padding: 6px 0;
        font-size: 0;

        &::after {
          display: none;
        }

        .van-field__body {
          width: 100%;
        }

        .van-field__label {
          width: 100px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #333333;
        }

        .van-field__value {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 400;
          color: #666;
          line-height: 22px;
        }

        input {
          background: #f5f6f7;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 14px;
        }

        &.noLabel {
          .van-field__label {
            display: none;
          }
        }
      }
    }

    .no_tips {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: $-primary-color;
      font-style: italic;
    }

    .form_content {
      width: 100%;
      margin-bottom: 2px;

      .van-checkbox {
        margin: 5px 0;

        .van-checkbox__icon {
          font-size: 18px;
        }

        .van-checkbox__label {
          font-size: 12px;
          color: #C4C4C4;
        }
      }

      .van-stepper {
        height: 30px;
        border-radius: 15px;
        border: 1px solid #C4C4C4;

        button {
          background: transparent;
        }

        .van-stepper__input {
          min-width: 40px;
          margin: 0;
          background: transparent;
          border-left: 1px solid #C4C4C4;
          border-right: 1px solid #C4C4C4;
        }
      }

      .unit_input {
        width: 100%;
        border-radius: 6px;
        border: 2px solid #ED732E;
        padding: 4px 10px;
        display: flex;
        align-items: center;

        .icon_clear {
          margin-left: 10px;
        }

        .van-field {
          flex: 1;
          padding: 0;
          background-color: transparent;

          input {
            width: 100%;
            height: 32px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 32px;

            &::-webkit-input-placeholder {
              font-size: 16px;
              color: #C4C4C4;
            }

            &::-moz-placeholder {
              font-size: 16px;
              color: #C4C4C4;
            }

            &::moz-placeholder {
              font-size: 16px;
              color: #C4C4C4;
            }

            &::-ms-input-placeholder {
              font-size: 16px;
              color: #C4C4C4;
            }
          }
        }
      }
    }
  }
}
</style>
