<template>
  <div class="dashboard-nav dashboard-nav-role user-color">
    <div class="dashboard-nav-close">
      <img class="dashboard-arrow" src="@/assets/icons/cross-white.svg" @click="closeNavUser()" />
    </div>
    <div class="dashboard-nav-inner">
      <div class="dashboard-logo">
        <img src="@/assets/icons/logo-bcc-invest.svg" />
      </div>
      <div class="category-list">
        <div v-for="([routeName, title], i) in menu" :key="i" class="sub-menu-list">
          <router-link :to="routeName" @click="emits('closeNavUser', true)">
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
  ['/user/home', 'Все уведомления'],
  ['/user/add-notification', 'Добавить уведомление'],
  ['/user/settings', 'Сменить пароль']
]

const emits = defineEmits<{
  (e: 'closeNavUser', value: true): void
}>()

const route = useRoute()

const isActiveMenuItem = function (routeName: string) {
  if (routeName && route.path.startsWith(routeName)) return true
  return false
}

const closeNavUser = () => emits('closeNavUser', true)

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
.user-color * {
  color: #000;
}
.user-color {
  background-color: rgb(255, 255, 255);
}

.user-color .menu-item-active {
  background-color: rgb(71, 109, 21);
  color: #fff;
}

@media only screen and (min-width: 950px) {
  .user-color .main-menu-list {
    background-color: rgb(71, 109, 21);
  }

  .user-color .main-menu-list * {
    color: #fff;
  }
}
</style>
