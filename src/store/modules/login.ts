import { uDingLogin, uLogin, uZzdLogin, uLogout, uTokenLogin, vTokenLogin, vUserCurrent } from '@/api'
import { DingLoginMode, LoginMode, ResponseMode } from 'typings/params'
import store from '..'
import { Toast } from 'vant'
import { ActionContext } from 'vuex'
import { LoginStoreMode } from 'typings/store'
// import Cookie from 'js-cookie'
import { getAuthCode } from '@/utils/gdt'
import { BaseConfig, ProxyApi } from '@/config'
import router from '@/router'
import Cookies from 'js-cookie'
import { getParamsStrUrl } from '@/utils/index'
import { cloneDeep } from 'lodash-es'
export interface LoginRedirect {
  path?: string
  type?: string
  query?: any
}

const app = {
  state: () => ({
    system: {},
    loginInfo: {
      token: sessionStorage.getItem('nh_school_student_h5_token'),
    } as LoginStoreMode,
    redirect: {
      path: '',
      type: '',
      query: {}
    } as LoginRedirect
  }),

  getters: {
    loginInfo: (state: any): any => state.loginInfo,
    redirect: (state: any): any => state.redirect
  },

  mutations: {
    SET_LOGIN_INFO (state: any, data: any) {
      const { token } = data || {}
      if (token) {
        sessionStorage.setItem('nh_school_student_h5_token', token)
      }
      const useToken = sessionStorage.getItem('nh_school_student_h5_token') || (token || '')
      Cookies.set('JSESSIONID_JX_NANHU_STU_API', useToken)
      Cookies.set('JSESSIONID', useToken)
      state.loginInfo.token = useToken
    },

    CLEAR_LOGIN_INFO (state: any) {
      state.loginInfo = {}
      localStorage.clear()
      sessionStorage.clear()
    },

    SET_LOGIN_REDIRECT (state: any, data: any) {
      state.redirect = data || {
        path: '',
        type: '',
        query: {}
      }
    }
  },

  actions: {
    async goLogin () {
      try {
        // router.push('/login')
        const { VITE_JAVA_PROXY } = import.meta.env
        const prefix = window.location.origin + VITE_JAVA_PROXY + ProxyApi.java.main
        const url = prefix + '/redirect?url=' + window.btoa(encodeURI(getParamsStrUrl({}, window.location.href)))
        console.log('goLogin-url', url)
        window.location.href = url
        return false
      } catch (error) {
        return error
      }
    },
    // 账号密码登录
    async login ({ commit }: ActionContext<LoginStoreMode, any>, params: LoginMode) {
      try {
        const fData = cloneDeep(params)
        let result: any
        // if(fData.password){
        //   fData.password=sha1(fData.password)
        // }
        const { data, success, errMsg }: ResponseMode = await uLogin(fData)
        if (!success) {
          result = { success, data }
          Toast(errMsg)
        } else {
          commit('SET_LOGIN_INFO', data)
          result = await store.dispatch('getUserInfoBySessionId')
        }
        return result
      } catch (error) {
        console.log(error)
      }
    },

    // 浙政钉免登登录
    async zzdLogin ({ commit }: any) {
      try {
        const authRes = await getAuthCode()
        const authCode = authRes && authRes.code
        if (!authCode) return
        const res = await uZzdLogin({ authCode })
        const { success, errMsg, data } = res || {}
        commit('SET_LOGIN_INFO', data)
        if (!success) return Toast(errMsg)
        // const { data: roleUserData, success: rsuccess } = await Apis.nRoleUserQuery({
        //   projectId: 4,
        //   userId: data.userId
        // })
        // if (!rsuccess || roleUserData?.list?.length < 1) {
        //   Toast('该账号无权限，请联系管理员。')
        //   return
        // }
        return await store.dispatch('getUserInfoBySessionId')
      } catch (error) {
        console.log(error)
        return false
      }
    },
    // login by token
    async tokenLogin ({ commit }: any, token: string) {
      try {
        let result: any
        const { data, success, errMsg }: any = await uTokenLogin({ token }) || {}
        if (!success) {
          result = { success, data }
          Toast(errMsg)
        } else {
          commit('SET_LOGIN_INFO', data)
          result = await store.dispatch('getUserInfo')
        }
        return result
      } catch (error) {
        console.log(error)
      }
    },

    // 浙政钉扫码登录
    async dingLogin ({ commit }: any, params: DingLoginMode) {
      try {
        let result: any
        const { data, success, errMsg } = await uDingLogin(params)
        if (!success || !data) {
          result = { success, data }
          Toast(errMsg)
        } else {
          commit('SET_LOGIN_INFO', data)
          result = await store.dispatch('getUserInfo')
        }
        return result
      } catch (error) {
        return error
      }
    },

    // 退出
    async logout ({ commit, dispatch }: any) {
      try {
        commit('CLEAR_LOGIN_INFO')
        await dispatch('clearUserStore')
        const { VITE_JAVA_PROXY } = import.meta.env
        const prefix = VITE_JAVA_PROXY + ProxyApi.java.main
        window.location.href = prefix + '/logout?url=' + encodeURI(window.location.href.split('#')[0] + '#/')
        // const { success, errMsg }: ResponseMode = await uLogout()
        // if (success) {
        //   commit('CLEAR_LOGIN_INFO')
        //   store.dispatch('clearUserStore')
        //   const userType = store.getters.userType
        //   const { VITE_SSO_ZJZWFW_LOGOUT } = import.meta.env
        //   const domain = location.origin
        //   const prefix = userType === 2 ? String(VITE_SSO_ZJZWFW_LOGOUT) : String(VITE_SSO_ZJZWFW_LOGOUT)
        //   location.href = prefix + domain + '/' + BaseConfig.portalBaseUrl
        // } else {
        //   Toast(errMsg)
        // }
        return true
      } catch (error) {
        console.log(error)
      }
    },

    async setLoginRedirect ({ commit }: any, data: any) {
      try {
        commit('SET_LOGIN_REDIRECT', data)
      } catch (error) {
        console.log(error)
      }
    },

    async vtokenLogin ({ commit }: any, token: string) {
      try {
        let result: any
        const { data, errMsg }: any = await vTokenLogin({ token }) || {}
        if (data.token) {
          commit('SET_LOGIN_INFO', data)
          window.sessionStorage.setItem('nh_school_student_token-zs', data.token)
        } else {
          result = { success: false, data }
          Toast(errMsg)
        }
        return result
      } catch (error) {
        console.log(error)
      }
    },
    async vCurrent ({ commit }: any) {
      try {
        let result: any
        const { data, success, errMsg }: any = await vUserCurrent() || {}
        if (!success) {
          result = { success, data }
          Toast(errMsg)
        } else {
          commit('SET_LOGIN_INFO', data)
          // result = await store.dispatch('getUserInfo')
        }
        return result
      } catch (error) {
        console.log(error)
      }
    },
  }
}
export default app
