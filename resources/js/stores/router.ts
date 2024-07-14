import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', () => {
  const router = ref('home')
  function setRouter(newRouter: string) {
    router.value = newRouter
  }
  function resetRouter() {
    router.value = 'home'
  }
  function getRouter() {
    return router.value
  }

  return { setRouter, resetRouter, getRouter }
})
