<template>
  <div class="site-content dashboard">
    <Transition name="side-pop-menu">
      <NavigationUser v-show="isNavOpen" @closeNavUser="isNavOpen = !isMobile || false" />
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
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavigationUser from './components/NavigationUser.vue'

const isNavOpen = ref(false)
const isMobile = ref(false)

onMounted(() => {
  addEventListener('resize', () => {
    isMobile.value = window.matchMedia('(max-width: 949px)').matches
    if (!isMobile.value) isNavOpen.value = true
  })

  isMobile.value = window.matchMedia('(max-width: 949px)').matches
  if (!isMobile.value) isNavOpen.value = true
})
</script>

<style></style>
