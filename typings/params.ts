/**
 * request params of page
 */
export interface Page {
  pageSize: number
  pageNum: number
}

/**
 * trasition params mode
 */
export interface ParamsTransitionMode extends Page {
	tabType: string
  area?: string
	city?: string
	orderType?: string | number
	productId?: string | number
	industryId?: string | number
	natureId?: string | number
	requireId?: string | number
}
export interface ResponseMode {
	errMsg?: string
	message?: string
	data?: any
	status?: number | null
	success?: boolean
}

/**
 *
 */
export interface KeyMapperMode {
	inputKey: string
	outputKey: string
	name?: string
}

/**
 * 登录的mode
 */
export interface LoginMode {
	username: string
	password: string | number
	code?: string
	t?: string
}


/**
 * ding 扫码获取用户信息
 */
export interface DingLoginMode {
  code?: string
  state?: string
}


/**
 * 政策列表 params mode
 */
export interface PolicyListMode extends Page {
  keyword?: string
  chooseType57Id?: number
  orderType?: string
}

/**
 * 政策详情 params mode
 */
export interface PolicyDetailMode {
  id: number
}
