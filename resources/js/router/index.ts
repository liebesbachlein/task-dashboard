import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/dashboard/DashboardView.vue'
import StatusDashboard from '@/views/dashboard/views/StatusDashboard.vue'
import HomeDashboard from '@/views/dashboard/views/HomeDashboard.vue'

import AdminView from '@/views/admin/AdminView.vue'
import ControlAll from '@/views/admin/views/ControlAll.vue'
import CategoryAdd from '@/views/admin/views/CategoryAdd.vue'
import EventAdd from '@/views/admin/views/EventAdd.vue'
import CategoryUpdateDelete from '@/views/admin/views/CategoryUpdateDelete.vue'
import MenuItemUpdateDelete from '@/views/admin/views/MenuItemUpdateDelete.vue'
import EventUpdateDelete from '@/views/admin/views/EventUpdateDelete.vue'
import NotificationAdd from '@/views/admin/views/NotificationAdd.vue'
import SearchEmail from '@/views/admin/views/SearchEmail.vue'
import LoginViewAdmin from '@/views/admin/LoginView.vue'

import UserView from '@/views/user/UserView.vue'
import NotificationAddUser from '@/views/user/views/NotificationAdd.vue'
import NotificationsSee from '@/views/user/views/NotificationsSee.vue'
import PasswordUpdate from '@/views/user/views/PasswordUpdate.vue'

import LoginView from '@/views/user/LoginView.vue'

import NotFoundView from '@/views/not-found/NotFoundView.vue'
import RegisterView from '@/views/user/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes: [
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/admin-login',
      name: 'LoginViewAdmin',
      component: LoginViewAdmin
    },
    {
      path: '/admin',
      name: 'AdminView',
      component: AdminView,
      children: [
        {
          path: 'search-email',
          name: 'SearchEmail',
          component: SearchEmail
        },
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
          path: 'add-notification',
          name: 'NotificationAdd',
          component: NotificationAdd
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
      path: '/user',
      name: 'UserView',
      component: UserView,
      children: [
        {
          path: 'home',
          name: 'NotificationsSee',
          component: NotificationsSee
        },
        {
          path: 'add-notification',
          name: 'NotificationAddUser',
          component: NotificationAddUser
        },
        {
          path: 'settings',
          name: 'PasswordUpdate',
          component: PasswordUpdate
        }
      ]
    },
    {
      path: '/user/',
      redirect: '/user/home'
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
