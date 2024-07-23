<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import type { LoadRawMenuItem } from '@/types/menu-item'
import NavigationDashboard from './partials/NavigationDashboard.vue'
import NotFoundView from '../not-found/NotFoundView.vue'
import { useErrorStore } from '@/stores/error'
import { RouterView, useRoute } from 'vue-router'
import { useFetchAllData } from '@/composables/useFetch'
import LayoutHeader from '@/components/LayoutHeader.vue'
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'

const { data, mapRouteToComponent, loader, messageOnSubmit, isLoggedIn } = useFetchAllData()

const home: LoadRawMenuItem = {
  menu_item_data: {
    id: -1,
    name: '',
    route_name: 'home',
    category_id: -1
  },
  events: []
}

const currentMenuItem = ref<LoadRawMenuItem | undefined>(undefined)
const isNavOpen = ref(false)
const isMobile = ref(false)

const route = useRoute()

const setView = function (routeName: string) {
  if (routeName === 'home') {
    currentMenuItem.value = home
    return
  }

  const newMenuItem: LoadRawMenuItem | undefined = mapRouteToComponent.value.get(routeName)

  if (newMenuItem) {
    currentMenuItem.value = {
      menu_item_data: newMenuItem.menu_item_data,
      events: newMenuItem.events
    }
    //getCurrentInstance()?.update
  } else {
    if (mapRouteToComponent.value.size) {
      useErrorStore().openError()
      getCurrentInstance()?.update
    }
  }
}

watch(loader, () => {
  const routeName = typeof route.params.id === 'string' ? route.params.id : route.params.id[0]
  setView(routeName)
})

watch(
  route,
  () => {
    const routeName = typeof route.params.id === 'string' ? route.params.id : route.params.id[0]
    setView(routeName)
  },
  { immediate: true }
)

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
  <NotFoundView v-if="useErrorStore().error" />
  <div v-else class="page">
    <Transition name="sidebar-pop">
      <NavigationDashboard
        v-show="!isMobile || useMenuSidebarStore().isMenuSidebarOpen"
        :all-data="data"
        :loader="loader"
        :current-route-name="currentMenuItem?.menu_item_data.route_name"
        :is-logged-in="isLoggedIn"
      />
    </Transition>
    <div class="page-content-wrapper" @click.self="useMenuSidebarStore().closeMenuSidebar">
      <LayoutHeader title="Dashboard" />
      <div class="page-content">
        <RouterView v-slot="{ Component }">
          <component
            :is="Component"
            :component-data="currentMenuItem"
            :all-data="data"
            :loader="loader"
          />
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style>
.page {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
}

.page-content-wrapper {
  width: 100%;
  position: absolute;
  height: fit-content;
  padding: 0;
  z-index: 0;
}

.page-content {
  width: 100%;
  height: fit-content;
  padding: 2rem 1rem;
  background-color: #fff;
  margin: 0 auto;
}

.sidebar-pop-enter-active,
.sidebar-pop-leave-active {
  transition: transform 0.1s ease;
}

.sidebar-pop-enter-from,
.sidebar-pop-leave-to {
  transform: translateX(100%);
}

@media only screen and (min-width: 950px) {
  .sidebar-pop-enter-active,
  .sidebar-pop-leave-active {
    transition: none;
  }

  .sidebar-pop-enter-from,
  .sidebar-pop-leave-to {
    transform: none;
  }

  .page {
    background-color: var(--backdrop-color-desktop);
  }

  .page-content-wrapper {
    width: calc(100% - var(--side-menu-desktop-width));
    left: var(--side-menu-desktop-width);
    padding: 0 2.5rem 3rem 2.5rem;
  }

  .page-content {
    min-height: 60vh;
    padding: 2.5rem 2rem;
    border-radius: 0.5rem;
  }
}
</style>
