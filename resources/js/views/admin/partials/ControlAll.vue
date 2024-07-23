<template>
  <div class="page-content page-content-role">
    <div class="admin-controll-all">
      <div v-if="loader" class="loader-wrapper">
        <LoaderCircular :isBlue="true" />
      </div>
      <ul class="admin-show-all-item" v-for="category in data" :key="category.category_data.id">
        <li>
          <router-link
            :to="'/admin/control-all/categories/' + category.category_data.id"
            style="margin-left: 0"
          >
            <span>Категория: </span>{{ category.category_data.name }}
          </router-link>
        </li>
        <ul
          class="all-menu-items"
          v-for="menuItem in category.menu_items"
          :key="menuItem.menu_item_data.id"
        >
          <li>
            <router-link :to="'/admin/control-all/menu-items/' + menuItem.menu_item_data.id">
              <span>Группа событий: </span>{{ menuItem.menu_item_data.name }}
            </router-link>
          </li>
          <ul class="all-events" v-for="event in menuItem.events" :key="event.id">
            <li>
              <router-link :to="'/admin/control-all/events/' + event.id"
                ><span>Событие: </span>{{ event.name }}
              </router-link>
            </li>
          </ul>
        </ul>
      </ul>
      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoaderCircular from '@/components/LoaderCircular.vue'
import { useFetchAllData } from '@/composables/useFetch'

const { data, loader, messageOnSubmit } = useFetchAllData()
</script>

<style>
ul.admin-show-all-item {
  display: block;
  list-style-type: none;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-start: 0;
}

ul.admin-show-all-item {
  margin-bottom: 1rem;
}

ul.all-menu-items {
  margin: 0.5rem 0;
}

ul {
  list-style-type: none;
}

.admin-controll-all * {
  font-size: 1.125rem;
}

.admin-controll-all {
  align-items: flex-start;
}

.admin-show-all-item > li {
  list-style-type: none;
}

.admin-controll-all span {
  color: var(--accent-color);
}

@media only screen and (min-width: 950px) {
  .admin-controll-all {
    min-height: 50vh;
  }

  .admin-controll-all .loader-wrapper {
    min-height: 50vh;
  }
}
</style>
