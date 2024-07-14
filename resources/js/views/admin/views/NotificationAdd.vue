<template>
  <div class="dashboard-section dashboard-section-admin">
    <div class="form-wrapper">
      <div class="form-large-title">Добавить уведомление</div>
      <form class="form-admin" @submit.prevent="handleSubmit">
        <label>Email/-ы</label>
        <textarea :class="{ invalid: emailError }" type="text" v-model="email" required />

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
import axios from 'axios'
import { ref, computed } from 'vue'
import Loader from '@/components/Loader.vue'

const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const email = ref<string>()

const emailError = computed(() => {
  if (typeof email.value === 'string') return email.value.length == 0

  return false
})

const enableSubmit = computed(() => {
  return email.value && !emailError.value
})

const handleSubmit = function () {
  if (enableSubmit.value) {
    loader.value = true
    axios
      .post('/api/categories', {
        name: email.value
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
