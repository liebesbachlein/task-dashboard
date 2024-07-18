<template>
  <NotFoundView v-if="useErrorStore().error" />
  <div v-else class="site-content dashboard">
    <Transition name="side-pop-menu">
      <NavigationDashboard
        v-show="isNavOpen"
        :all-data="data"
        :current-route-name="currentMenuItem?.menu_item_data.route_name"
        :is-logged-in="isLoggedIn"
        @closeNav="isNavOpen = !isMobile || false"
      />
    </Transition>
    <div class="dashboard-inner">
      <div class="dashboard-title-wrap">
        <div class="dashboard-title">Dashboard</div>
        <img
          class="dashboard-arrow"
          src="@/assets/icons/arrow-left.svg"
          @click="isNavOpen = true"
        />
      </div>
      <div class="dashboard-section">
        <RouterView v-slot="{ Component }">
          <component :is="Component" :component-data="currentMenuItem" :all-data="data" />
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import type { LoadRawMenuItem } from '@/types/menu-item'
import NavigationDashboard from './partials/NavigationDashboard.vue'
import NotFoundView from '../not-found/NotFoundView.vue'
import { useErrorStore } from '@/stores/error'
import { RouterView, useRoute } from 'vue-router'
import CircularLoader from '@/components/CircularLoader.vue'
import { useFetchAllData } from '@/composables/useFetch'

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

<style>
.dashboard {
  background-color: #fff;
  overflow-y: scroll;
  min-height: 100vh;
}

.dashboard-inner {
  width: 100%;
  position: absolute;
  height: fit-content;
  padding: 0;
}

.dashboard-title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--mobile-dashboard-nav-top-height);
  width: 100%;
  padding: var(--mobile-dashboard-nav-top-padding);
  margin-bottom: 2rem;
  box-shadow: 1px 1px 4px 0px rgba(101, 101, 101, 0.25);
}

.dashboard-title {
  font-size: 1.25rem;
}

img.dashboard-arrow {
  height: 1.5rem;
}

.dashboard-section {
  width: 100%;
  height: fit-content;
  padding: 2rem 1rem;
  background-color: #fff;
}

.dashboard-section-title {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.side-pop-menu-enter-active,
.side-pop-menu-leave-active {
  transition: transform 0.1s ease;
}

.side-pop-menu-enter-from,
.side-pop-menu-leave-to {
  transform: translateX(100%);
}

.dashboard-event * {
  transition: none;
}

.dashboard-event {
  margin-bottom: 3rem;
}

.event-inner {
  margin-bottom: 3.5rem;
}

.event-inner-name {
  margin-bottom: 1.75rem;
}

@media only screen and (min-width: 950px) {
  .side-pop-menu-enter-active,
  .side-pop-menu-leave-active {
    transition: none;
  }

  .side-pop-menu-enter-from,
  .side-pop-menu-leave-to {
    transform: none;
  }

  .dashboard {
    background-color: var(--backdrop-color-desktop);
  }

  .dashboard-inner {
    width: calc(100% - var(--side-menu-desktop-width));
    left: var(--side-menu-desktop-width);
    padding: 0 2.5rem 3rem 2.5rem;
  }

  .dashboard-title-wrap {
    width: 100%;
    height: 3.2rem;
    box-shadow: none;
    padding: 0;
    margin-bottom: 3rem;
    align-items: flex-end;
    text-align: left;
  }

  .dashboard-arrow {
    display: none;
  }

  .dashboard-section {
    min-height: 60vh;
    padding: 2.5rem 2rem;
    border-radius: 0.5rem;
  }
}
</style>
