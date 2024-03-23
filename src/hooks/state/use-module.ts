import { computed, getCurrentInstance, watch, watchEffect, Ref, ref, ComputedRef, reactive, isRef } from 'vue'
import { get, set, cloneDeep } from 'lodash-es'
import { MenuMode } from '../../typings/data'
import { MapperMode } from '../../typings/items'
import useCheckedMenu from './use-checked-menu'
import { convertValue, isArray, isJsonString, isObject, isStringFunction } from '../../utils'
import { nFileBase64ById } from '../../_api'
import { FieldItem, ModuleOptions, ModuleHookMode } from '../types'
import { useGlobal, useState } from '..'

export const dictConfig: any = {
  /**
   * ui field
   */
  FieldUIMapper: {
    e6: 'text',
    e7: 'input',
    e8: 'select',
    e9: 'cascader',
    e10: 'checkbox-group',
    e11: 'radio-group',
    e12: 'switch',
    e13: 'date',
    e14: 'rate',
    e15: 'slider',
    e16: 'tag',
    e17: 'image',
    e18: 'colorPicker',
    e19: 'link',
    e20: 'slot',
    e24: 'input-number',
    e25: 'date-picker',
    e99: 'custom'
  }
}

// 创建dict key
export function createDictKey (type: number | string) {
  return `dict_${ type }`
}

export default function useModule (options?: ModuleOptions, argData?: Ref<any> | ComputedRef<any>): ModuleHookMode {
  const instance: any = getCurrentInstance()
  const { id, menuTypes, useArgData, menus: aMenus, viewKey, labels }: any = options || {}

  const { menus } = useState({ viewKey })
  const uMenus = computed<any>(() => (aMenus && (isRef(aMenus) ? aMenus.value : aMenus)) || menus.value)

  // about menus
  const { menu } = useCheckedMenu()
  const menuModules = computed<MenuMode[]>(() => (uMenus.value?.jsonMenus?.['3'] || []) as MenuMode[])

  const dataIsArray = isArray(instance?.props?.data)
  const defaultData = dataIsArray ? [] : {}
  // about data
  const useData = computed<any>(() => {
    const dataPath = options?.dataPath
    const pData = instance?.props?.data
    const uAData = !!dataPath ? get(argData?.value, dataPath, '') : argData?.value
    const uPData = (!!dataPath ? get(pData, dataPath, '') : pData) || defaultData
    const useArg = useArgData === true || ((!uPData || !Object.keys(uPData).length) && !!uAData)
    return useArg ? uAData : uPData
  })

  // about group.currentAna
  const group: any = computed(() => instance?.props?.group || {})
  const currentAna: any = computed(() => group.value.currentAna || {})
  const fieldConf: any = computed(() => currentAna.value.fieldConf || {})
  const module = computed<MenuMode>(() => menuModules.value.find((menu: MenuMode) => {
    const menuSid = String(menu.sid)
    if (!!id) {
      return menuSid === String(id)
    } else {
      return menuSid === String(fieldConf.value.parentId)
    }
  }) || {} as MenuMode)
  const ids = computed<string[]>(() => {
    let uIds: string[] = []
    if (!!id) {
      uIds = (module.value?.children || []).map((o: MenuMode) => String(o.sid))
    } else {
      uIds = (currentAna.value.fieldConf?.ids || []).map((item: string | number) => String(item))
    }
    return Array.from(new Set(uIds))
  })
  const fct = computed<string>(() => fieldConf.value.type)

  // about result
  const state = reactive<any>({
    fields: [] as FieldItem[],
    btns: [] as FieldItem[],
    modules: [] as FieldItem[],
  })

  // about initData
  initData()
  watch(ids, () => initData())
  watch(module, () => initData())

  // do initData
  function initData () {
    const isDatabase = fct.value === 'database' || !!id
    if (((!ids.value || !ids.value.length) && !labels?.length) || (isDatabase && !module.value)) return
    let resultData: any = []
    switch (true) {
      case isDatabase:
        resultData = module.value?.children?.filter((item: MenuMode) => ids.value.includes(String(item.sid))) || []
        break
      default:
        break
    }
    const urd = cloneDeep(labels || [])
    labels?.map((o: any, i: number) => {
      if (!isObject(o)) {
        const uItemData = resultData.find((ri: any) => String(ri.sid) === String(o))
        uItemData && urd.splice(i, 1, uItemData)
      }
    })

    const labelSids = urd.map((item: MenuMode) => String(item.sid))
    resultData.map((item: MenuMode) => {
      if (!labelSids.includes(String(item.sid))) urd.push(item)
    })
    resultData = urd

    const { fields, btns, modules } = doResolution(resultData, menuTypes)
    state.fields = fields
    state.modules = modules
    state.btns = btns
  }

  // about Ref
  const result = computed<any>(() => state)

  const useFields: Ref<FieldItem[]> = ref(result.value.fields || [])
  const useJsonFields: Ref<any[]> = ref([])
  const useBtns: Ref<FieldItem[]> = ref(result.value.btns)
  const useModules: Ref<FieldItem[]> = ref(result.value.modules)
  const useResultData: Ref<any | any[]> = ref()

  const { useFields: uf1, useJsonFields: ujf1, useBtns: ub1, useModules: um1, useResultData: urd1 }: any = doTrans(result, useData)
  useFields.value = uf1.value
  useJsonFields.value = ujf1.value
  useBtns.value = ub1.value
  useModules.value = um1.value
  useResultData.value = urd1.value
  watchEffect(() => {
    const { useFields: uf2, useJsonFields: ujf2, useBtns: ub2, useModules: um2, useResultData: urd2 }: any = doTrans(result, useData)
    useFields.value = uf2.value
    useJsonFields.value = ujf2.value
    useBtns.value = ub2.value
    useModules.value = um2.value
    useResultData.value = urd2.value
  })

  return {
    menu,
    module,
    fieldConf,
    fields: useFields,
    jsonFields: useJsonFields,
    btns: useBtns,
    modules: useModules,
    transformData: useResultData,
    asyncData: useData,
    // pubSubConf
  } as ModuleHookMode
}

