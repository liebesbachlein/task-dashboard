I
<template>
  <div class="form-wrap">
    <form class="form-admin" @submit.prevent="handleSubmit">
      <label>Route name</label>
      <input type="text" v-model="routeName" required />

      <label>Menu item name</label>
      <input type="text" v-model="name" required />

      <label>Category</label>
      <select v-model="categoryId" required>
        <option
          :selected="optionCategory.id === categoryId"
          v-for="(optionCategory, i) in categories"
          :key="i"
          :value="optionCategory.id"
        >
          {{ optionCategory.name }}
        </option>
      </select>

      <input :disabled="!check" type="submit" value="Submit" />
      <label v-if="error">{{ error }}</label>
    </form>
    <button @click="deleteThis">Delete</button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryType } from '@/data/category.data'
import { loadCategories } from '@/data/data'
import router from '@/router'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeName = ref<string | undefined>(undefined)
const name = ref<string | undefined>(undefined)
const categoryId = ref<number | undefined>(undefined)
const categories = ref<CategoryType[]>([])
const success = ref<string>('')
const error = ref<string>('')

const getCategories = async function () {
  const response = await loadCategories()
  if (response) {
    categories.value = response
  } else {
    error.value = 'Ошибка при выводе категорий'
  }
}

getCategories()

const check = computed(() => {
  if (routeName.value && name.value && categoryId.value) return true
  else return false
})

const loadMenuItem = function () {
  axios
    .get('/api/menu-items/' + route.params.id)
    .then((res) => {
      name.value = res.data.name
      routeName.value = res.data.route_name
      categoryId.value = res.data.category_id
    })
    .catch((err) => {
      error.value = err
    })
}

loadMenuItem()

const handleSubmit = function () {
  axios
    .post('/api/menu-items/' + route.params.id, {
      name: name.value,
      route_name: routeName.value,
      category_id: categoryId.value
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
    .delete('/api/menu-items/' + route.params.id)
    .then((res) => {
      success.value = res.data
      router.push('/admin/all')
    })
    .catch((err) => {
      error.value = err
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
