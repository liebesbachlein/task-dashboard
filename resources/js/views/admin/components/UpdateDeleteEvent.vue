I
<template>
  <div class="form-wrap">
    <form class="form-admin" @submit.prevent="handleSubmit">
      <label>Route name</label>
      <select v-model="menuItemId" required>
        <option
          :selected="optionMenuItem.id === menuItemId"
          v-for="(optionMenuItem, i) in menuItems"
          :key="i"
          :value="optionMenuItem.id"
        >
          {{ optionMenuItem.route_name }}
        </option>
      </select>

      <label>Event name</label>
      <input type="text" v-model="name" required />

      <label>Since</label>
      <input type="datetime-local" v-model="since" required />
      <label>Until</label>
      <input type="datetime-local" v-model="until" required />

      <input :disabled="!check" type="submit" value="Submit" />
      <label v-if="error">{{ error }}</label>
    </form>
    <button @click="deleteThis">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { loadMenuItems } from '@/data/data'
import type { LoadMenuItemType } from '@/data/menu-item.data'
import router from '@/router'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const name = ref<string | undefined>(undefined)
const menuItemId = ref<number | undefined>(undefined)
const menuItems = ref<LoadMenuItemType[]>([])
const success = ref<string>('')
const error = ref<string>('')
const since = ref<Date | undefined>(undefined)
const until = ref<Date | undefined>(undefined)

const getMenuItems = async function () {
  const response = await loadMenuItems()
  if (response) {
    menuItems.value = response
  } else {
    error.value = 'Ошибка при выводе категорий'
  }
}

getMenuItems()

const check = computed(() => {
  if (menuItemId.value && name.value && since.value && until.value && until.value > since.value)
    return true
  else return false
})

const loadEvent = function () {
  axios
    .get('/api/events/' + route.params.id)
    .then((res) => {
      name.value = res.data.name
      menuItemId.value = res.data.menu_item_id
      since.value = res.data.since
      until.value = res.data.until
    })
    .catch((err) => {
      error.value = err
    })
}

loadEvent()

const handleSubmit = function () {
  axios
    .put('/api/events/' + route.params.id, {
      name: name.value,
      menu_item_id: menuItemId.value,
      since: since.value,
      until: until.value,
      additional_info: 'null'
    })
    .then((res) => {
      success.value = res.data
    })
    .catch((err) => {
      error.value = err
    })
}

const deleteThis = function () {
  axios
    .delete('/api/events/' + route.params.id)
    .then((res) => {
      success.value = res.data
      router.push('/admin/all')
    })
    .catch((err) => {
      error.value = err
    })
}
</script>

<style></style>
