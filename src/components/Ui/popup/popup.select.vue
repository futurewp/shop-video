<template>
  <section v-if="popupVisible" class="popup-component">
    <van-popup v-model:show="popupVisible" v-bind="popupProps" :before-close="beforeClose">
      <section class="popup-content">
        <p class="title flex-group-row-between">
          <span>{{ popupTitle || '筛选' }}</span>
          <!-- <i
            class="tr trguanbi"
            @click="onClosePopup"
          ></i>-->
        </p>
        <section class="content scroller-y">
          <template v-for="(group,index) in selectOptions" :key="'group'+index">
            <section class="group">
              <p class="group-title">{{ group[labelKey] }}</p>
              <section class="items">
                <template
                  v-for="(cItem, cIndex) in group[childrenKey]"
                  :key="'group'+index+'_'+cIndex"
                >
                  <section
                    :class="['item', {disabled:!!cItem.disabled},{ active: isActive([group[valueKey],cItem[valueKey]],selectData)>=0 }]"
                    @click="onClickItem(cItem,[group, cItem])"
                  >
                    <p class="morePoints1">{{ cItem[labelKey] }}</p>
                  </section>
                </template>
              </section>
            </section>
          </template>
        </section>

        <section class="footer">
          <section class="submit" @click="onReset">
            <span>关闭</span>
          </section>
          <section class="submit active" @click="onSumbit">
            <span>确定</span>
          </section>
        </section>
      </section>
    </van-popup>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  Ref,
  SetupContext,
  toRefs,
  onMounted
} from 'vue'
// import { useStore } from 'vuex'
import { useVModel } from '@vueuse/core'
import { get, cloneDeep } from 'lodash-es'
import { Dialog } from 'vant'

