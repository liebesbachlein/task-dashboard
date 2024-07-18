import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/dashboard/DashboardView.vue'
import StatusDashboard from '@/views/dashboard/partials/StatusDashboard.vue'
import HomeDashboard from '@/views/dashboard/partials/HomeDashboard.vue'

import AdminView from '@/views/admin/AdminView.vue'
import ControlAll from '@/views/admin/partials/ControlAll.vue'
import CategoryAdd from '@/views/admin/partials/CategoryAdd.vue'
import EventAdd from '@/views/admin/partials/EventAdd.vue'
import CategoryUpdateDelete from '@/views/admin/partials/CategoryUpdateDelete.vue'
import MenuItemUpdateDelete from '@/views/admin/partials/MenuItemUpdateDelete.vue'
import EventUpdateDelete from '@/views/admin/partials/EventUpdateDelete.vue'
import NotificationAdd from '@/views/admin/partials/NotificationAdd.vue'
import SearchEmail from '@/views/admin/partials/SearchEmail.vue'
import LoginViewAdmin from '@/views/admin/LoginView.vue'
import EditEmail from '@/views/admin/partials/EditEmail.vue'

import UserView from '@/views/profile/ProfileView.vue'
import NotificationAddUser from '@/views/profile/partials/NotificationAdd.vue'
import NotificationsSee from '@/views/profile/partials/NotificationsSee.vue'
import PasswordUpdate from '@/views/profile/partials/PasswordUpdate.vue'

import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import NotFoundView from '@/views/not-found/NotFoundView.vue'

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
          path: 'search-email/:id',
          name: 'EditEmail',
          component: EditEmail
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
