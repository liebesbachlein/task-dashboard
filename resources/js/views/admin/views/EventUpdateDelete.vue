<template>
  <BackToPage route="/admin/control-all" />
  <div class="dashboard-section dashboard-section-role">
    <div class="form-wrapper">
      <div class="form-large-title">Изменить событие</div>
      <form class="form-role" @submit.prevent="handleSubmit">
        <label>ID (e.g. ssl-certificates, app-store-dates)</label>
        <select :class="{ invalid: menuItemIdError }" v-model="menuItemId" required>
          <option
            :selected="optionMenuItem.id === menuItemId"
            v-for="(optionMenuItem, i) in menuItems"
            :key="i"
            :value="optionMenuItem.id"
          >
            {{ optionMenuItem.route_name }}
          </option>
        </select>

        <label>Название</label>
        <input :class="{ invalid: nameError }" type="text" v-model="name" required />

        <label>Начало</label>
        <input :class="{ invalid: sinceError }" type="datetime-local" v-model="since" required />
        <label>Конец</label>
        <input :class="{ invalid: untilError }" type="datetime-local" v-model="until" required />

        <div class="submit-button-wrapper">
          <Loader v-if="loaderUpdate" />
          <input type="submit" :disabled="!enableSubmit" class="button" value="Внести изменения" />
        </div>
      </form>
      <div class="submit-button-wrapper">
        <Loader v-if="loaderDelete" />
        <div type="submit" class="button button-delete" @click="deleteThis">Удалить</div>
      </div>
      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackToPage from '../components/BackToPage.vue'
import { loadMenuItems } from '@/types/data'
import type { MenuItem } from '@/types/menu-item'
import Loader from '@/components/Loader.vue'
import router from '@/router'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const loaderUpdate = ref<boolean>(false)
const loaderDelete = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const route = useRoute()
let nameInitial = ''
const name = ref<string>()
let menuItemIdInitial = 0
const menuItemId = ref<number | null>(null)
const menuItems = ref<MenuItem[]>([])
let sinceInitial: Date = new Date()
const since = ref<Date | null>(null)
let untilInitial: Date = new Date()
const until = ref<Date | null>(null)

const nameError = computed(() => {
  if (typeof name.value === 'string') return name.value.length == 0

  return false
})

const sinceError = computed(() => {
  if (!since.value && since.value !== null) return true
  return false
})

const untilError = computed(() => {
  if (!until.value && until.value !== null) return true

  if (since.value && until.value && since.value > until.value) return true

  return false
})

const menuItemIdError = computed(() => {
  if (!menuItemId.value && menuItemId.value !== null) return true

  return false
})

const enableSubmit = computed(() => {
  return (
    (nameInitial !== name.value && !nameError.value) ||
    (sinceInitial !== since.value && !sinceError.value) ||
    (untilInitial !== until.value && !untilError.value) ||
    (menuItemIdInitial !== menuItemId.value && !menuItemIdError.value)
  )
})

const getMenuItems = async function () {
  const response = await loadMenuItems()
  if (response) {
    menuItems.value = response
  } else {
    messageOnSubmit.value = 'Ошибка'
  }
}

getMenuItems()

const loadEvent = function () {
  loaderUpdate.value = true
  axios
    .get('/api/events/' + route.params.id)
    .then((res) => {
      name.value = res.data.name
      nameInitial = res.data.name
      menuItemId.value = res.data.menu_item_id
      menuItemIdInitial = res.data.menu_item_id
      since.value = res.data.since
      sinceInitial = res.data.since
      until.value = res.data.until
      untilInitial = res.data.until
      loaderUpdate.value = false
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loaderUpdate.value = false
    })
}

loadEvent()

const handleSubmit = function () {
  loaderUpdate.value = true
  axios
    .put('/api/events/' + route.params.id, {
      name: name.value,
      menu_item_id: menuItemId.value,
      since: since.value,
      until: until.value,
      additional_info: 'null'
    })
    .then((res) => {
      messageOnSubmit.value = res.statusText
      loaderUpdate.value = false
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loaderUpdate.value = false
    })
}

const deleteThis = function () {
  loaderDelete.value = true
  axios
    .delete('/api/events/' + route.params.id)
    .then((res) => {
      messageOnSubmit.value = res.statusText
      loaderDelete.value = false
      router.push('/admin/control-all')
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loaderDelete.value = false
    })
}
</script>

<style></style>
