import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuSidebarStore = defineStore('menuSideBar', () => {
  const isMenuSidebarOpen = ref(false)

  function openMenuSidebar() {
    isMenuSidebarOpen.value = true
  }

  function closeMenuSidebar() {
    isMenuSidebarOpen.value = false
  }

  return { isMenuSidebarOpen, openMenuSidebar, closeMenuSidebar }
})
