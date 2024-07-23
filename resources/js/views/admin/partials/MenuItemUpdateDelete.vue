<template>
  <BackToPage route="/admin/control-all" />
  <div class="page-content page-content-role">
    <div class="form-wrapper">
      <div class="form-large-title">Изменить группу событий</div>
      <form class="form-role" @submit.prevent="handleSubmit">
        <label>ID (e.g. ssl-certificates, app-store-dates)</label>
        <input :class="{ invalid: routeNameError }" type="text" v-model="routeName" required />

        <label>Название</label>
        <input :class="{ invalid: nameError }" type="text" v-model="name" required />

        <label>Категория</label>
        <select :class="{ invalid: categoryIdError }" v-model="categoryId" required>
          <option
            :selected="optionCategory.id === categoryId"
            v-for="(optionCategory, i) in categories"
            :key="i"
            :value="optionCategory.id"
          >
            {{ optionCategory.name }}
          </option>
        </select>

        <div class="submit-button-wrapper">
          <LoaderCircular v-if="loaderUpdate" />
          <input type="submit" :disabled="!enableSubmit" class="button" value="Внести изменения" />
        </div>
      </form>
      <div class="submit-button-wrapper">
        <LoaderCircular v-if="loaderDelete" />
        <div type="submit" class="button button-delete" @click="deleteThis">Удалить</div>
      </div>
      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackToPage from '../../../components/BackToPage.vue'
import type { Category } from '@/types/category'
import { loadCategories } from '@/types/data'
import LoaderCircular from '@/components/LoaderCircular.vue'
import router from '@/router'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const loaderUpdate = ref<boolean>(false)
const loaderDelete = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const route = useRoute()
let routeNameInitial = ''
const routeName = ref<string>()
let nameInitial = ''
const name = ref<string>()
let categoryIdInitial = 0
const categoryId = ref<number | null>(null)
const categories = ref<Category[]>([])

const nameError = computed(() => {
  if (typeof name.value === 'string') return name.value.length == 0

  return false
})

const routeNameError = computed(() => {
  if (typeof routeName.value === 'string') return routeName.value.length == 0

  return false
})

const categoryIdError = computed(() => {
  if (!categoryId.value && categoryId.value !== null) return true

  return false
})

const enableSubmit = computed(() => {
  return (
    (nameInitial !== name.value && !nameError.value) ||
    (routeNameInitial !== routeName.value && !routeName.value) ||
    (categoryIdInitial !== categoryId.value && !categoryIdError.value)
  )
})

const getCategories = async function () {
  const response = await loadCategories()
  if (response) {
    categories.value = response
  } else {
    messageOnSubmit.value = 'Ошибка'
  }
}

getCategories()

const loadMenuItem = function () {
  loaderUpdate.value = true
  axios
    .get('/api/menu-items/' + route.params.id)
    .then((res) => {
      loaderUpdate.value = false
      name.value = res.data.name
      nameInitial = res.data.name
      routeName.value = res.data.route_name
      routeNameInitial = res.data.route_name
      categoryId.value = res.data.category_id
      categoryIdInitial = res.data.category_id
    })
    .catch((err) => {
      loaderUpdate.value = false
      messageOnSubmit.value = err
    })
}

loadMenuItem()

const handleSubmit = function () {
  loaderUpdate.value = true
  axios
    .put('/api/menu-items/' + route.params.id, {
      name: name.value,
      route_name: routeName.value,
      category_id: categoryId.value
    })
    .then((res) => {
      loaderUpdate.value = false
      messageOnSubmit.value = res.data
    })
    .catch((err) => {
      loaderUpdate.value = false
      messageOnSubmit.value = err
    })
}

const deleteThis = function () {
  loaderDelete.value = true
  axios
    .delete('/api/menu-items/' + route.params.id)
    .then((res) => {
      loaderDelete.value = false
      messageOnSubmit.value = res.data
      router.push('/admin/control-all')
    })
    .catch((err) => {
      loaderDelete.value = false
      messageOnSubmit.value = err
    })
}
</script>

<style>
.form-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
