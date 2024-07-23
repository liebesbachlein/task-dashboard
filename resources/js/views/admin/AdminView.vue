<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavigationAdmin from './partials/NavigationAdmin.vue'
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'
import LayoutHeader from '@/components/LayoutHeader.vue'

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

<template>
  <div class="page">
    <Transition name="sidebar-pop">
      <NavigationAdmin v-show="!isMobile || useMenuSidebarStore().isMenuSidebarOpen" />
    </Transition>
    <div class="page-content-wrapper">
      <LayoutHeader title="Admin panel" />
      <RouterView />
    </div>
  </div>
</template>

<style>
.page-content-wrapper-role {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-content-role {
  width: 100%;
}

@media only screen and (min-width: 950px) {
  .page-content-role {
    width: 55%;
  }
}
</style>
