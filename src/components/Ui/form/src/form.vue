<template>
  <section class="ui-component ui-form">
    <van-form v-bind="props" ref="vanForm" v-model="model">
      <template v-for="(group, index) in useGroups" :key="index">
        <van-cell-group>
          <template v-if="group.header" #title>
            <ItemsHeader :title="group.header.label" />
          </template>
          <template v-for="(item, i) in group.items" :key="i">
            <template v-if="itemShow(item)">
              <template v-if="['popupCascade'].indexOf(item.type)!==-1">
                <div class="multiSelect" @click="onClick(item)">
                  <van-field :label="item.label">
                    <template #input>
                      <div
                        v-if="!params[item.key] || params[item.key]?.length===0"
                        class="placeholder van-field__control"
                      >
                        {{ `请选择${item.label}` }}
                      </div>
                      <div v-else class="pickerList">
                        <div
                          v-for="(p,index) in (Array.isArray(params[item.key])?params[item.key]:[params[item.key]])"
                          :key="p"
                        >
                          <van-tag
                            :closeable="untilParseDict((Array.isArray(p)?p:[p]).join(','),{
                              options:get(item,'options',[]),
                              getKey:'disabled',
                              byKey:get(item,'mapper.value','value'),
                              childrenkey:get(item,'mapper.children','children'),
                              valueSplit:',',
                              split:'/',
                              dataType:'tree',
                            })!='true'"
                            size="large"
                            type="primary"
                            @close="closedPoppupTag(item,index)"
                          >
                            {{ untilParseDict((Array.isArray(p)?p:[p]).join(','),{
                              options:get(item,'options',[]),
                              getKey:get(item,'mapper.text','') || get(item,'mapper.label',''),
                              byKey:get(item,'mapper.value',''),
                              childrenkey:get(item,'mapper.children',''),
                              valueSplit:',',
                              split:'/',
                              dataType:'tree',
                            }) }}
                          </van-tag>
                        </div>
                      </div>
                    </template>
                  </van-field>
                </div>
              </template>
              <template v-else-if="item.type==='multiSelect'">
                <div class="multiSelect" @click="onClick(item)">
                  <van-field :label="item.label">
                    <template #input>
                      <div
                        v-if="!model[item.key]||model[item.key]?.length===0"
                        class="placeholder van-field__control"
                      >
                        {{ `请选择${item.label}` }}
                      </div>
                      <div v-else class="pickerList">
                        <div v-for="(p,index) in model[item.key]" :key="p">
                          <van-tag
                            closeable
                            size="large"
                            type="primary"
                            @close="model[item.key].splice(index,1)"
                          >
                            {{ p }}
                          </van-tag>
                        </div>
                      </div>
                    </template>
                  </van-field>
                </div>
              </template>
              <template v-else>
                <template v-if="['select','cascader','datetimePicker'].includes(item.type)">
                  <!-- {{ model[item.key] }} -->
                  <van-field
                    v-model="model[item.key]"
                    :name="item.key"
                    :label="item.label"
                    :class="[`labelPosition-${item.props?.labelPosition}`]"
                    is-link
                    readonly
                    :placeholder="`请选择${item.label}`"
                    v-bind="item.props"
                    @click="onClick(item)"
                  >
                    <template #label>
                      <slot :name="`${item.key}-label`" v-bind="item">
                        <span>{{ item.label }}</span>
                      </slot>
                    </template>
                    <template #button>
                      <slot :name="`${item.key}-button`" v-bind="item"></slot>
                    </template>
                  </van-field>
                </template>
                <template v-else-if="['slot'].includes(item.type)">
                  <!-- {{ model[item.key] }} -->
                  <van-field
                    v-model="model[item.key]"
                    :name="item.key"
                    :label="item.label"
                    :class="[`labelPosition-${item.props?.labelPosition}`,item.props?.class]"
                    readonly
                    :placeholder="`请选择${item.label}`"
                    v-bind="item.props"
                    @click="onClick(item)"
                  >
                    <template #label>
                      <slot :name="`${item.key}-label`" v-bind="item">
                        <span>{{ item.label }}</span>
                      </slot>
                    </template>
                    <template #button>
                      <slot :name="`${item.key}-button`" v-bind="item"></slot>
                    </template>
                    <template #input>
                      <slot :name="`${item.slotName || item.key}-input`" v-bind="item"></slot>
                    </template>
                  </van-field>
                </template>
                <template v-else>
                  <van-field
                    v-model="params[item.key]"
                    :name="item.key"
                    :label="item.label"
                    :class="[`labelPosition-${item.props?.labelPosition}`]"
                    :placeholder="`请填写${item.label}`"
                    v-bind="item.props"
                  >
                    <template #label>
                      <slot :name="`${item.slotName || item.key}-label`" v-bind="item">
                        <span>{{ item.label }}</span>
                      </slot>
                    </template>
                    <template #button>
                      <slot :name="`${item.slotName || item.key}-button`" v-bind="item"></slot>
                    </template>
                    <template v-if="['upload'].includes(item.type)" #input>
                      <ImageUploader v-model:files="params[item.key]" :props="item.props" />
                    </template>
                  </van-field>
                </template>
              </template>
            </template>
          </template>
        </van-cell-group>
      </template>
    </van-form>
  </section>
  <popupSelect
    v-if="popupSelectConfig.visible"
    v-model:visible="popupSelectConfig.visible"
    v-model="params[popupSelectConfig.key]"
    :popup-title="popupSelectConfig.popupTitle"
    :options="popupSelectConfig.options"
    v-bind="popupSelectConfig.props"
    @change="(data)=>{popupSelectConfig.change && popupSelectConfig.change(data)}"
  />
  <van-popup v-model:show="popup.visible" position="bottom">
    <template v-if="popup.contentType === 'datetimePicker'">
      <van-datetime-picker
        v-if="popup.visible"
        :type="popup.timeType || 'date'"
        :title="pickerTime.title || '请选择'"
        v-bind="pickerTime.props"
        @confirm="onTimeConfirm"
        @cancel="onClosePopup"
      />
    </template>

    <template v-else>
      <van-picker
        v-if="popup.visible && popup.contentType !== 'cascader'"
        :columns="picker.options"
        :columns-field-names="picker.customFieldName"
        @confirm="onConfirm"
        @cancel="onClosePopup"
      />
      <!-- v-model="cascaderValue" -->
      <van-cascader
        v-if="popup.visible && popup.contentType == 'cascader'"
        title="请选择"
        :field-names="picker.customFieldName"
        :options="picker.options"
        @close="onClosePopup"
        @finish="onConfirm"
      />
    </template>
  </van-popup>
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
import ImageUploader from '@/components/Ui/upload/upload.vue'
import popupSelect from '@/components/Ui/popup/popup.select.vue'
import useDictOptions from '@/hooks/state/use-dict-options'
import ItemsHeader from '@/components/Items/item.header.vue'
import { get, set } from 'lodash-es'
import { isArray, parseDict as untilParseDict, parseTime } from '@/utils'
import dayjs from 'dayjs'
import { useVModel } from '@vueuse/core'

