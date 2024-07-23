<script setup lang="ts">
import type { LoadRawCategory } from '@/types/category'
import AppLogo from '@/components/AppLogo.vue'
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'
import MobileMenuClose from '@/components/MobileMenuClose.vue'

interface Props {
  allData: LoadRawCategory[]
  loader: boolean
  currentRouteName?: string
  isLoggedIn?: boolean
}

const props = defineProps<Props>()

function isActiveMenuItem(routeName: string) {
  if (routeName && routeName === props.currentRouteName) return true
  return false
}
</script>

<template>
  <div class="nav">
    <MobileMenuClose />
    <div class="nav-grid">
      <AppLogo />
      <!--Loader elements-->
      <template v-if="!props.loader">
        <ul class="plain-ul list list--categories list--super">
          <li
            class="plain-li list__item list__item--category"
            v-for="category in props.allData.filter((e) => e.menu_items.length > 0)"
            :key="category.category_data.id"
          >
            <div
              class="list__item__title-wrapper list__item__title-wrapper--static list__item__title-wrapper--category"
            >
              <span class="nav-span list__item__title list__item__title--category">
                {{ category.category_data.name }}
              </span>
            </div>

            <ul class="plain-ul list list--intented">
              <li
                v-for="menuItem in category.menu_items"
                :key="menuItem.menu_item_data.id"
                class="plain-li list__item list__item--event"
              >
                <router-link
                  :to="{
                    name: 'StatusDashboard',
                    params: { id: menuItem.menu_item_data.route_name }
                  }"
                  @click="useMenuSidebarStore().closeMenuSidebar()"
                  class="plain-link"
                >
                  <div
                    class="list__item__title-wrapper list__item__title-wrapper--clickable"
                    :class="{
                      'list__item__title-wrapper--active list__item__title-wrapper--event--active':
                        isActiveMenuItem(menuItem.menu_item_data.route_name)
                    }"
                  >
                    <span class="nav-span list__item__title list__item__title--event">
                      {{ menuItem.menu_item_data.name }}
                    </span>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="plain-ul list list--main list--super">
          <li class="plain-li list__item list__item--main">
            <router-link
              to="/home"
              @click="useMenuSidebarStore().closeMenuSidebar()"
              class="plain-link"
            >
              <div
                class="list__item__title-wrapper list__item__title-wrapper--clickable list__item__title-wrapper--main"
                :class="{
                  'list__item__title-wrapper--active list__item__title-wrapper--main--active':
                    isActiveMenuItem('home')
                }"
              >
                <img class="list__img list__img--main" src="@/assets/icons/home.svg" />
                <span class="nav-span list__item__title list__item__title--main">Главная</span>
              </div>
            </router-link>
          </li>
          <li class="plain-li list__item list__item--main">
            <router-link
              class="plain-link"
              :to="isLoggedIn ? '/user' : '/login'"
              @click="useMenuSidebarStore().closeMenuSidebar()"
            >
              <div
                class="list__item__title-wrapper list__item__title-wrapper--clickable list__item__title-wrapper--main"
              >
                <img class="list__img list__img--main" src="@/assets/icons/login.svg" />
                <span class="nav-span list__item__title list__item__title--main">Профиль</span>
              </div>
            </router-link>
          </li>
        </ul></template
      >
      <!--Rendered elements-->
      <template v-else>
        <ul class="plain-ul list list--categories list--super">
          <li
            class="plain-li list__item list__item--category"
            v-for="i in 2"
            :key="'category-load' + i"
          >
            <div class="list__item__title-wrapper--category nav-load nav-load--category" />
            <ul class="plain-ul list list--intented">
              <li
                v-for="j in i + 1"
                :key="'event-load' + j"
                class="plain-li list__item list__item--event"
              >
                <div class="list__item__title-wrapper--event nav-load nav-load--event" />
              </li>
            </ul>
          </li>
        </ul>
        <ul class="plain-ul list list--main list--super">
          <li v-for="k in 2" :key="'main-load' + k" class="plain-li list__item list__item--main">
            <div class="list__item__title-wrapper--main nav-load nav-load--main" />
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style>
.nav {
  position: fixed;
  background-color: #9fa0ae;
  width: 80%;
  right: 0;
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: max-content auto;
  z-index: 1;
}

.nav-grid {
  height: 100%;
  display: grid;
  grid-template-rows: max-content minmax(auto, auto) auto;
}

.list {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.list--categories {
  grid-row: 2;
}

.list--main {
  grid-row: 1;
  height: fit-content;
  background-color: #9fa0ae;
  padding-top: 0.75rem;
}

.list--super {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.list__item {
  width: 100%;
}

.list__item--category {
  margin-bottom: 0.5rem;
}

.list__item--event {
  margin: 0.125rem 0;
}

.list__item--main {
  margin-bottom: 0.5rem;
}

.list__item__title-wrapper--category {
  margin-bottom: 0.5rem;
}

.list__item__title-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;

  width: 100%;

  cursor: default;
}

.list__item__title-wrapper--clickable {
  width: 100%;
  min-height: 2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.list__item__title-wrapper--static {
  padding-left: 0;
  cursor: default;
}

.list__item__title-wrapper--event--active,
.list__item__title-wrapper--main--active {
  background-color: #33327fa5;
}

.list__item__title {
  font-size: 1.025rem;
}

.list__item__title--category {
  color: #39508f;
}

.list__img {
  display: none;
}

/**
Loading elements style
*/

.nav-load {
  height: 1.75rem;
  border-radius: 0.25rem;
  width: 100%;
}

.nav-load--category {
  background: linear-gradient(90deg, #b6b8daa2 40%, #d1d3f9a2 50%, #b6b8daa2 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: loading-shimmer 1s infinite linear;
}

.nav-load--event {
  width: 75%;
  background-color: #e1e2ffa2;
}

.nav-load--main {
  background: linear-gradient(90deg, #b6b8da5f 40%, #d1d3f961 50%, #b6b8da5f 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: loading-shimmer 1s infinite linear;
}

@media only screen and (min-width: 565px) {
  .nav {
    width: 50%;
  }
}

@media only screen and (min-width: 950px) {
  .nav {
    position: fixed;
    left: 0;
    background-color: #fff;
    width: var(--side-menu-desktop-width);
    min-height: calc(100vw * 8 / 16);
    height: 100%;
    grid-template-rows: 0 100%;
  }

  .nav-grid {
    grid-row: 2;
    grid-template-rows: max-content 65% auto;
    padding: 0;
    position: relative;
  }

  .list--categories {
    grid-row: 2;
    overflow-y: auto;
  }

  .list--main {
    width: 100%;
    grid-row: 3;
    height: 100%;
    background-color: var(--accent-color);
    padding-top: 0.75rem;
  }

  .list__item__title-wrapper--clickable {
    cursor: pointer;
  }

  .list__item__title-wrapper--main {
    padding-left: 0.25rem;
  }

  .list__item__title-wrapper--main--active {
    background-color: #33327f;
  }

  .list__item__title-wrapper--event--active {
    background-color: #a6a6a6;
  }

  .list__item__title {
    font-size: 0.875rem;
  }

  .list__item__title--main {
    margin-left: 0.5rem;
    color: #fff;
  }

  .list__img {
    display: block;
    max-width: 1.5rem;
  }
}
</style>
