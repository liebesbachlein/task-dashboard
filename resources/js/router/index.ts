import DashboardView from '@/views/home/DashboardView.vue'
import { categories, keyDatesMap } from '@/views/home/data/data'
import NotFoundView from '@/views/not-found/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const isRoute = function (route: string) {
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].menuItems.length; j++) {
      if (categories[i].menuItems[j].routeName.match(route)) return true
    }
  }
  return false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/:id',
      name: 'DashboardView',
      component: DashboardView
    },
    {
      name: '404',
      path: '/:catchAll(.*)*',
      component: NotFoundView
    }
  ]
})

export default router
