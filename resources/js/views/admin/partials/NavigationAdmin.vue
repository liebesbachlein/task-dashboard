<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import MobileMenuClose from '@/components/MobileMenuClose.vue'
import router from '@/router'
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'
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
    .post('/admins/logout')
    .then((res) => {
      //?
      router.push({ path: '/' })
    })
    .catch((err) => {
      //?
    })
}
</script>

<template>
  <div class="nav nav--admin">
    <MobileMenuClose :isCrossWhite="true" />
    <div class="nav-grid nav-grid--admin">
      <AppLogo />
      <ul class="plain-ul list list--main list--super list--actions">
        <li
          v-for="[routeName, title] in menu"
          :key="routeName"
          class="plain-li list__item list__item--main list__item--action"
        >
          <router-link :to="routeName" class="plain-link">
            <div
              class="list__item__title-wrapper list__item__title-wrapper--clickable"
              :class="{
                'list__item__title-wrapper--active list__item__title-wrapper--main--active list__item__title-wrapper--action--active':
                  isActiveMenuItem(routeName)
              }"
              @click="useMenuSidebarStore().closeMenuSidebar()"
            >
              <span
                class="nav-span list__item__title list__item__title--main list__item__title--action"
              >
                {{ title }}
              </span>
            </div>
          </router-link>
        </li>
      </ul>
      <ul class="plain-ul list list--main list--super list--account">
        <li class="plain-li list__item list__item--main list__item--account">
          <div
            class="plain-link"
            @click="
              () => {
                useMenuSidebarStore().closeMenuSidebar()
                logOut()
              }
            "
          >
            <div
              class="list__item__title-wrapper list__item__title-wrapper--clickable list__item__title-wrapper--main list__item__title-wrapper--account"
            >
              <img class="list__img list__img--main" src="@/assets/icons/logout.svg" />
              <span
                class="nav-span list__item__title list__item__title--main list__item__title--account"
                >Выйти</span
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.nav--admin {
  background-color: #202020;
}

.nav-grid--admin {
  grid-template-rows: auto max-content min-content;
}

.list--actions {
  grid-row: 1;
  background-color: #202020;
}

.list--account {
  grid-row: 2;
  background-color: #202020;
}

.list__item__title--action {
  color: #fff;
}

.list__item__title--account {
  color: #fff;
}

.list__item__title-wrapper--action--active {
  background-color: #232c61;
}

@media only screen and (min-width: 950px) {
  .nav-grid--admin {
    grid-template-rows: max-content 70% auto;
  }

  .list--actions {
    grid-row: 2;
  }

  .list--account {
    background-color: #232c61;
    grid-row: 3;
  }
}
</style>
