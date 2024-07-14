<template>
  <BackToPage route="/admin/control-all" />
  <div class="dashboard-section dashboard-section-admin">
    <div class="form-wrapper">
      <div class="form-large-title">Изменить категорию</div>
      <form class="form-admin" @submit.prevent="handleSubmit">
        <label>Название</label>
        <input :class="{ invalid: nameError }" type="text" v-model="name" required />

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
import router from '@/router'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Loader from '@/components/Loader.vue'

const loaderUpdate = ref<boolean>(false)
const loaderDelete = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

let nameInitial = ''
const name = ref<string>()
const route = useRoute()

const nameError = computed(() => {
  if (typeof name.value === 'string') return name.value.length == 0

  return false
})

const enableSubmit = computed(() => {
  return nameInitial !== name.value && !nameError.value
})

const loadCategory = function () {
  loaderUpdate.value = true
  axios
    .get('/api/categories/' + route.params.id)
    .then((res) => {
      name.value = res.data.name
      nameInitial = res.data.name
      loaderUpdate.value = false
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loaderUpdate.value = false
    })
}

loadCategory()

const handleSubmit = function () {
  if (enableSubmit.value) {
    loaderUpdate.value = true
    axios
      .put('/api/categories/' + route.params.id, {
        name: name.value
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
}

const deleteThis = function () {
  loaderDelete.value = true
  axios
    .delete('/api/categories/' + route.params.id)
    .then((res) => {
      loaderDelete.value = false
      messageOnSubmit.value = res.statusText
      router.push('/admin/control-all')
    })
    .catch((err) => {
      loaderDelete.value = false
      messageOnSubmit.value = 'Ошибка'
    })
}
</script>

<style></style>
