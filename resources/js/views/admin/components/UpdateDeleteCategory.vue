I
<template>
  <div class="form-wrap">
    <form class="form-admin" @submit.prevent="handleSubmit">
      <label>Category name</label>
      <input type="text" v-model="name" required />

      <input type="submit" value="Submit" />
      <label v-if="success">Success: {{ success }}</label>
      <label v-if="error">Error: {{ error }}</label>
    </form>
    <button @click="deleteThis">Delete</button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const name = ref<string>('')
const error = ref<string>('')
const success = ref<string>('')
const route = useRoute()

const loadCategory = function () {
  axios
    .get('/api/categories/' + route.params.id)
    .then((res) => {
      name.value = res.data.name
    })
    .catch((err) => {
      error.value = err
    })
}

loadCategory()

const handleSubmit = function () {
  axios
    .post('/api/categories/' + route.params.id, {
      name: name.value
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
    .delete('/api/categories/' + route.params.id)
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
