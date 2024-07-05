<template>
  <NotFoundView v-if="useErrorStore().error" />
  <div v-else class="site-content dashboard">
    <Transition name="side-pop-menu">
      <NavigationDashboard
        v-show="isNavOpen"
        :categories="categories"
        @changeView="(position) => changeView(position)"
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
        <div class="dashboard-section-title">{{ currentView.menuItemName }}</div>
        <component
          :is="currentView.component"
          :event-data="keyDatesMap.get(currentView.routeName)"
          :route-name="currentView.routeName"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { MenuPositionType } from './data/menu-position.data'
import type { MenuItemType } from './data/menu-item.data'
import NavigationDashboard from './components/NavigationDashboard.vue'
import { categories, keyDatesMap } from './data/data'
import NotFoundView from '../not-found/NotFoundView.vue'
import { useErrorStore } from '@/stores/router'

const currentMenuPosition = ref<MenuPositionType>([null, 0])
const isNavOpen = ref(false)
const isMobile = ref(false)

const currentView = computed((): MenuItemType => {
  return categories[currentMenuPosition.value[0] ?? categories.length - 1].menuItems[
    currentMenuPosition.value[1]
  ]
})

const changeView = function (position: MenuPositionType | undefined) {
  if (typeof position !== 'undefined') {
    currentMenuPosition.value[0] = position[0]
    currentMenuPosition.value[1] = position[1]
  } else {
    useErrorStore().openError()
  }
}

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

@media only screen and (min-width: 1024px) {
  .side-pop-menu-enter-active,
  .side-pop-menu-leave-active {
    transition: none;
  }

  .side-pop-menu-enter-from,
  .side-pop-menu-leave-to {
    transform: none;
  }

  .site-content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
  }

  .dashboard {
    background-color: var(--backdrop-color-desktop);
  }

  .dashboard-inner {
    width: calc(100% - var(--side-menu-desktop-width));
    position: absolute;
    left: var(--side-menu-desktop-width);
    height: fit-content;
    padding: 0 2.5rem 3rem 2.5rem;
    background-color: var(--backdrop-color-desktop);
  }

  .dashboard-title-wrap {
    width: fit-content;
    height: calc(1.75rem * 0.1 + var(--dashboard-baseline-top-desktop));
    box-shadow: none;
    padding: 0;
    margin-bottom: 3rem;
    align-items: flex-end;
  }

  .dashboard-title {
    font-size: 1.75rem;
  }

  .dashboard-arrow {
    display: none;
  }

  .dashboard-section {
    width: 100%;
    height: fit-content;
    min-height: 60vh;
    padding: 2.5rem 2rem;
    background-color: #fff;
    border-radius: 0.5rem;
  }

  .dashboard-section-title {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
}
</style>
