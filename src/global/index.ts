import { App } from 'vue'
import * as Lib from './lib'
import * as Handler from './handler'

const install = (app: App) => {
  // window.globalApp = app

  // lib, more like component register in global
  Lib.install(app)

  // global error and warn listener
  Handler.install(app)
}

export {
  install
}
