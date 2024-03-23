import store from '@/store'
import { Toast } from 'vant'
import { isArray, isString, isUrl, isJsonString } from './is'
import type { MenuMapperModel } from './type'
import { get, cloneDeep } from 'lodash-es'
import QRcode from 'qrcode'
import { Ref, ref } from 'vue'

/**
 * about colors
 */
export * from './colors'

/**
 * about load
 */
export * from './load'

/**
 * about is
 */
export * from './is'
/**
 * 生成uuid
 */
export function uuid () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 5; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  // s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  // s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return 'R' + uuid + new Date().getTime()
}
export function pageHiddenOrShow () {
  return new Promise((resolve: any) => {
    const hiddenProperty: any = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null
    window.document.addEventListener('visibilitychange', function () {
      resolve(window.document[hiddenProperty])
    })
  })
}
export function getFileList (value: any) {
  let arrData = []
  if (value) {
    if (typeof value === 'string') {
      if (value.indexOf('[') === 0) {
        try {
          arrData = JSON.parse(value)
        } catch (error) { }
      } else if (value.indexOf('/') === 0) {
        try {
          arrData = [value]
        } catch (error) { }
      } else if (value.indexOf('http') === 0) {
        arrData = [value]
      }
    } else if (Array.isArray(value)) {
      arrData = value
    }
  }
  const newData: any = []
  arrData.forEach((item: any) => {
    if (typeof item === 'string') {
      newData.push({
        fileUrl: item
      })
    } else if (typeof item === 'object' && item.fileUrl) {
      item.fileUrl = item.fileUrl
      newData.push(item)
    }
  })
  return newData
}
export const getParamsStrUrl = (params: any, url: any = undefined) => {
  let linkUrl = url || window.location.href.replace(window.location.search, '').split('?')[0]
  const linkArr = linkUrl.split('#')
  if (linkArr && linkArr.length === 2) {
    linkUrl = window.location.origin + window.location.pathname + `?v=${Date.now()}` + (linkArr[1] ? '#' + linkArr[1] : '')
  }
  if (Object.keys(params).length) {
    const tempParams: any = []
    for (const key in params) {
      if (!['v'].includes(key)) {
        tempParams.push(`${key}=${params[key]}`)
      }
    }
    if (tempParams && tempParams.length) {
      linkUrl = linkUrl + (linkArr[1] && linkArr[1].indexOf('?') !== -1 ? '$' : '?') + tempParams.join('&')
    }
  }
  return linkUrl
}
/**
 * 路由敏感信息删除
 * @param {*} params
 * @param {*} keys
 */
export const paramsDel = (params: any, keys: any) => {
  keys.map((k: any) => {
    if (params && k in params) delete params[k]
  })
  return params
}
export const param2Obj = (url: string) => {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, '')
  if (!search) {
    return {}
  }
  const obj: any = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
// 防抖
export const Debounce = (func: any, t: any, immediate: any) => {
  let timer: any = null
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate) {
      // 如果已经执行过，不再执行
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, t)
      if (callNow) {
        func.apply(this, arguments)
      }
    } else {
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, t)
    }
  }
}
// 节流
export const Throttle = (func: any, t: any) => {
  const delay = t || 1000
  let timer: any = null
  let startTime = Date.now()
  return function () {
    const curTime = Date.now()
    const remaining = delay - (curTime - startTime)
    clearTimeout(timer)
    console.log('remaining', remaining)
    if (remaining <= 0) {
      func.apply(this, arguments)
      startTime = Date.now()
    } else {
      timer = setTimeout(func, remaining)
    }
  }
}

export function showEruda () {
  return new Promise((resolve: any) => {
    const script = document.createElement('script')
    script.src = './static/js/eruda.min.js'
    script.defer = true
    script.setAttribute('id', 'eruda_Console')
    if (!document.getElementById('eruda_Console')) {
      document.body.appendChild(script)
      script.onload = function () {
        window.eruda.init()
        resolve()
      }
    } else {
      resolve()
    }
  })
}

/**
 * Generate random string by Math.random and time
 */
export const generateId = (): string => `${Math.floor(Math.random() * 10)}${new Date().getTime()}`

/**
 * @desc 转换平级数据为树形数据
 */
