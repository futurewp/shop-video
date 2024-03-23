declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare type Nullable<T> = T | null

declare type CustomizedHTMLElement<T> = HTMLElement & T

declare type Indexable<T> = {
  [key: string]: T
}

declare type Hash<T> = Indexable<T>

declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'
interface Window {
  ActiveXObject?: any
  globalApp: any
  __POWERED_BY_QIANKUN__: any
  ZWJSBridge: any
  aplus_queue: any
}
