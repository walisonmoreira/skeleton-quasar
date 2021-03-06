import $store from 'src/store'
import { children, fallback } from 'src/app/Router'

import { routes as doc } from 'src/domains/Doc'
import { routes as example } from 'src/domains/Example'

/**
 * @returns {Promise}
 */
export const layout = () => import('src/modules/Dashboard/Components/DashboardLayout')

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  const routes = [
    children('/dashboard', layout, [
      fallback(() => import('src/view/Dashboard/Index')),
      ...doc(router),
      ...example(router)
    ])
  ]

  // Always leave this as last one
  if (process.env.MODE !== 'ssr') {
    routes.push({
      path: '*',
      component: () => import('src/view/Dashboard/Error404')
    })
  }

  router.add(routes)

  router.beforeEach((to, from, next) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    const transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

    $store.dispatch('dashboard/setTransition', transitionName).then(next)
  })
}
