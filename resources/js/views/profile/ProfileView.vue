<template>
  <div class="site-content dashboard">
    <Transition name="side-pop-menu">
      <NavigationUser
        :who-is-user="whoIsUser"
        v-show="isNavOpen"
        @closeNavUser="isNavOpen = !isMobile || false"
      />
    </Transition>
    <div class="dashboard-inner dashboard-inner-role">
      <div class="dashboard-title-wrap">
        <div class="dashboard-title">Личный кабинет</div>
        <img
          class="dashboard-arrow"
          src="@/assets/icons/arrow-left.svg"
          @click="isNavOpen = true"
        />
      </div>
      <RouterView v-slot="{ Component }">
        <component :is="Component" :who-is-user="whoIsUser" />
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavigationUser from './partials/NavigationUser.vue'
import axios from 'axios'

const isNavOpen = ref(false)
const isMobile = ref(false)
const whoIsUser = ref<{
  email: string
  id: string
}>({
  email: '',
  id: ''
})

onMounted(() => {
  addEventListener('resize', () => {
    isMobile.value = window.matchMedia('(max-width: 949px)').matches
    if (!isMobile.value) isNavOpen.value = true
  })

  isMobile.value = window.matchMedia('(max-width: 949px)').matches
  if (!isMobile.value) isNavOpen.value = true
})

axios.get('/sanctum/csrf-cookie').then((sanctumRes) => {
  axios
    .get('/api/user/me')
    .then((res) => {
      whoIsUser.value.email = res.data.email
      whoIsUser.value.id = res.data.id
      console.log(whoIsUser.value)
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<style></style>
