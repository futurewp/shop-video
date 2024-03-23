import { MenuMode } from './data'

export declare interface DataStoreMode {
  querys?: any
  params?: any
  data?: any
}

export declare interface UserStoreMode {
  user: UserInfoMode
}

export interface ErrorLogInfo {
  // Type of error
  type: any
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export interface UserInfoMode {
  chooseType5Id: 1
  companyName: string
  realName: string
  roleIdList: number[]
  sessionId: string
  ssoIsLogin: number
  username: string
}

export interface DictMode {
  name?: string
  id?: string | number
}

export interface MetaMode {
  title: string
  data?: MenuMode
}

export declare interface LoginStoreMode {
  token?: string
  sessionId?: string
}