export function transformToTree (sNodes: Array<any>, setting?: MenuMapperModel) {
  const set = {
    children: 'children',
    idKey: 'id',
    pIdKey: 'parentId',
    label: 'name'
  } as MenuMapperModel

  setting && Object.assign(set, setting)

  let i
  let l
  const key = set.idKey
  const parentKey = set.pIdKey || ''
  const childKey = set.children || ''
  if (!key || key === '' || !sNodes) return []
  if (Array.isArray(sNodes)) {
    sNodes.sort((a, b) => (a.orderNum - b.orderNum))
    const r = []
    const tmpMap = []
    for (i = 0, l = sNodes.length; i < l; i++) {
      // sNodes[i][childKey] = [{}]
      tmpMap[sNodes[i][key]] = sNodes[i]
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      if (
        tmpMap[sNodes[i][parentKey]] &&
        sNodes[i][key] !== sNodes[i][parentKey]
      ) {
        const children = tmpMap[sNodes[i][parentKey]][childKey] || []
        children.push(sNodes[i])
        children.sort((a: any, b: any) => (a.orderNum - b.orderNum))
        tmpMap[sNodes[i][parentKey]][childKey] = children
      } else {
        r.push(sNodes[i])
      }
    }

    return r
  } else {
    return [sNodes]
  }
}

/**
 * 首字母转大写
 */
export function initialToUpperCase (str: string) {
  if (!isString(str)) return str
  const strs = str.split('')
  strs[0] = strs[0].toUpperCase()
  return strs.join('')
}

/**
 * 跳转
 * @param path
 * @returns
 */
export function windowOpen (path: string) {
  if (!path || path === '#') {
    return false
  }
  // alert(store.getters.ssoIsLogin)
  const usePath = path + (path.indexOf('?') >= 0 ? '&' : '?') + ('ssolsLogin=' + store.getters.ssoIsLogin)
  window.open(usePath)
}

/**
 * 跳转政务网登录
 */
export async function ssoLogin (gotoUrl?: string) {
  const { VITE_DOMAIN, VITE_SSO_ZJZWFW, VITE_SSO_PERSONAL, VITE_JAVA_PROXY } = import.meta.env
  let useGotoUrl = gotoUrl || `${window.location.origin}/`

  useGotoUrl = useGotoUrl.replace('#/', '')
  // 获取用户类型
  const userType = await store.dispatch('getUserType')
  // 根据个人或法人拼接地址
  const hrefPrefix = userType !== '1' ? `${VITE_SSO_ZJZWFW}?spappurl=${VITE_DOMAIN}${VITE_JAVA_PROXY}/sso/login?` : `${VITE_SSO_PERSONAL}&`

  const href = `${hrefPrefix}goto=${useGotoUrl}`
  window.location.href = href
}



/**
 * 时间转换
 */
export function parseTime (time: string | number, cFormat: string) {
  if (!time) {
    return ''
  }
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(String(time)))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  } as any
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: any, key: string | number) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 判断数据类型
 */
export function dataType (data: unknown) {
  let type = 'String'

  if (Object.prototype.toString.call(data) === '[object Object]') {
    type = 'Object'
  } else if (Object.prototype.toString.call(data) === '[object Array]') {
    type = 'Array'
  } else if (typeof data === 'string') {
    type = 'String'
  } else if (typeof data === 'number') {
    type = 'Number'
  }

  return type
}

/**
 * 预警样式
 *
 * @param {*} key
 * @param {*} dictName 字典对象的属性名
 * @param {*} byKey 根据那个key查找字典
 * @param {*} getKey 获取字典里面的那个属性值
 * @param {*} getKey returnType 返回类型
 */
export function parseDict (
  key: string | number,
  argOptions: any
) {
  // treeToTransForm
  const { options, dictName, byKey, getKey, valueSplit, split, returnType, dataType, childrenkey } = argOptions
  if (!(key || key == 0) || (!dictName && !options)) return
  let dicts: any
  const useDict: any = {}

  if (options) {
    if (dataType == 'tree') {
      dicts = treeToTransForm(options, { children: childrenkey || 'children' })
    } else {
      dicts = options
    }
  }
  else dicts = useDict[dictName]

  if (!dicts || Object.keys(dicts).length < 1) return key

  const useByKey: any = byKey || 'code'

  const useGetKey: any = getKey || 'name'

  const _split = split || '、'

  let keys: any = key
  if (!Array.isArray(key)) {
    keys = (key + '').split(valueSplit || _split)
  }
  let values = ''
  let returnValues

  if (returnType === 'array') {
    returnValues = [] as any[]

    keys.map((item: string | number) => {
      const dict = dicts.find((_: any) => _[useByKey] + '' === item + '')
      if (!dict) return ''
      returnValues.push(dict[useGetKey])
    })
  } else {
    values = keys.reduce((prev: string, cur: string, index: number) => {
      const dict = dicts.find((_: any) => {
        return _[useByKey] + '' === cur + ''
      })

      if (!dict) return ''
      const value =
        index <= keys.length - 1 && index > 0
          ? _split + dict[useGetKey]
          : dict[useGetKey]
      return (prev += value)
    }, '')
    returnValues = values || keys.join(_split)
  }
  return returnValues
}
/**
 * @desc 转换树形数据为平级数据
 */
