<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavigationUser from './partials/NavigationUser.vue'
import axios from 'axios'
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'
import LayoutHeader from '@/components/LayoutHeader.vue'

const isNavOpen = ref(false)
const isMobile = ref(false)
const whoIsUser = ref<{
  email: string
  id: string
}>({
  email: '',
  id: ''
})

const loader = ref<boolean>(true)

onMounted(() => {
  addEventListener('resize', () => {
    isMobile.value = window.matchMedia('(max-width: 949px)').matches
    if (!isMobile.value) isNavOpen.value = true
  })

  isMobile.value = window.matchMedia('(max-width: 949px)').matches
  if (!isMobile.value) isNavOpen.value = true
})

axios.get('/sanctum/csrf-cookie').then((sanctumRes) => {
  loader.value = true
  axios
    .get('/api/user/me')
    .then((res) => {
      whoIsUser.value.email = res.data.email
      whoIsUser.value.id = res.data.id
      console.log(whoIsUser.value)
      loader.value = false
    })
    .catch((err) => {
      console.log(err)
      loader.value = false
    })
})
</script>

<template>
  <div class="page">
    <Transition name="sidebar-pop">
      <NavigationUser
        :who-is-user="whoIsUser"
        v-show="!isMobile || useMenuSidebarStore().isMenuSidebarOpen"
        :loader="loader"
      />
    </Transition>
    <div class="page-content-wrapper">
      <LayoutHeader title="Личный кабинет" />
      <RouterView v-slot="{ Component }">
        <component :is="Component" :who-is-user="whoIsUser" />
      </RouterView>
    </div>
  </div>
</template>

<style></style>
