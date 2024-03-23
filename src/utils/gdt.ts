import dd from 'gdt-jsapi'
export const getAuthCode = async () => {
  console.log('获取授权码',dd)
  try {
    const res = await dd.getAuthCode()
    return res
  } catch (error) {
    console.log('获取授权码失败',error)
    throw Error(error)
  }
}

export const getLoginUser = async () => {
  console.log('获取浙政钉用户信息')
  try {
    const res = await dd.getLoginUser()
    return res
  } catch (error) {
    console.log('获取浙政钉用户信息',error)
    throw Error(error)
  }
}
