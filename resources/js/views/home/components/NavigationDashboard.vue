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
          v-for="(category, categoryIndex) in props.categories.filter(
            (item) => !item.isMainCategory
          )"
          :key="categoryIndex"
        >
          <div class="category-name">{{ category.categoryName }}</div>
          <div class="sub-menu-list">
            <router-link
              v-for="(menuItem, menuItemIndex) in category.menuItems"
              :key="menuItemIndex"
              :to="{ name: 'DashboardView', params: { id: menuItem.routeName } }"
            >
              <div
                class="sub-menu-item"
                :class="{
                  'menu-item-active': isActiveMenuItem([categoryIndex, menuItemIndex])
                }"
              >
                {{ menuItem.menuItemName }}
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="main-menu-list">
        <router-link :to="{ name: 'DashboardView', params: { id: 'home' } }">
          <div
            class="main-menu-item"
            :class="{
              'menu-item-active': isActiveMenuItem([null, 0])
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
import { computed, type PropType } from 'vue'
import type { CategoryType } from '../data/category.data'
import type { MenuPositionType } from '../data/menu-position.data'
import { useRoute } from 'vue-router'

const props = defineProps({
  categories: { type: Array as PropType<CategoryType[]>, required: true }
})
/*
const emits = defineEmits([
  changeView: (position: MenuPositionType | undefined): MenuPositionType | undefined => position,
  closeNav: () => true
])*/

const emits = defineEmits<{
  (e: 'changeView', position: MenuPositionType | undefined): void
  (e: 'closeNav', value: true): void
}>()

const route = useRoute()

const isActiveMenuItem = function (position: MenuPositionType) {
  const value: MenuPositionType | undefined = currentMenuPosition.value
  if (value !== undefined) {
    return position[0] === value[0] && position[1] === value[1]
  }
  return false
}

const getPositionFromRoute = function (
  routeName: string | undefined
): MenuPositionType | undefined {
  if (routeName === undefined) {
    return [null, 0]
  }

  for (let i = 0; i < props.categories.length; i++) {
    for (let j = 0; j < props.categories[i].menuItems.length; j++) {
      if (props.categories[i].menuItems[j].routeName == routeName) {
        if (i == props.categories.length - 1) {
          return [null, j]
        }
        return [i, j]
      }
    }
  }
  return undefined
}

const currentMenuPosition = computed((): MenuPositionType | undefined => {
  const newPosition: MenuPositionType | undefined = getPositionFromRoute(
    typeof route.params.id === 'string' ? route.params.id : undefined
  )
  emits('changeView', newPosition)
  closeNav()
  return newPosition
})

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
    height: 100%;
    display: grid;
    grid-template-rows: max-content 70% auto;
    padding: 0;
  }

  .dashboard-nav * {
    font-size: 0.875rem;
  }

  .dashboard-logo img {
    max-width: var(--logo-width-desktop);
  }

  .dashboard-logo {
    grid-row: 1;
    padding: 0;
    padding-left: 1.25rem;
    margin-top: var(--logo-margin-top-desktop);
    margin-bottom: 1.5rem;
  }

  .category-name {
    margin-bottom: 0.75rem;
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
    padding: 0 1.25rem;
    overflow-y: auto;
  }

  .main-menu-list {
    grid-row: 3;
    justify-content: flex-end;
    align-items: flex-end;
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
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
    color: #fff;
  }

  .menu-item-active {
    background-color: #9fabd4;
    border-radius: 0.25rem;
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
