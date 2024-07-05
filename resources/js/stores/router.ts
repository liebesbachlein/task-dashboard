import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  const error = ref(false)
  function openError() {
    error.value = true
  }
  function closeError() {
    error.value = false
  }

  return { error, openError, closeError }
})
