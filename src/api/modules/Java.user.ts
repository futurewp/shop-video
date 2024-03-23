/**
 * node menu apis
 */

import { DingLoginMode, LoginMode } from 'typings/params'
import request from '../request'
import { ProxyApi } from '@/config'
const { VITE_JAVA_PROXY } = import.meta.env
const prefix = VITE_JAVA_PROXY+ProxyApi.java.main
// 账号密码登录
export function uLogin ( data: LoginMode ): Promise<any> {
  return request( {
    url: prefix + '/login/login',
    type: 'POST',
    params: data
  } )
}
// 登录信息通过sessionid获取
export function uUserInfoBySessionId (): Promise<any> {
  return request({
    url:prefix+'/login/getLoginInfo',
    type: 'POST'
  })
}
// 浙政钉免登
export function uZzdLogin (data:any): Promise<any> {
  return request({
    url:VITE_JAVA_PROXY+'/fib/zzd/login/zzd/login',
    params: data,
    type: 'GET'
  })
}

// login by token
export function uTokenLogin (data?: any): Promise<any> {
  const url = VITE_JAVA_PROXY + '/fib/login/loginbytoken'
  // url: prefix + '/pc/login/loginbytoken',
  return request({
    url,
    params: data,
    type: 'POST'
  })
}
// 退出登录
export function uLogout (): Promise<any> {
  return request( {
    url: prefix + '/pc/login/loginout',
    type: 'POST'
  } )
}
// 登录信息
export function uUserInfo (): Promise<any> {
  return request( {
    url: prefix + '/pc/login/getloginresult',
    type: 'POST'
  } )
}

// 获取ding scan用户信息
export function uDingLogin ( data?: DingLoginMode ): Promise<any> {
  return request( {
    url: prefix + '/pc/zzd/login/getZzdLoginResult',
    type: 'POST',
    params: data || {}
  } )
}

export function vTokenLogin (data?: any): Promise<any> {
  return request({
    url: '/fyzs' + '/user/login',
    type: 'get',
    params: data || {}
  })
}
export function vUserCurrent (data?: any): Promise<any> {
  return request({
    url: '/fyzs' + '/user/current',
    type: 'Get',
    params: data || {}
  })
}
