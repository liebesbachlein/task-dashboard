<template>
  <div class="dashboard-section dashboard-section-role">
    <div class="form-wrapper">
      <div class="form-large-title">Добавить категорию</div>
      <form class="form-role" @submit.prevent="handleSubmit">
        <label>Название категории</label>
        <input :class="{ invalid: nameError }" type="text" v-model="name" required />

        <div class="submit-button-wrapper">
          <CircularLoader v-if="loader" />
          <input type="submit" :disabled="!enableSubmit" class="button" value="Добавить" />
        </div>
      </form>
      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, computed } from 'vue'
import CircularLoader from '@/components/CircularLoader.vue'

const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const name = ref<string>()

const nameError = computed(() => {
  if (typeof name.value === 'string') return name.value.length == 0

  return false
})

const enableSubmit = computed(() => {
  return name.value && !nameError.value
})

const handleSubmit = function () {
  if (enableSubmit.value) {
    loader.value = true
    axios
      .post('/api/categories', {
        name: name.value
      })
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
