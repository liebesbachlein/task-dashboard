<template>
  <div class="dashboard-nav dashboard-nav-role">
    <div class="dashboard-nav-close">
      <img class="dashboard-arrow" src="@/assets/icons/cross-white.svg" @click="closeNavAdmin()" />
    </div>
    <div class="dashboard-nav-inner">
      <div class="dashboard-logo">
        <img src="@/assets/icons/logo-bcc-invest.svg" />
      </div>
      <div class="category-list">
        <div v-for="([routeName, title], i) in menu" :key="i" class="sub-menu-list">
          <router-link :to="routeName" @click="emits('closeNavAdmin', true)">
            <div
              class="admin-menu-item"
              :class="{
                'menu-item-active': isActiveMenuItem(routeName)
              }"
            >
              {{ title }}
            </div>
          </router-link>
        </div>
      </div>
      <div class="main-menu-list">
        <div class="main-menu-item admin-menu-item" @click="logOut">
          <img src="@/assets/icons/logout.svg" />
          Выйти
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import { useRoute } from 'vue-router'

const menu: string[][] = [
  ['/admin/control-all', 'Главная'],
  ['/admin/add-event', 'Добавить событие'],
  ['/admin/add-category', 'Добавить категорию'],
  ['/admin/add-notification', 'Добавить уведомление'],
  ['/admin/search-email', 'Поиск']
]

const emits = defineEmits<{
  (e: 'closeNavAdmin', value: true): void
}>()

const route = useRoute()

const isActiveMenuItem = function (routeName: string) {
  if (routeName && route.path.startsWith(routeName)) return true
  return false
}

const closeNavAdmin = () => emits('closeNavAdmin', true)

const logOut = function () {
  axios
    .post('/users/logout')
    .then((res) => {
      //?
      router.push({ path: '/' })
    })
    .catch((err) => {
      //?
    })
}
</script>

<style>
.dashboard-nav-role {
  background-color: #202020;
}

.dashboard-nav-role .menu-item-active {
  background-color: #232c61;
}

.dashboard-nav-role .dashboard-nav-inner {
  grid-template-rows: auto max-content min-content;
}

.dashboard-nav-role .dashboard-logo {
  grid-row: 3;
}

.dashboard-nav-role .main-menu-list {
  background-color: transparent;
  padding: 0 0.5rem;
  grid-row: 2;
}

.dashboard-nav-role .category-list {
  grid-row: 1;
}

.admin-menu-item {
  padding: 1rem 0.5rem;
  color: #fff;
  font-size: 0.875rem;
}

@media only screen and (min-width: 950px) {
  .dashboard-nav-role .dashboard-nav-inner {
    grid-template-rows: max-content 70% auto;
  }

  .admin-menu-item {
    padding: 0.6rem 0.75rem;
    margin: 0.25rem 0;
  }

  .dashboard-nav-role .dashboard-logo {
    grid-row: 1;
  }

  .dashboard-nav-role .category-list {
    grid-row: 2;
  }

  .dashboard-nav-role .main-menu-list {
    background-color: #232c61;
    grid-row: 3;
    padding: 1.5rem 1.25rem 0.5rem 0.75rem;
  }
}
</style>