function doTrans (result: any, useData: any) {
  const useFields: Ref<FieldItem[]> = ref(result.value.fields || [])
  const useJsonFields: Ref<any[]> = ref([])
  const useBtns: Ref<FieldItem[]> = ref(result.value.btns)
  const useModules: Ref<FieldItem[]> = ref(result.value.modules)
  const useResultData: Ref<any | any[]> = ref()

  useTrans(useData, useFields, useResultData, useJsonFields)
  if (useModules.value && useModules.value.length) {
    useModules.value.map((module: FieldItem) => {
      if (!module.fields || !module.fields.length) return
      const { useFields: uf, useJsonFields: ujf, useBtns: ub, useModules: um, useResultData: urd } = doTrans(ref<any>(module), useData)

      module.fields = uf.value
      module.transformData = urd.value
      module.jsonFields = ujf.value
      module.btns = ub.value
      module.useModules = um.value
    })
  }

  return {
    useFields,
    useBtns,
    useModules,
    useJsonFields,
    useResultData,
  }
}

function doResolution (data: any, menuTypes: number[]) {
  const { fields, btns, modules } = useResolution(data, menuTypes)
  setFieldsPicture([].concat(fields || [], btns || []))
  if (modules && modules.length) {
    modules.map((module: FieldItem) => {
      const children = module.children || []
      const { fields: f, btns: b, modules: m } = doResolution(children, menuTypes)
      module.fields = f
      module.btns = b
      module.modules = m
    })
  }
  return {
    fields,
    btns,
    modules,
  }
}

