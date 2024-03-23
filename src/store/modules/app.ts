import Config, { BaseConfig } from '@/config'
import { ResponseMode } from 'typings/params'
import store from '..'

const app = {
  state: () => ({
    app: {},
    theme: import.meta.env.VITE_THEME,
    mode: 'static',
    micro: {
      apps: {},
      currentApp: {},
      working: false
    }
  }),

  getters: {
    app: (state: any): any => state.app,
    theme: (state: any): any => state.theme,
    micro: (state: any): any => state.micro,
    mode: (state: any): any => state.mode
  },

  mutations: {
    SET_APP (state: any, data: any) {
      state.app = data || {}
    },

    SET_MICRO_APP (state: any, data: any) {
      state.micro.working = true
      state.micro.currentApp = data.micro
      state.micro.apps[data.projectId] = data
    },

    DESTROY_MICRO (state: any) {
      state.micro.working = false
      // state.micro.currentApp = {}
    },

    SET_APP_MODE (state: any, mode: string) {
      state.mode = mode || 'static'
    }
  },

  actions: {

    /**
     * 设置子应用相关数据
     * @param param0
     * @param micro
     * @returns
     */
    async setMicroApp ({ commit }: any, micro: any) {
      const projectId = micro.id
      const currentMicro = store.getters.micro.apps?.[projectId]
      let useMeus = currentMicro?.menus
      if (!useMeus) {
        const pathPrefix = micro.props.routerBase.replace(BaseConfig.portalBaseUrl, '')
        // const { menus }: LoadMenusResultMode = await loadMenus({ projectId, pathPrefix })
        // useMeus = menus
      }
      commit('SET_MICRO_APP', { menus: useMeus, projectId, micro })
    },

    /**
     * destroy micro
     * @param param0
     */
    async destroyMicro ({ commit }: any) {
      commit('DESTROY_MICRO')
    },

    setAppMode ({ commit }: any, mode: string) {
      commit('SET_APP_MODE', mode)
    }
  }
}
export default app
