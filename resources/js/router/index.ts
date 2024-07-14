import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/home/DashboardView.vue'
import StatusDashboard from '@/views/home/views/StatusDashboard.vue'
import HomeDashboard from '@/views/home/views/HomeDashboard.vue'
import NotFoundView from '@/views/not-found/NotFoundView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import ControlAll from '@/views/admin/views/ControlAll.vue'
import CategoryAdd from '@/views/admin/views/CategoryAdd.vue'
import EventAdd from '@/views/admin/views/EventAdd.vue'
import CategoryUpdateDelete from '@/views/admin/views/CategoryUpdateDelete.vue'
import MenuItemUpdateDelete from '@/views/admin/views/MenuItemUpdateDelete.vue'
import EventUpdateDelete from '@/views/admin/views/EventUpdateDelete.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'AdminView',
      component: AdminView,
      children: [
        {
          path: 'add-category',
          name: 'CategoryAdd',
          component: CategoryAdd
        },
        {
          path: 'add-event',
          name: 'EventAdd',
          component: EventAdd
        },
        {
          path: 'control-all',
          name: 'ControlAll',
          component: ControlAll
        },
        {
          path: 'control-all/categories/:id',
          name: 'CategoryUpdateDelete',
          component: CategoryUpdateDelete
        },
        {
          path: 'control-all/menu-items/:id',
          name: 'MenuItemUpdateDelete',
          component: MenuItemUpdateDelete
        },
        {
          path: 'control-all/events/:id',
          name: 'EventUpdateDelete',
          component: EventUpdateDelete
        }
      ]
    },
    {
      path: '/admin/',
      redirect: '/admin/control-all'
    },
    {
      path: '/admin/control-all/categories',
      redirect: '/admin/control-all'
    },
    {
      path: '/admin/control-all/menu-items',
      redirect: '/admin/control-all'
    },
    {
      path: '/admin/control-all/events',
      redirect: '/admin/control-all'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'DashboardView',
      component: DashboardView,
      children: [
        {
          path: '/:id(home)',
          name: 'HomeDashboard',
          component: HomeDashboard
        },
        {
          path: '/:id',
          name: 'StatusDashboard',
          component: StatusDashboard
        }
      ]
    },
    {
      name: '404',
      path: '/:catchAll(.*)*',
      component: NotFoundView
    }
  ]
})

export default router
