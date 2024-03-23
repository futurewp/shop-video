import { App } from 'vue'
import VantComponents from './vant'

const install  = (app: App): void => {
  VantComponents.map(item => {
    if (item._options) {
      app.use(item.component, item._options)
    } else app.use(item)
  })
}

export {
  install
}
