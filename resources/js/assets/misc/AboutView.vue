<template>
  <div />
  <!--<form @submit.prevent="handleSubmit">
    <label>Имя</label>
    <input id="name" :readonly="isSuccess === true" v-model="data.name" type="text" />
    <br />
    <label>Дата рождения</label>
    <input id="birth_date" :readonly="isSuccess === true" v-model="data.birth_date" type="date" />
    <br />
    <input :disabled="isSuccess !== null" type="submit" :value="getSubmitValue()" />
  </form>-->
</template>

<script setup lang="ts">
/*import type { SaveItemType } from '@/models/item.data'
import { SERVER_URL } from '@/var'
import axios from 'axios'
import { ref } from 'vue'

const data = ref<SaveItemType>({
  name: null,
  birth_date: null
})
const isSuccess = ref<boolean | null>(null)

const getSubmitValue = function (): string {
  return isSuccess.value === null ? 'Отправить' : isSuccess.value === true ? 'Отправлено' : 'Ошибка'
}

const handleSubmit = function (): void {
  if (data.value.name && data.value.birth_date) {
    axios
      .post(
        SERVER_URL + '/api/items',
        {
          name: data.value.name,
          birth_date: data.value.birth_date
        },
        {
          headers: {
            'Content-Type': 'application/json'
            ///'X-CSRF-TOKEN': ('meta[name="csrf-token"]').attr('content')
          }
        }
      )
      .then((response) => {
        console.log(response)
        isSuccess.value = true
      })
      .catch((err) => {
        console.log(err)
        isSuccess.value = false
      })
  }
}*/
</script>

<style></style>
