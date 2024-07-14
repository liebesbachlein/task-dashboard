<template>
  <div class="dashboard-nav dashboard-nav-admin">
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
              class="sub-menu-item"
              :class="{
                'menu-item-active': isActiveMenuItem(routeName)
              }"
            >
              {{ title }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const menu: string[][] = [
  ['/admin/control-all', 'Главная'],
  ['/admin/add-event', 'Добавить событие'],
  ['/admin/add-category', 'Добавить категорию']
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
</script>

<style>
.dashboard-nav-admin {
  background-color: #202020;
}

.dashboard-nav-admin .menu-item-active {
  background-color: #232c61;
}

.dashboard-nav-admin .sub-menu-item {
  color: #fff;
}
</style>
