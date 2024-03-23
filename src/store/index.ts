import { createStore } from 'vuex'
import AppModule from './modules/app'
import LoginModule from './modules/login'
import UserModule from './modules/user'

const store = createStore({
  modules: {
    /**
     * 系统配置相关
     */
    AppModule,

    /**
     * 用户相关
     */
    LoginModule,

    /**
     * 用户相关
     */
    UserModule
  }
})

export {
  store,
  store as default
}
