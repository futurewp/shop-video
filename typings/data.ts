export interface TreeMode {
  id: string
  name?: string
  children?: Array<TreeMode | any>
}

export interface CompanyTypeMode extends TreeMode {
  requestKey: string
}

export interface MenuMode {
  id?: string | number
  name?: string
  label?: string
  key?: string | number
  menuType?: string | number
  redirect?: string
  menuModule?: string | number
  hidden?: number
  parentId?: string | number
  orderNum?: string | number
  path?: string
  link?: string
  component?: string
  componentConfigId?: string | number
  pageLoadType?: string | number
  pageType?: string | number
  componentType?: string | number
  icon?: string
  projectId?: string | number
  options?: string
  picture?: string
  remark?: string
  creater?: string
  delete?: string | number
  children?: MenuMode[]
}
