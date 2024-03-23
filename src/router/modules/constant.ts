export const constantRoutes: Array<any> = [
  {
    path: '401',
    name: '401',
    component: () => import('@/views/error/401.vue'),
    meta: { permission: false }
  },
  {
    path: '404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: { permission: false }
  },
  {
    path: '500',
    name: '500',
    component: () => import('@/views/error/500.vue'),
    meta: { permission: false }
  }
]
