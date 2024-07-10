<template>
  <div id="dashboard-nav" class="dashboard-nav">
    <div class="dashboard-nav-close">
      <img class="dashboard-arrow" src="@/assets/icons/cross.svg" @click="closeNav()" />
    </div>
    <div class="dashboard-nav-inner">
      <div class="dashboard-logo">
        <img src="@/assets/icons/logo-bcc-invest.svg" />
      </div>
      <div class="category-list">
        <div
          class="category-item"
          v-for="(category, categoryIndex) in getCategories()"
          :key="categoryIndex"
        >
          <div class="category-name">{{ category.name }}</div>
          <div class="sub-menu-list">
            <router-link
              v-for="(menuItem, menuItemIndex) in getMenuItems(category.id)"
              :key="menuItemIndex"
              :to="{ name: 'DashboardView', params: { id: menuItem.routeName } }"
              @click="emits('closeNav', true)"
            >
              <div
                class="sub-menu-item"
                :class="{
                  'menu-item-active': isActiveMenuItem(menuItem.routeName)
                }"
              >
                {{ menuItem.name }}
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="main-menu-list">
        <router-link
          :to="{ name: 'DashboardView', params: { id: 'home' } }"
          @click="emits('closeNav', true)"
        >
          <div
            class="main-menu-item"
            :class="{
              'menu-item-active': isActiveMenuItem('home')
            }"
          >
            <img src="@/assets/icons/home.svg" />
            {{ 'Главная' }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getCategories, getMenuItems } from '@/data/data'

const emits = defineEmits<{
  (e: 'closeNav', value: true): void
}>()

const route = useRoute()

const isActiveMenuItem = function (routeName: string) {
  if (routeName && routeName === route.params.id) return true
  return false
}

const closeNav = () => emits('closeNav', true)
</script>

<style>
.dashboard-nav {
  position: fixed;
  background-color: #9fa0ae;
  width: 80%;
  right: 0;
  height: 100%;
  z-index: 9999;
  overflow-y: auto;
  display: grid;
  grid-template-rows: max-content auto;
}

.dashboard-nav-close {
  width: 100%;
  height: var(--mobile-dashboard-nav-top-height);
  padding: var(--mobile-dashboard-nav-top-padding);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.dashboard-nav-inner {
  height: 100%;
  display: grid;
  grid-template-rows: max-content minmax(auto, auto) auto;
  padding: 0 0.5rem;
}

.dashboard-nav * {
  font-size: 1.025rem;
}

.dashboard-logo img {
  max-width: 85%;
}

.dashboard-logo {
  grid-row: 3;
  padding: 3rem 1rem 2rem 1rem;
  display: flex;
}

.category-name {
  margin-bottom: 0.75rem;
  color: #39508f;
}

.category-item {
  margin: 0.75rem 0;
}

.category-list,
sub-menu-list,
main-menu-list,
.menu-list {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.category-list {
  grid-row: 2;
  padding: 0 0.5rem;
}

.main-menu-list {
  padding-right: 0.5rem;
  grid-row: 1;
  justify-content: flex-end;
  align-items: flex-end;
  height: fit-content;
  background-color: #9fa0ae;
}

.sub-menu-item,
.main-menu-item {
  padding: 1rem 0.5rem;
}

.main-menu-item {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  align-items: center;
  color: #000;
}

.menu-item-active {
  background-color: #d9d9d9;
  border-radius: 0.25rem;
}

.main-menu-item.menu-item-active {
  background-color: #d9d9d9;
}

.main-menu-item img {
  display: none;
}

@media only screen and (min-width: 1024px) {
  .dashboard-nav {
    position: fixed;
    left: 0;
    background-color: #fff;
    width: var(--side-menu-desktop-width);
    min-height: calc(100vw * 8 / 16);
    height: 100%;
    grid-template-rows: 0 100%;
  }

  .dashboard-nav-close {
    grid-row: 1;
    display: none;
  }

  .dashboard-nav-inner {
    grid-row: 2;
    grid-template-rows: max-content 70% auto;
    padding: 0;
  }

  .dashboard-nav * {
    font-size: 0.875rem;
  }

  .dashboard-logo img {
    max-width: 10rem;
  }

  .dashboard-logo {
    grid-row: 1;
    padding: 0;
    padding-left: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .category-name {
    margin-bottom: 0.75rem;
  }

  .category-item {
    margin: 0.75rem 0;
  }

  .category-list {
    grid-row: 2;
    padding: 0 1.25rem;
    overflow-y: auto;
  }

  .main-menu-list {
    grid-row: 3;
    padding: 1.5rem 1.25rem 0.5rem 0.75rem;
    height: 100%;
    background-color: var(--accent-color);
  }

  .sub-menu-item,
  .main-menu-item {
    padding: 0.6rem 0.75rem;
    margin: 0.25rem 0;
  }

  .main-menu-item {
    padding: 0.5rem 0.5rem;
    cursor: pointer;
    color: #fff;
  }

  .menu-item-active {
    background-color: #9fabd4;
  }

  .main-menu-item.menu-item-active {
    background-color: #374f9e;
  }

  .main-menu-item img {
    max-width: 1.5rem;
    margin-right: 0.5rem;
    padding-bottom: 2px;
  }
}
</style>
