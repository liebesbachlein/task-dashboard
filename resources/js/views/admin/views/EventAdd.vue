<template>
  <div class="dashboard-section dashboard-section-admin">
    <div class="form-wrapper">
      <div class="form-large-title">Добавить событие</div>
      <form class="form-admin" @submit.prevent="handleSubmit">
        <label>ID (e.g. ssl-certificates, app-store-dates)</label>
        <input :class="{ invalid: routeNameError }" type="text" v-model="routeName" required />

        <label>Название события</label>
        <input :class="{ invalid: nameError }" type="text" v-model="name" required />
        <label>Начало</label>
        <input :class="{ invalid: sinceError }" type="datetime-local" v-model="since" required />
        <label>Конец</label>
        <input :class="{ invalid: untilError }" type="datetime-local" v-model="until" required />

        <label>Категория</label>
        <select :class="{ invalid: categoryIdError }" v-model="categoryId" required>
          <option v-for="(optionCategory, i) in categories" :key="i" :value="optionCategory.id">
            {{ optionCategory.name }}
          </option>
        </select>

        <div class="submit-button-wrapper">
          <Loader v-if="loader" />
          <input type="submit" :disabled="!enableSubmit" class="button" value="Добавить" />
        </div>
      </form>
      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/category'
import { loadCategories } from '@/types/data'
import axios from 'axios'
import { computed, ref } from 'vue'
import Loader from '@/components/Loader.vue'

const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const routeName = ref<string>()
const name = ref<string>()
const since = ref<Date | null>(null)
const until = ref<Date | null>(null)
const categoryId = ref<number | null>(null)
const categories = ref<Category[]>([])

const routeNameError = computed(() => {
  if (typeof routeName.value === 'string') return !/^[a-zA-Z0-9-]+$/.test(routeName.value)
  return false
})

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

const categoryIdError = computed(() => {
  if (!categoryId.value && categoryId.value !== null) return true

  return false
})

const enableSubmit = computed(() => {
  return (
    routeName.value &&
    name.value &&
    since.value &&
    until.value &&
    categoryId.value &&
    until.value > since.value &&
    !nameError.value &&
    !routeNameError.value &&
    !sinceError.value &&
    !untilError.value &&
    !categoryIdError.value
  )
})

const getCategories = async function () {
  const response = await loadCategories()
  if (response) {
    categories.value = response
  } else {
    messageOnSubmit.value = 'Ошибка при выводе категорий'
  }
}

getCategories()

const handleSubmit = function () {
  if (enableSubmit.value) {
    loader.value = true
    const data = {
      route_name: routeName.value,
      name: name.value,
      since: since.value,
      until: until.value,
      additional_info: 'null',
      category_id: categoryId.value,
      menu_item_id: 1
    }

    axios
      .post('/api/menu-items', data)
      .then((res) => {
        messageOnSubmit.value = res.statusText
        loader.value = false
      })
      .catch((err) => {
        messageOnSubmit.value = 'Ошибка'
        loader.value = false
      })
  }
}
</script>

<style></style>