export default defineComponent({
  name: 'FormPopupSelect',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    popupTitle: {
      type: String,
      default: ''
    },
    showAllLevels: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Object, Array],
      default: () => []
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    mapper: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    },
    popupProps: {
      type: Object,
      default: () => {
        return {
          position: 'right'
        }
      }
    }
  },

  emits: ['update:visible', 'update:modelValue', 'change'],
  setup(props: any, ctx: SetupContext) {
    // const store = useStore()
    const popupVisible = useVModel(props, 'visible', ctx.emit)
    const popProps = computed(
      Object.assign(
        {},
        {
          position: 'right'
        },
        props.popupProps || {}
      )
    )
    const valueKey = computed(() => get(props, 'mapper.value', 'value'))
    const labelKey = computed(() => {
      return (
        get(props, 'mapper.text', '') || get(props, 'mapper.label', 'label')
      )
    })
    const childrenKey = computed(() =>
      get(props, 'mapper.children', 'children')
    )
    const selectOptions = computed(() => props.options || [])
    console.log('selectOptions: ', selectOptions)
    const getAllLevelByLast = (data: any, id: any, allId: any) => {
      allId = allId || []
      if (!id) {
        return allId
      }
      if (data && data.length) {
        data.map((item: any) => {
          if (id == item[valueKey.value]) {
            allId.push(item[valueKey.value])
            console.log('ssssss', allId)
            return allId
          }
          if (item[childrenKey.value] && item[childrenKey.value].length) {
            allId.push(item[valueKey.value])
            console.log('ssssss', item[valueKey.value])
            const curLevelId = getAllLevelByLast(
              item[childrenKey.value],
              id,
              allId
            )
            if (allId.length && curLevelId.length == allId.length) {
              allId.splice(allId.length - 1, 1)
            } else {
              allId = curLevelId
            }
            return allId
          }
        })
      } else {
        return allId
      }
    }

    const findParents = (treeData: any, id: any) => {
      if (treeData.length == 0) return false
      for (let i = 0; i < treeData.length; i++) {
        if (treeData[i][valueKey.value] == id) {
          return [treeData[i][valueKey.value]]
        } else {
          if (treeData[i][childrenKey.value]) {
            const res: any = findParents(treeData[i][childrenKey.value], id)
            if (res) {
              return [].concat([treeData[i][valueKey.value]],res)
            }
          }
        }
      }
    }
    const selectData = ref([])
    const initData = () => {
      if (props.modelValue) {
        selectData.value = []
        let list = props.modelValue
        if (list && typeof list === 'string') {
          try {
            list = JSON.parse(list)
          } catch (error) {}
        }
        list = Array.isArray(list) ? list : [list]

        console.log('list', list)
        selectData.value = list.map((item: any) => {
          if (props.multiple && !props.showAllLevels && !Array.isArray(item)) {
            return findParents(selectOptions.value, item)
          } else {
            return item
          }
        })
      }
    }

    watch(
      () => {
        return selectOptions.value
      },
      () => {
        initData()
      },
      { deep: true }
    )
    watch(
      () => {
        return props.modelValue
      },
      () => {
        initData()
      },
      { deep: true }
    )
    initData()

    const isActive = (data: any, selData: any) => {
      let active = -1
      for (var i = 0; i < selData.length; i++) {
        const item = selData[i]
        if (Array.isArray(data) && Array.isArray(item)) {
          if (data.join(',') == item.join(',')) {
            active = i
            return active
          }
        }
      }
      return active
    }
    const onClickItem = (item: any, data: any) => {
      if (!!item.disabled) {
        return false
      }
      const cVal: any = []
      data.forEach((item: any) => {
        if (item[valueKey.value]) {
          cVal.push(item[valueKey.value])
        }
      })
      const itemIndex = isActive(cVal, selectData.value)
      if (itemIndex < 0) {
        if (props.multiple) {
          selectData.value.push(cVal)
        } else {
          selectData.value = [cVal]
        }
      } else {
        if (props.multiple) {
          selectData.value.splice(itemIndex, 1)
        } else {
          selectData.value = []
        }
      }
    }
    const beforeClose = () => {
      Dialog.confirm({
        title: '温馨提示',
        message: '点击确定按钮保存操作,是否继续关闭?',
        confirmButtonText: '继续'
      }).then(() => {
        ctx.emit('update:visible', false)
      })
      return false
    }
    const onReset = () => {
      beforeClose()
    }
    const onSumbit = () => {
      const valArr = cloneDeep(selectData.value)
      let tagetArr = []
      if (props.multiple) {
        if (props.showAllLevels) {
          tagetArr = valArr
        } else {
          valArr.forEach((item: any) => {
            tagetArr.push(item[item.length - 1])
          })
        }
      } else {
        if (props.showAllLevels) {
          tagetArr = valArr && valArr.length ? valArr[valArr.length - 1] : ''
        } else {
          const laseItem =
            valArr && valArr.length ? valArr[valArr.length - 1] : ''
          if (laseItem && Array.isArray(laseItem)) {
            tagetArr = laseItem[laseItem.length - 1]
          } else {
            tagetArr = laseItem || ''
          }
        }
      }
      console.log('tagetArr', tagetArr)
      ctx.emit('update:modelValue', tagetArr)
      ctx.emit('change', tagetArr)
      ctx.emit('update:visible', false)
    }
    return {
      popupVisible,
      popProps,
      valueKey,
      labelKey,
      childrenKey,
      selectOptions,

      selectData,
      isActive,
      onClickItem,
      onReset,
      onSumbit,
      beforeClose
    }
  }
})
</script>
<style lang="scss" scoped>
.popup-content {
  position: relative;
  width: 90vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  p.title {
    height: 40px;
    box-shadow: 0 0px 10px 0 rgba(34, 123, 124, 0.1);
    font-size: 16px;
    color: #333;
    text-align: justify;
    line-height: 20px;
    padding: 10px 10px;
  }
  .content {
    width: 100%;
    height: calc(100% - 45px - 30px);
    padding: 8px 10px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .group {
      padding: 8px 0;
      .group-title {
        font-size: 14px;
        text-align: justify;
        line-height: 20px;
        color: #333;
        position: relative;
        padding: 4px 12px 4px;
        margin-bottom: 8px;
        &::before {
          content: ' ';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 15px;
          border-radius: 4px;
          background: $-primary-color;
        }
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        margin: -4px;
        .item {
          min-width: 30%;
          height: 30px;
          border-radius: 4px;
          margin: 4px;
          padding: 5px;
          border: 1px solid $-primary-color;
          background: #fff;
          color: $-primary-color;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          // overflow:hidden;
          // text-overflow:ellipsis;
          // display:-webkit-box;
          // -webkit-box-orient:vertical;
          // -webkit-line-clamp:1;
          &.disabled {
            border: 1px solid #eee;
            color: #999999;
          }
          &.active {
            background: $-primary-color;
            color: #fff;
            &.disabled {
              border: 1px solid #eee;
              background: #eee;
              color: #999999;
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 45px;
    background: #fff;
    box-shadow: 0 0px 10px 0 rgba(34, 123, 124, 0.1);
    display: flex;
    align-items: center;
    padding: 0px 8px;
    z-index: 2;
    .submit {
      flex: 1;
      border-radius: 4px;
      padding: 5px 12px;
      border: 1px solid $-primary-color;
      background: #fff;
      font-size: 16px;
      color: $-primary-color;
      text-align: center;
      line-height: 20px;
      margin: 8px;
      &.active {
        background: $-primary-color;
        color: #fff;
      }
    }
  }
}
</style>
