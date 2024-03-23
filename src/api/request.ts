'use strict'
import axios from 'axios'
import { get,cloneDeep } from 'lodash-es'
// import router from '@/router'
import store from '@/store'


// init
const service = axios.create({
  timeout: 90000
})
// request
service.interceptors.request.use(
  config => {
    const token=get(store.getters,'loginInfo.token','') || localStorage.getItem('nh_school_student_h5')
    // config.headers[''+VITE_TOKENNAME] =token
    config.headers['sztoken'] =token
    config.headers.userId=store.getters.userId
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
// response
service.interceptors.response.use(
  response => {
    const json = response && response.data
    if (json instanceof Object) {
      // 如果未登录 后台返回登录页字符串
      if (json.status === 10001) {
        store.commit('CLEAR_LOGIN_INFO')
        store.commit('CLEAR_USER_STORE')
        store.dispatch('goLogin')
      }
      json.response = cloneDeep(response)
    }

    return json
  },
  error => {
    return Promise.reject(error)
  }
)

// ajax entry
const suffix = '' // 后缀
const ajax = function (obj: any, config?: any) {
  const _suffix = obj.suffix !== undefined ? obj.suffix : suffix
  const url = obj.url + _suffix
  const type = obj.type ? obj.type.toUpperCase() : 'GET'
  const headers = Object.assign({}, config || {})
  // let params = validArray(obj.params || {})
  const params = obj.params
  switch (type) {
    case 'POST':
      return service.post(url, params, headers)
    case 'PUT':
      return service.put(url, params, headers)
    case 'DELETE':
      return service.delete(url, params)
    default:
      return service.get(url,Object.assign( { params: params },headers || {}))
      break
  }
}

export default ajax
