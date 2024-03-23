import { App } from 'vue'
// import { useStore } from 'vuex'

// error
const errorHandle = (app: App) => {
  app.config.errorHandler = (err, vm, info) => {
    console.log('error: ', err, vm, info)
  }
}

// warn
const warnHandle = (app: App) => {
  app.config.warnHandler = (msg, vm, trace) => {
    console.log('warn: ', msg, vm, trace)
  }
}

// install
const install = (app: App) => {
  errorHandle(app)

  warnHandle(app)
}

export {
  install
}
