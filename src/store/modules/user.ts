import { uUserInfo,uUserInfoBySessionId } from '@/api'
import { ResponseMode } from 'typings/params'
import { ActionContext } from 'vuex'
import { UserStoreMode } from 'typings/store'
// import { cloneDeep } from 'lodash-es'
// import Cookie from 'js-cookie'
const user = {
  state: () => ({
    user:JSON.parse(sessionStorage.getItem('nh_school_student_h5_user') || '{}'),
    userId:'',
    isLogin:false
  }),

  getters: {
    user: (state: any) =>state.user,
    isLogin: (state: any) => !!state.isLogin || !!state.user.token,
    userId: (state: any) => state.userId || '2',
  },

  mutations: {
    SET_USER (state: any, data: any) {
      const userInfo=Object.assign(state.user || {},data || {},{ token:sessionStorage.getItem('nh_school_student_h5_token') })
      state.user = userInfo
      state.userId = userInfo.userId
      state.isLogin = !!userInfo.token
      sessionStorage.setItem('nh_school_student_h5_user', JSON.stringify(userInfo))
    },

    CLEAR_USER_STORE (state: any) {
      state.user = {}
      state.isLogin = false
      state.userId = ''
      sessionStorage.setItem('nh_school_student_h5_user', '')
      sessionStorage.clear()
      localStorage.clear()
    }
  },

  actions: {
    async getUserInfo ({ commit }: ActionContext<UserStoreMode, any>) {
      try {
        const { data, success }: ResponseMode = await uUserInfo() || {}
        commit('SET_USER', data || {})
        return { data, success }
      } catch (error) {
        console.log(error)
      }
    },
    async getUserInfoBySessionId ({ getters, commit ,dispatch }: ActionContext<UserStoreMode, any>) {
      try {
        const { data, success }: ResponseMode = await uUserInfoBySessionId()
        if(data && data.sessionId){
          commit('SET_LOGIN_INFO',{ token:data.sessionId || '',sessionId:data.sessionId || '' })
        }
        commit('SET_USER', data || {})
        return { data:getters.user, success }
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 清除
     */
    clearUserStore ({ commit }: ActionContext<string, any>) {
      commit('CLEAR_USER_STORE')
    }
  }
}
export default user
