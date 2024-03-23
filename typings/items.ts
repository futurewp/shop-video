export interface CardMode {
  // 标题
  title?: string

  // desc
  desc?: string

  // image
  thumb?: string

  // 金额
  price?: number
}

export interface ItemMode {
  label: string

  value: any

  image?: any

  icon?: any

  type?: string

  path?: string

  unit?: string

  props?: any

  option?: any
}

export interface MapperMode {
  label: string
  value: string
  children: string
}

export interface BaseUiMode {
  label: string

  key: string

  type?: string

  value?: any

  slotName?: string
}

export interface FieldItem extends BaseUiMode {
  label: string
  key: string
  tValue?: any
  unit?: string
  props?: any
  mapper?: MapperMode
  transform?: any
  path?: string
  link?: string
  componentType?: string | number
  options?: ItemMode[]
  children?: any[]
  rule?: any[]
}
