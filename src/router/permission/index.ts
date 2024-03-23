import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import router from '..'
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  next()
})
