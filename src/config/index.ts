const { VITE_ENV, VITE_DOMAIN } = import.meta.env
const isDev = VITE_ENV === 'development'
// const isTest = VITE_ENV === 'staging'

export const BaseConfig = {
  domain: isDev ? VITE_DOMAIN : location.origin,
  h5Domain: isDev  ? VITE_DOMAIN : location.origin,
  prodDomain: 'https://www.95cxmd.com',
  portalBaseUrl: ''
}

export const ProxyApi = {
  java: {
    main: '/globe_api'
  },
  node: {
    main: '/node-szzt'
  }
}

export default {
  project: {
    id: 123,
    name: '小啦全球充',
    en: ''
  }
}