const props = {
  groups: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  props: { type: Object, default: () => ({}) },
  options: { type: Object, default: () => ({}) }
}
export default defineComponent({
  name: 'UiForm',
  components: { ImageUploader, ItemsHeader, popupSelect },
  props,
  emits: ['update:params'],
  setup (props: any, ctx: SetupContext) {
    const vanForm: Ref<any> = ref('vanForm')
    const mapper = { text: 'name', value: 'id', children: 'childList' }
    const popup = ref({
      visible: false,
      contentType: ''
    })
    const popupSelectConfig = ref({
      key: '',
      popupTitle: '',
      visible: false,
      options: [],
      props: {},
      change: null
    })
    const closedPoppupTag = (item: any, index: number) => {
      if (Array.isArray(params.value[item.key])) {
        params.value[item.key].splice(index, 1)
      } else {
        params.value[item.key] = ''
      }
      item.change && item.change(params.value[item.key])
    }
    const picker = ref({
      type: '',
      key: '',
      originKey: '',
      options: [],
      customFieldName: mapper
    })
    const pickerTime = ref({
      key: ''
    })
    const model: Ref = ref({})
    const params: Ref = useVModel(props, 'params', ctx.emit)
    const useGroups = computed<any>(() => {
      props.groups.map((g: any) => {
        g.items.map((item: any) => {
          if (Array.isArray(item.key)) {
            item.originKey = item.key
            item.key = item.key.join('_')
          } else {
            item.originKey = item.key
          }
        })
      })
      return props.groups
    })
    useDictOptions(
      useGroups.value.map((group: any) => group.items || []).flat()
    )
    const current = ref()
    onMounted(() => {
      watch(
        params,
        () => {
          useGroups.value.map((g: any) => {
            g.items.map((item: any) => {
              if (
                ['select', 'cascader', 'datetimePicker'].includes(item.type)
              ) {
                if (Array.isArray(item.originKey)) {
                  const modelValue: any = []
                  item.originKey.map((k: string, index: number) => {
                    const getValue = get(params.value, k)
                    set(modelValue, `[${index}]`, getValue)
                  })
                  if (item.type === 'cascader') {
                    set(
                      model.value,
                      `${item.key}`,
                      parseTreeDicts(modelValue, item.options || [], item).join(
                        '/'
                      )
                    )
                  } else {
                    set(
                      model.value,
                      `${item.key}`,
                      parseDicts(modelValue, item.options || [], item)
                    )
                  }
                } else {
                  let modelValue: any = ''
                  const getValue = get(params.value, item.key)
                  if (Array.isArray(getValue)) {
                    modelValue =
                      parseDicts(getValue, item.options || [], item) || getValue
                  } else if (item.type === 'datetimePicker') {
                    modelValue = getValue
                      ? dayjs(new Date(getValue)).format(item.props.format)
                      : ''
                  } else {
                    modelValue =
                      parseDict(getValue, item.options || [], item) || getValue
                  }
                  set(model.value, `${item.key}`, modelValue)
                  // model.value[item.key]=modelValue
                  // if(item?.label=='机关单位'){
                  //   console.log(item.key,modelValue,model.value)
                  // }
                }
              }
            })
          })
        },
        {
          immediate: true
        }
      )
    })

    function onClick (item: any) {
      current.value = item
      switch (true) {
        case ['popupCascade'].includes(item.type):
          popupSelectConfig.value.visible = true
          popupSelectConfig.value.options = item.options || []
          popupSelectConfig.value.props = Object.assign(
            {},
            item.props,
            item.mapper ? { mapper: item.mapper } : {}
          )
          popupSelectConfig.value.key = item.key
          popupSelectConfig.value.change = item.change
          popupSelectConfig.value.popupTitle = item.label
          console.log('popupSelectConfig', popupSelectConfig)
          break
        case ['select', 'cascader', 'multiSelect'].includes(item.type):
          popup.value.visible = true
          popup.value.contentType = item.type
          picker.value.originKey = item.originKey
          picker.value.key = item.key
          picker.value.options = item.options
          picker.value.customFieldName = Object.assign(
            {},
            mapper,
            props?.options?.mapper,
            item.mapper
          )
          break
        case ['datetimePicker'].includes(item.type):
          popup.value.visible = true
          popup.value.contentType = item.type
          popup.value.timeType = item?.props?.type
          pickerTime.value.key = item.key
          pickerTime.value.props = item.pickProps || {}
          break
        default:
          break
      }
    }

    const valueKey = computed(() => picker.value.customFieldName.value)
    const textKey = computed(() => picker.value.customFieldName.text)
    function onConfirm (value: any) {
      if (current.value.type === 'multiSelect') {
        const realValue = value[valueKey.value]
        if (isArray(params.value[picker.value.key])) {
          params.value[picker.value.key].push(realValue)
        } else {
          if (!params.value[picker.value.key]) {
            params.value[picker.value.key] = []
          } else {
            params.value[picker.value.key] = [params.value[picker.value.key]]
          }
          params.value[picker.value.key].push(realValue)
        }
        params.value[picker.value.key] = Array.from(
          new Set(params.value[picker.value.key])
        )
        set(
          model.value,
          picker.value.key,
          parseDicts(
            params.value[picker.value.key],
            current.value.options,
            current.value
          )
        )
      } else if (current.value.type === 'cascader') {
        console.log('cascader', value)
        const cVals=value.selectedOptions || []
        const values = cVals.map((item: any) => item && item[valueKey.value])
        const names = cVals.map((item: any) => item && item[textKey.value])
        params.value[picker.value.key] = values
        if (Array.isArray(picker.value.originKey)) {
          picker.value.originKey.map((k: string, index: number) => {
            set(params.value, k, get(values, index))
          })
        } else {
          set(params.value, picker.value.originKey, values)
        }
        set(model.value, picker.value.key, names.join('/'))
      } else {
        set(params.value, picker.value.key, value[valueKey.value])
        set(model.value, picker.value.key, value[textKey.value])
      }
      ctx.emit('update:params', params.value)
      onClosePopup()
    }

    function parseTreeDicts (values: any[], options: any[], item?: any) {
      const vk =
        Object.assign(mapper, props?.options?.mapper, item?.mapper).value || ''
      const ck =
        Object.assign(mapper, props?.options?.mapper, item?.mapper).children ||
        ''
      return values.map((value, index) => {
        if (index === 0) {
          return parseDict(value, options, item)
        }
        if (index === 1) {
          return parseDict(
            value,
            options.find(opt => opt[vk] === values[0])?.[ck],
            item
          )
        }
        if (index === 2) {
          return parseDict(
            value,
            options
              .find(opt => opt[vk] === values[0])
              ?.[ck].find((opt: any) => opt[vk] === values[1])?.[ck],
            item
          )
        }
      })
    }

    function parseDicts (values: any[], options: any[], item?: any) {
      const vk =
        Object.assign(mapper, props?.options?.mapper || {}, item?.mapper || {})
          .value || ''
      const tk =
        Object.assign(mapper, props?.options?.mapper || {}, item?.mapper || {})
          .text || ''
      return values.map((value: any) => {
        return options.find(opt => opt[vk] === value)?.[tk]
      })
    }

    function parseDict (value: any, options: any[], item: any) {
      const vk =
        Object.assign(mapper, props?.options?.mapper || {}, item?.mapper || {})
          .value || ''
      const tk =
        Object.assign(mapper, props?.options?.mapper || {}, item?.mapper || {})
          .text || ''
      const findItem = options.find(opt => opt[vk] === value)
      return findItem?.[tk]
    }

    function onTimeConfirm (value: any) {
      set(
        model.value,
        pickerTime.value.key,
        dayjs(new Date(value)).format(current.value.props.format)
      )
      set(params.value, pickerTime.value.key, new Date(value).getTime())
      ctx.emit('update:params', params.value)
      onClosePopup()
    }

    function itemShow (item: any) {
      let visible = false
      switch (true) {
        case item.show && typeof item.show === 'function':
          visible = item.show(params.value, item)
          break
        default:
          visible = item.show !== false
          break
      }
      return visible
    }

    function onClosePopup () {
      popup.value.visible = false
    }

    const validate = computed(() => vanForm.value?.validate)
    const submit = computed(() => vanForm.value?.submit)
    const resetValidation = computed(() => vanForm.value?.resetValidation)
    const scrollToField = computed(() => vanForm.value?.scrollToField)
    return {
      vanForm,
      scrollToField,
      resetValidation,
      submit,
      validate,

      popupSelectConfig,

      popup,
      picker,
      pickerTime,
      useGroups,
      model,

      // fn
      closedPoppupTag,
      onConfirm,
      onTimeConfirm,
      onClick,
      onClosePopup,
      itemShow,
      parseDict,
      untilParseDict,
      parseTime,
      get
    }
  }
})
</script>
<style lang="scss" scoped>
.ui-form {
  :deep {
    .van-cell-group__title {
      padding: 0;
      color: $-primary-color-title;
    }

    .items-header {
      background: $white;
    }

    .van-cell-group {
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: $-margin-size-layout;

      &.van-cell-group:last-child {
        margin-bottom: 0;
      }

      .multiSelect {
        .placeholder {
          color: #c8c9cc;
        }

        .pickerList > div {
          margin-bottom: 5px;
        }
      }

      div.labelPosition-top {
        display: flex;
        flex-direction: column;

        .van-field__label {
          max-width: 100%;
          width: 100% !important;
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>
