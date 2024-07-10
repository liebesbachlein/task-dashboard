<template>
  <div />
  <div class="all-info">
    <ul class="all-categories" v-for="category in all" :key="category.category_data.id">
      <li>
        <router-link :to="'/admin/categories/' + category.category_data.id">
          Категория: {{ category.category_data.name }}
        </router-link>
      </li>
      <ul
        class="all-menu-items"
        v-for="menuItem in category.menu_items"
        :key="menuItem.menu_item_data.id"
      >
        <li>
          <router-link :to="'/admin/menu-items/' + menuItem.menu_item_data.id">
            Группа событий: {{ menuItem.menu_item_data.name }}
          </router-link>
        </li>
        <ul class="all-events" v-for="event in menuItem.events" :key="event.id">
          <li>
            <router-link :to="'/admin/events/' + event.id"> Событие: {{ event.name }} </router-link>
          </li>
        </ul>
      </ul>
    </ul>
    <div>{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryType } from '@/data/category.data'
import type { EventType } from '@/data/event.data'
import type { MenuItemType } from '@/data/menu-item.data'
import axios from 'axios'
import { ref } from 'vue'

type GetCategoryType = {
  category_data: CategoryType
  menu_items: GetMenuItemType[]
}

type GetMenuItemType = {
  menu_item_data: MenuItemType
  events: EventType[]
}

const all = ref<GetCategoryType[]>([])
const error = ref<string>('')

axios
  .get('/api/all')
  .then((res) => {
    all.value = res.data
  })
  .catch((err) => {
    error.value = err
  })
</script>

<style>
.all-info li {
  text-decoration: underline;
  color: blue;
}
</style>
