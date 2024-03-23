
/**
 * java common apis
 */

import request from '../request'
const { VITE_JAVA_PROXY } = import.meta.env
import { ProxyApi } from '@/config'
const prefix = VITE_JAVA_PROXY+ProxyApi.java.main
// 字典值说明
export function getDict (data: any) {
  return request({
    url: prefix + '/common/choose/getAdsCommonChooseTypeListResult',
    type: 'get',
    params: data || {}
  })
}
export function jSingleChoose (data: any) {
  return request({
    url: prefix + '/pc/ads/common/choose/getLevelTreeChooseResult',
    type: 'POST',
    params: data || {}
  })
}

// 多个查询 如：typeArray: [1, 2]; 注意：type = 1 用jSingleChoose 接口
export function jMultipleChoose (data: any) {
  return request({
    url: prefix + '/common/choose/getTreeChooseAllListResult',
    type: 'POST',
    params: data || {}
  })
}

// 文件上传
export function fileUpload (data?: any) {
  return request({
    url: VITE_JAVA_PROXY + '/fib/coapi/upload/file',
    type: 'POST',
    params: data || {}
  }, { 'Content-Type': 'multipart/form-data' })
}
export function jFileUpload (data?: any) {
  return request({
    url: VITE_JAVA_PROXY + '/fib/coapi/upload/file',
    type: 'POST',
    params: data || {}
  }, { 'Content-Type': 'multipart/form-data' })
}


// 指标数据
export function jCodeData (data: any) {
  return request({
    // /gov/big/screen/getcodedata
    url: 'prefixCode' + '/screen/data/getcodedata',
    type: 'POST',
    params: data || {}
  })
}

// 上传
// export function jFileUpload (data: any) {
//   return request({
//     url: prefix + '/pc/upload/file',
//     type: 'POST',
//     params: data || {}
//   }, { 'Content-Type': 'multipart/form-data' })
// }
