import DashboardView from '@/views/home/DashboardView.vue'
import NotFoundView from '@/views/not-found/NotFoundView.vue'
import LogIn from '@/views/auth/LogIn.vue'
import AddEvent from '@/views/admin/components/AddEvent.vue'
import AddCategory from '@/views/admin/components/AddCategory.vue'
import ShowAll from '@/views/admin/components/ShowAll.vue'
import AdminView from '@/views/admin/AdminView.vue'
import UpdateDeleteCategory from '@/views/admin/components/UpdateDeleteCategory.vue'
import UpdateDeleteMenuItem from '@/views/admin/components/UpdateDeleteMenuItem.vue'
import UpdateDeleteEvent from '@/views/admin/components/UpdateDeleteEvent.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/admin/',
      redirect: '/admin/home'
    },
    {
      path: '/admin/home',
      components: AdminView
    },
    {
      path: '/admin/all',
      name: 'ShowAll',
      component: ShowAll
    },
    {
      path: '/admin/add-event',
      name: 'AddEvent',
      component: AddEvent
    },
    {
      path: '/admin/add-category',
      name: 'AddCategory',
      component: AddCategory
    },
    {
      path: '/admin/categories/:id',
      component: UpdateDeleteCategory
    },
    {
      path: '/admin/menu-items/:id',
      component: UpdateDeleteMenuItem
    },
    {
      path: '/admin/events/:id',
      component: UpdateDeleteEvent
    }
    /*{
      name: '404',
      path: '/:catchAll(.*)*',
      component: NotFoundView
    }*/
  ]
})

export default router
