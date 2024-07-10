<template>
  <NotFoundView v-if="useErrorStore().error" />
  <div v-else class="site-content dashboard">
    <Transition name="side-pop-menu">
      <NavigationDashboard v-show="isNavOpen" @closeNav="isNavOpen = !isMobile || false" />
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
      <div v-if="currentMenuItem" class="dashboard-section">
        <div class="dashboard-section-title">{{ currentMenuItem.name }}</div>
        <WelcomeView v-if="currentMenuItem.routeName === 'home'" />
        <div v-else class="dashboard-event">
          <div v-for="(event, i) in getEvents(currentMenuItem.id)" :key="i" class="event-inner">
            <div v-if="getEvents(currentMenuItem.id).length > 1" class="event-inner-name">
              {{ event.name }}
            </div>
            <StatusBar :id="currentMenuItem.routeName + i" :event-data="event" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import type { MenuItemType } from '../../data/menu-item.data'
import NavigationDashboard from './components/NavigationDashboard.vue'
import NotFoundView from '../not-found/NotFoundView.vue'
import { useErrorStore } from '@/stores/router'
import StatusBar from './components/StatusBar.vue'
import { useRoute } from 'vue-router'
import { getEvents, getMenuItemByRouteName } from '@/data/data'
import WelcomeView from './WelcomeView.vue'

const home: MenuItemType = {
  id: -1,
  name: 'Истекут в течении 30 дней',
  routeName: 'home',
  categoryId: -1
}

const currentMenuItem = ref<MenuItemType>(home)
const isNavOpen = ref(false)
const isMobile = ref(false)

const route = useRoute()

const setView = function (routeName: string) {
  if (routeName === 'home') {
    currentMenuItem.value = home
  } else {
    let menuItem: MenuItemType | undefined = getMenuItemByRouteName(routeName)
    if (menuItem) {
      currentMenuItem.value = menuItem
      getCurrentInstance()?.update
    } else {
      useErrorStore().openError()
    }
  }
}

watch(
  route,
  () => {
    setView(typeof route.params.id === 'string' ? route.params.id : route.params.id[0])
  },
  { immediate: true }
)

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
.site-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}

.dashboard {
  background-color: #fff;
  overflow-y: scroll;
}

.dashboard-inner {
  width: 100%;
  position: absolute;
  height: fit-content;
  padding: 0;
  background-color: #fff;
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
  font-size: 1.75rem;
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

@media only screen and (min-width: 1024px) {
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
    background-color: var(--backdrop-color-desktop);
  }

  .dashboard-title-wrap {
    width: fit-content;
    height: 3.2rem;
    box-shadow: none;
    padding: 0;
    margin-bottom: 3rem;
    align-items: flex-end;
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