export function treeToTransForm (data: Array<any>, setting: any) {
  let set = {
    children: 'children'
  }
  if (setting) {
    set = Object.assign(set, setting || {})
  }
  const res: any = []
  const childrenkey = set.children
  const fn = (source: any) => {
    source.forEach((el: any) => {
      res.push(el)
      if (el[childrenkey] && el[childrenkey].length > 0) {
        fn(el[childrenkey])
      }
    })
  }
  fn(data)
  return res
}
/**
 * 通过结构获取数据
 * @param {*} data
 * @param {*} structure
 */
export function deepData (data: any, structure: string, type = 'clone') {
  if (!structure || !data) return data
  const _arr = structure.split('.')
  let convertData = data
  let parentData = data
  let lastKey = ''
  while (_arr.length > 0 && convertData && Object.keys(convertData).length > 0) {
    let key: any = _arr.shift() + ''
    // 判断为数组
    if (key.indexOf('[') >= 0 && key.indexOf(']') >= 0) {
      key = key.substring(1, key.length - 1) * 1
    }
    lastKey = key
    parentData = convertData
    convertData = convertData[key]
  }
  // 获取的对象改变后 是否改变原来对象
  switch (type) {
    case 'clone':
      if (['Array', 'Object'].includes(dataType(convertData))) {
        convertData = cloneDeep(convertData)
      }
      break
    case 'headUp':
      convertData = { convertData, parentData, key: lastKey }
      break
    default:
      break
  }

  return convertData
}

/**
 * 转化value
 */
export function convertValue (argValue: string | number, argType: string, option = {} as any) {
  if (!argType || (!argValue && argValue !== 0)) return argValue
  const dt = dataType(argType)
  let type: any = argType
  let value: any = argValue

  if (dt !== 'Array' && dt === 'String') type = type.split(',')
  if (dataType(type) !== 'Array') return argValue

  const fixed = option.fixed !== undefined ? option.fixed : 2
  let raise = ''
  type.map((item: string) => {
    if (
      ![
        'dictList',
        'dict',
        'file',
        'image',
        'slot',
        'unit',
        'structure',
        'pubsub',
        'router',
        'number',
        'link',
        'html',
        'diy'
      ].includes(item)
    ) {
      value = Number(value || 0)
    }
    switch (item) {
      case 'value_raise':
        raise = value >= 0 ? '+' : '-'
        value = raise + value
        break
      case 'time':
        value = parseTime(value, option.format)
        break
      case 'number':
        value = Number(value || 0).toFixed(fixed)
        break
      case 'value_tt':
        value = Number(value / 10000).toFixed(fixed)
        break
      case 'image':
        const pics = isJsonString(value) ? JSON.parse(value) : [value]
        value = []
        pics.map((item: any) => {
          const urlStr = get(item, 'fileUrl', '')
          if (!urlStr) return
          value.push(isUrl(urlStr) ? urlStr : `${urlStr.substring(0, 1) === '/' ? urlStr : ('/' + urlStr)}`)
        })
        break
      case 'dict':
        value = parseDict(value, option)
        break
      case 'dictList':
        const valueArr = value.split('-').map((item: any) => {
          return parseDict(item, option)
        })
        value = valueArr.join('-')
        break
      case 'unit':
        value = value + option.unit
        break
      case 'structure':
        value = deepData(value, option.structure)
        break
      default:
        break
    }
  })
  return value
}

/**
 * 获取二维码
 * @param text
 * @param options
 */

export async function getQrcode (text: string, options: any = {}) {
  try {
    const opts: any = Object.assign({
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.1,
      margin: 1,
      color: {
        dark: '#555',
        light: '#f5f5f5'
      }
    }, options)
    return await QRcode.toDataURL(text, opts)
  } catch (error) {
    console.log(error)
  }
}

/**
 * 转换图片
 * @param value
 * @param type
 * @param urlKey
 */
export function parseImage (value: any, type = 'single', urlKey = 'fileUrl') {
  if (typeof value === 'string' && value.indexOf('[') >= 0) {
    const data = JSON.parse(value)
    if (data.length > 0) {
      if (type === 'single') {
        return JSON.parse(value)[0][urlKey]
      } else {
        return JSON.parse(value)
      }
    } else {
      if (type === 'single') {
        return ''
      } else {
        return []
      }
    }
  } else if (typeof value === 'string') {
    const images = value.split(',')
    if (type === 'single') {
      return images[0]
    } else {
      return images
    }
  } else {
    return value
  }
}

/**
 * 组装完整url 一般用于文件显示\下载
 * @param url
 * @returns
 */
export function packFullUrl (url: string) {
  if (!url) return url
  return isUrl(url) ? url : `${url.substring(0, 1) === '/' ? url : ('/' + url)}`
}

