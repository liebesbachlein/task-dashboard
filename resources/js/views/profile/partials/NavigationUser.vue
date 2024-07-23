<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import MobileMenuClose from '@/components/MobileMenuClose.vue'
import router from '@/router'
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'
import axios from 'axios'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'

const menu: string[][] = [
  ['/user/home', 'Все уведомления'],
  ['/user/add-notification', 'Добавить уведомление']
]

const props = defineProps({
  whoIsUser: {
    type: Object as PropType<{
      email: string
      id: string
    }>,
    required: true
  },
  loader: {
    type: Boolean,
    required: true
  }
})

const route = useRoute()

const isActiveMenuItem = function (routeName: string) {
  if (routeName && route.path.startsWith(routeName)) return true
  return false
}

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

<template>
  <div class="nav nav--user">
    <MobileMenuClose :isCrossWhite="true" />
    <div class="nav-grid nav-grid--user">
      <AppLogo />
      <ul class="plain-ul list list--main list--super list--actions--user">
        <li v-if="loader" class="plain-li list__item list__item--main list__item--action--user">
          <div class="list__item__title-wrapper--category nav-load nav-load--category" />
        </li>
        <li v-else class="plain-li list__item list__item--main list__item--action--user">
          <div class="list__item__title-wrapper list__item__title-wrapper--clickable">
            <span
              class="nav-span list__item__title list__item__title--main list__item__title--action--user"
              style="color: #232c61"
              >{{ props.whoIsUser.email }}</span
            >
          </div>
        </li>
        <li
          v-for="[routeName, title] in menu"
          :key="routeName"
          class="plain-li list__item list__item--main list__item--action--user"
        >
          <router-link :to="routeName" class="plain-link">
            <div
              class="list__item__title-wrapper list__item__title-wrapper--clickable"
              :class="{
                'list__item__title-wrapper--active list__item__title-wrapper--main--active list__item__title-wrapper--action--user--active':
                  isActiveMenuItem(routeName)
              }"
              @click="useMenuSidebarStore().closeMenuSidebar()"
            >
              <span
                class="nav-span list__item__title list__item__title--main list__item__title--action--user"
              >
                {{ title }}
              </span>
            </div>
          </router-link>
        </li>
      </ul>
      <ul class="plain-ul list list--main list--super list--account--user">
        <li class="plain-li list__item list__item--main list__item--account--user">
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
              class="list__item__title-wrapper list__item__title-wrapper--clickable list__item__title-wrapper--main list__item__title-wrapper--account--user"
            >
              <img class="list__img list__img--main" src="@/assets/icons/logout.svg" />
              <span
                class="nav-span list__item__title list__item__title--main list__item__title--account--user"
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
.nav--user {
  background-color: #7d7575;
}

.nav-grid--user {
  grid-template-rows: auto max-content min-content;
}

.list--actions--user {
  grid-row: 1;
  background-color: #7d7575;
}

.list--account--user {
  grid-row: 2;
  background-color: #7d7575;
}

.list__item__title-wrapper--action--user--active {
  background-color: rgb(71, 109, 21);
}

.list__item__title-wrapper--account--user--active {
  background-color: #232c61;
}

.list__item__title--action--user {
  color: #000;
}

.list__item__title--account--user {
  color: #000;
}

@media only screen and (min-width: 950px) {
  .nav-grid--user {
    grid-template-rows: max-content 70% auto;
  }

  .nav--user {
    background-color: #fff;
  }

  .list--actions--user {
    grid-row: 2;
    background-color: #fff;
  }

  .list--account--user {
    background-color: rgb(71, 109, 21);
    grid-row: 3;
  }

  .list__item__title--action--user {
    color: #000;
  }

  .list__item__title-wrapper--action--user--active .list__item__title--action--user {
    color: #fff;
  }

  .list__item__title--account--user {
    color: #fff;
  }

  .list__item__title-wrapper--account--user--active .list__item__title--account--user {
    color: #000;
  }

  .list__item__title-wrapper--account--user--active {
    background-color: rgb(71, 109, 21);
  }
}
</style>
