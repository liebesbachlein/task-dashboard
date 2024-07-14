<template>
  <div class="site-content dashboard">
    <Transition name="side-pop-menu">
      <NavigationAdmin v-show="isNavOpen" @closeNavAdmin="isNavOpen = !isMobile || false" />
    </Transition>
    <div class="dashboard-inner dashboard-inner-admin">
      <div class="dashboard-title-wrap">
        <div class="dashboard-title">Панель администратора</div>
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
import NavigationAdmin from './components/NavigationAdmin.vue'

const isNavOpen = ref(false)
const isMobile = ref(false)

onMounted(() => {
  addEventListener('resize', () => {
    isMobile.value = window.matchMedia('(max-width: 1023px)').matches
    if (!isMobile.value) isNavOpen.value = true
  })

  isMobile.value = window.matchMedia('(max-width: 1023px)').matches
  if (!isMobile.value) isNavOpen.value = true
})
</script>

<style>
.dashboard-inner-admin {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard-section-admin {
  width: 100%;
}

@media only screen and (min-width: 1024px) {
  .dashboard-section-admin {
    width: 55%;
  }
}
</style>
