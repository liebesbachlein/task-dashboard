<template>
  <div v-if="isAddCategoryPopUp">
    <div class="backdrop" style="z-index: 50" @click.self="closeAddCategoryPopUp">
      <form
        class="form-admin"
        @submit.prevent="handleSubmitNewCategory"
        style="z-index: 100; width: fit-content; background-color: #fff"
      >
        <label>Category name</label>
        <input type="text" v-model="newCategoryName" required />

        <input type="submit" value="Submit" />
        <label v-if="newCategorySuccess">Success: {{ newCategorySuccess }}</label>
        <label v-if="newCategoryError">Error: {{ newCategoryError }}</label>
      </form>
    </div>
  </div>
  <div class="form-wrap">
    <form class="form-admin" @submit.prevent="handleSubmit">
      <label>Route name</label>
      <input type="text" v-model="routeName" required />
      <!--<label v-if="isUniqueRouteName">Not unique</label>-->

      <label>Event Name</label>
      <input type="text" v-model="name" required />
      <label>Since</label>
      <input type="datetime-local" v-model="since" required />
      <label>Until</label>
      <input type="datetime-local" v-model="until" required />

      <label>Category</label>
      <select v-model="categoryId" required>
        <option v-for="(optionCategory, i) in categories" :key="i" :value="optionCategory.id">
          {{ optionCategory.name }}
        </option>
      </select>
      <button @click="addCategoryPopUp">Add category</button>

      <input :disabled="!check" type="submit" value="Submit" />
      <label v-if="error">{{ error }}</label>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CategoryType } from '@/data/category.data'
import { loadCategories } from '@/data/data'
import axios from 'axios'
import { computed, ref } from 'vue'

const routeName = ref<string | undefined>(undefined)
const name = ref<string | undefined>(undefined)
const since = ref<Date | undefined>(undefined)
const until = ref<Date | undefined>(undefined)
const categoryId = ref<number | undefined>(undefined)
const categories = ref<CategoryType[]>([])
const success = ref<string>('')
const error = ref<string>('')
const newCategorySuccess = ref<string>('')
const newCategoryError = ref<string>('')
const newCategoryName = ref<string | undefined>(undefined)
const isAddCategoryPopUp = ref<boolean>(false)

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
  if (
    routeName.value &&
    name.value &&
    since.value &&
    until.value &&
    categoryId.value &&
    until.value > since.value
  )
    return true
  else return false
})

const handleSubmitNewCategory = function () {
  axios
    .post('/api/categories', {
      name: newCategoryName.value
    })
    .then((res) => {
      newCategorySuccess.value = res.statusText
      getCategories()
    })
    .catch((err) => {
      newCategorySuccess.value = err
    })
}

const addCategoryPopUp = function () {
  isAddCategoryPopUp.value = true
}

const closeAddCategoryPopUp = function () {
  isAddCategoryPopUp.value = false
  newCategoryError.value = ''
  newCategorySuccess.value = ''
  newCategoryName.value = undefined
}

const handleSubmit = function () {
  if (check.value) {
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
        success.value = res.statusText
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        error.value = err
      })
  }
}
</script>

<style>
.backdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.466);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
