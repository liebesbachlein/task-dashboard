<template>
  <div class="form-wrap">
    <form class="form-admin" @submit.prevent="handleSubmit">
      <label>Category name</label>
      <input type="text" v-model="name" required />

      <input type="submit" value="Submit" />
      <label v-if="success">Success: {{ success }}</label>
      <label v-if="error">Error: {{ error }}</label>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const name = ref<string>('')
const error = ref<string>('')
const success = ref<string>('')

const handleSubmit = function () {
  axios
    .post('/api/categories', {
      name: name.value
    })
    .then((res) => {
      success.value = res.statusText
    })
    .catch((err) => {
      error.value = err
    })
}
</script>

<style></style>
