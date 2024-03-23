<template>
  <section class="page_btns">
    <section v-for="(item, index) in data" :key="'btn_' + index" class="btns_box">
      <template v-if="item.childList && item.childList.length">
        <section v-if="item.label" class="btn_title" v-html="item.label"></section>
        <section class="btns_list">
          <section v-for="(oItem, oIndex) in (item.childList || [])" :key="'btn_' + index + '_' + oIndex"
            class="btn_item flex-center flex-column" :class="[{ active: selectedVal == oItem.value }, item.type]"
            @click="selectedVal = oItem.value; emits('change')">
            <template v-if="item.type === 'img'">
              <img v-if="oItem.icon" :src="oItem.icon" class="item_icon">
              <section class="item_val" v-html="oItem.label"></section>
            </template>
            <template v-else>
              <section v-if="hotList?.length && hotList.includes(Number(oItem.id))" class="item_tag">
                热销
              </section>
              <section v-else-if="oItem.msg" class="item_tag">
                {{ oItem.msg }}
              </section>
              <section v-else-if="oItem.discount" class="item_tag">
                {{ oItem.discount }}折
              </section>
              <section class="item_top">
                <span class="item_val" v-html="oItem.label"></span>
              </section>
              <section v-if="oItem.rmb" class="item_desc">
                <!-- <span>售价</span>
                <span>&nbsp;</span> -->
                <span>¥{{ oItem.rmb }}</span>
              </section>
              <section v-if="oItem.foreignCurrency" class="item_desc text_through">
                <span>原价</span>
                <span>&nbsp;</span>
                <span>¥{{ oItem.foreignCurrency }}</span>
              </section>
            </template>
          </section>
        </section>
        <slot name="btnAfter" :item="item"></slot>
      </template>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          title: '',
          childList: []
        }
      ]
    }
  },
  productInfo: {
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
const emits = defineEmits(['change', 'update:modelValue'])
const selectedVal: any = useVModel(props, 'modelValue', emits)
</script>
<style lang="scss" scoped>
.page_btns {
  width: 100%;
  padding: 5px 0 10px;

  .btns_box {
    width: 100%;

    &+.btns_box {
      margin-top: 10px;
    }
  }

  .btn_title {
    width: 100%;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
    color: #666;
    line-height: 24px;
    padding: 5px 0 5px;
    display: flex;
    align-items: center;

    span {
      white-space: nowrap;
      margin: 0 15px;
    }

    &:first-child {
      padding-top: 0;
    }

    // &::after,&::before{
    //   content: ' ';
    //   flex: 1;
    //   height: 1px;
    //   background: #c4c4c4;
    // }
  }

  .product_desc {
    margin: 12px 0px 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: $-primary-color;
    line-height: 22px;
    font-style: italic;
  }

  .btns_list {
    width: calc(100% + 10px);
    margin: -5px;
    display: flex;
    flex-wrap: wrap;

    .btn_item {
      width: calc(100% / 3 - 10px);
      border-radius: 6px;
      margin: 5px;
      border: 1px solid #C4C4C4;
      padding: 5px 1px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
      text-align: center;
      position: relative;
      overflow: hidden;

      .item_tag {
        position: absolute;
        right: -1px;
        top: -1px;
        display: inline-block;
        background: $-theme-btn-linear-gradient;
        border-radius: 0px 6px 0px 6px;
        padding: 0 6px;
        white-space: nowrap;
        font-size: 12px;
        color: #fff;
        line-height: 14px;
        text-align: center;
      }

      .item_val {
        font-size: 16px;
        line-height: 22px;
      }

      .item_unit {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }

      .text_through {
        font-size: 12px;
        text-decoration: line-through;
      }

      &.active {
        color: $-primary-color;
        background: rgba($color: $-primary-color, $alpha: 0.1);
        border-color: $-primary-color;
      }

      &.img {
        width: calc(100% / 3 - 10px);
        height: auto;
        padding: 10px !important;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        .item_icon {
          width: 70%;
          height: auto;
          border-radius: 5px;
          object-fit: contain;
          margin-bottom: 5px;
        }

        .item_val {
          font-size: 14px;
        }

        &.active {
          background: transparent;

          &::after {
            content: ' ';
            position: absolute;
            right: -1px;
            bottom: -1px;
            width: 18px;
            height: 13px;
            border-top-left-radius: 6px;
          }
        }
      }

      &.btn {
        &.active {
          background: $-theme-btn-linear-gradient;
          color: #fff;
          border-color: transparent;
        }
      }
    }
  }
}
</style>