export function useResolution (data: any, menuTypes?: number[]) {
  const state = reactive<any>({
    fields: [] as FieldItem[],
    btns: [] as FieldItem[],
    modules: [] as FieldItem[],
  })
  if (!data || !data.length) return state
  state.fields = []
  state.btns = []
  state.modules = []

  data.map((item: MenuMode) => {
    const menuType = Number(item.menuType)
    const filterMenuTypes = menuTypes || [3, 4, 5]
    if (!filterMenuTypes.includes(menuType)) return
    const itemOptions = isJsonString(item.options) ? JSON.parse(item.options || '{}') : item.options
    const type = dictConfig.FieldUIMapper[`e${ item.componentType }`]
    const baseItem: FieldItem = Object.assign({}, {
      label: String(item.name),
      key: String(item.key),
      type,
      component: item.component,
      componentType: item.componentType,
      children: item.children,
      icon: item.icon,
      picture: item.picture,
      remark: item.remark,
      path: item.path,
      link: item.link,
      _config: item,
      _options: itemOptions,
    })

    switch (true) {
      case [5].includes(menuType):
        // 组装options(下拉选项)
        if (isSelectComponent(type)) {
          packFieldOptions(baseItem)
        }
        packFieldProps(baseItem)
        state.fields.push(baseItem)
        break
      case 4 === menuType:
        packBtnProps(baseItem)
        state.btns.push(baseItem)
        break
      case 3 === menuType:
        state.modules.push(baseItem)
        break
      default:
        break
    }
  })
  return state
}

function useTrans (useData: Ref, useFields: Ref, useResultData: Ref, useJsonFields: Ref) {
  if (isArray(useData.value)) {
    useResultData.value = []
    useJsonFields.value = []
    // 2. 转化值：默认行为 array数据。
    // 2.1 根据fields 提取数据
    if (useData.value.length) {
      useData.value.map((item: any, index: number) => {
        const itemData = {
          ...(item || {})
        }
        const jsonFieldItem: any = {}
        useFields.value.map((field: FieldItem) => {
          if (!field.type) field.type = dictConfig.FieldUIMapper[`e${ field.componentType }`]
          transformFieldValue(field, item, itemData)
          jsonFieldItem[field.key] = cloneDeep(field)
        })
        useResultData.value.splice(index, 0, itemData)
        useJsonFields.value.push(jsonFieldItem)
      })
    } else {
      const jsonFieldItem: any = {}
      useFields.value.map((field: FieldItem) => {
        if (!field.type) field.type = dictConfig.FieldUIMapper[`e${ field.componentType }`]
        transformFieldValue(field, useData.value, {})
        jsonFieldItem[field.key] = cloneDeep(field)
      })
      useJsonFields.value.push(jsonFieldItem)
    }
  } else {
    useResultData.value = {
      ...(useData.value || {})
    }
    useJsonFields.value = []
    const jsonFieldItem: any = {}
    // 1. 转化值：默认行为 json数据。 直接把数据 和 fields的value属性关联
    useFields.value.map((field: FieldItem) => {
      if (!field.type) field.type = dictConfig.FieldUIMapper[`e${ field.componentType }`]
      transformFieldValue(field, useData.value, useResultData.value)
      jsonFieldItem[field.key] = cloneDeep(field)
    })
    useJsonFields.value.push(jsonFieldItem)
  }
}

// 转化字段
const sortTyes: string[] = ['defaultValue', 'substring', 'number', 'time', 'dict', 'raise', 'unit']
export function transformFieldValue (filedItem: FieldItem, data: any = {}, resultData: any) {
  const value = get(data, filedItem.key, '')
  filedItem.value = value
  set(resultData, filedItem.key, value)
  if (!filedItem['_options']) {
    const itemOptions = isJsonString(filedItem.options) ? JSON.parse(filedItem.options || '{}') : filedItem.options
    filedItem['_options'] = itemOptions
  }
  const { open, transform } = get(filedItem, '_options.fieldConf', {})
  if (Number(open) !== 1 || !transform || transform.length < 1) return

  const types: string[] = []
  const options: any[] = []

  // 排序
  const sortTransform: any[] = []
  sortTyes.map((key: string) => transform.findIndex((item: any) => item.type === key)).filter((index: number) => index > -1).map((index: number) => sortTransform.push(transform[index]))

  sortTransform.map((item: any) => {
    const option = item.option || {}
    switch (true) {
      case item.type === 'dict':
        option.options = filedItem.options
        option.byKey = 'value'
        option.getKey = 'label'
        break
      default: break
    }
    types.push(item.type)
    options.push(option)
  })
  const { value: tValue, unit, defaultValue } = convertValue(value, types, options)
  filedItem.value = (value === undefined || value === '') ? defaultValue : value
  filedItem.tValue = tValue
  filedItem.unit = unit

  set(resultData, filedItem.key, tValue)
  filedItem.defaultValue = defaultValue
}

