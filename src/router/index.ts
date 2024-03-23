import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './modules/constant'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'portalApp',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/shop',
    children: [
      {
        path: '/shop',
        name: 'shop',
        component: () => import('@/views/shop/view.vue'),
        meta: { permission: false, title: '影视会员大全' }
      },
      ...constantRoutes
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