// 给按钮添加属性
function packBtnProps (filedItem: FieldItem) {
  const { open, options } = get(filedItem, '_options.btnConf', {})
  if (Number(open) !== 1 || !options || options.length < 1) return
  let props: any = {}
  const optProps = options.find((item: any) => item.type === 'props')
  if (optProps) {
    props = optProps.option || {}
  }
  filedItem.props = props
}

// 下拉 及联组件
function isSelectComponent (type: string) {
  return ['select', 'cascader', 'radio-group', 'checkbox-group'].includes(type)
}

// 字段组件props
function packFieldProps (filedItem: FieldItem) {
  const { open, props } = get(filedItem, '_options.fieldConf', {})
  if (Number(open) !== 1 || !props || props.length < 1) return
  const propsConf = props.find((item: any) => item.type === 'props')
  if (!propsConf) return
  const propsData = Object.assign(filedItem.props || {}, propsConf.option || {})
  filedItem.props = propsData
  Object.keys(propsData).map((key: string) => {
    let pdValue = get(propsData, key)
    const isFunction = isStringFunction(pdValue)
    switch (true) {
      case pdValue === 'true':
        pdValue = true
        break
      case pdValue === 'false':
        pdValue = false
        break
      case isJsonString(pdValue):
        pdValue = JSON.parse(pdValue)
        break
      case isFunction:
        pdValue = new Function(`return ${pdValue}`)()
        break
      default:
        if (/^(-?\d+)\.?(\d*)$/.test(pdValue)) {
          pdValue = parseFloat(pdValue)
        }
        break
    }
    const propertyKey = `${ isFunction ? '' : 'props.' }${ key }`
    delete filedItem.props[key]
    set(filedItem, propertyKey, pdValue)
  })
}

// 组装下拉选项
function packFieldOptions (filedItem: FieldItem) {
  const { store } = useGlobal()

  const { open, props } = get(filedItem, '_options.fieldConf', {})
  if (Number(open) !== 1 || !props || props.length < 1) return
  const optionsConf = props.find((item: any) => item.type === 'options')
  if (!optionsConf) return
  const itemOption = optionsConf.option

  let useOptions: any[] = []
  const dictData = store.getters.dictData || {}
  const fType = String(filedItem.type)
  const mapper = {
    label: itemOption.label || 'label',
    value: itemOption.value || 'value',
    children: itemOption.children || 'children'
  } as MapperMode

  switch (itemOption.sourceType) {
    case 'chooseType':
      useOptions = dictData[createDictKey(itemOption.id)]?.tree || []
      break
    case 'node':
      useOptions = dictData[createDictKey(`n${ itemOption.id }`)]?.tree || []
      mapper.label = 'label'
      mapper.value = 'value'
      break
    case 'api':
      useOptions = dictData[createDictKey(`${ itemOption.id }`)]?.list || []
    default:
      break
  }
  if (fType === 'cascader') {
    // 及联特殊处理
    filedItem.props = Object.assign({
      placeholder: '请选择',
    }, filedItem.props || {}, { options: useOptions, props: mapper })
  } else {
    filedItem.options = useOptions.map((item: any) => {
      const itemData = {
        label: item[mapper.label],
        value: item[mapper.value]
      } as any
      if (!itemData.props) itemData.props = {}
      return itemData
    })
  }

  switch (true) {
    case ['cascader'].includes(String(filedItem.type)):
      filedItem.options?.map((item: any) => item.text = item[mapper.label])
      break
    default:
      break
  }

  filedItem.mapper = mapper
}

function setFieldsPicture (items: FieldItem[]) {
  items.map((o: FieldItem) => {
    const picture: string | undefined = o.picture
    if (picture && picture.substring(0, 1) === '[') {
      o.picture = ''
      nFileBase64ById(JSON.parse(picture)[0].url).then((base64: any) => {
        o.picture = base64
      })
    }
  })
}
