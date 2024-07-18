<template>
  <div class="dashboard-section dashboard-section-role">
    <div class="form-wrapper">
      <div class="form-large-title">Пользователи</div>
      <div class="form-role search-email">
        <div v-if="loader" class="loader-wrapper">
          <CircularLoader :is-blue="true" />
        </div>
        <div class="delete-item" v-for="(account, i) in accounts" :key="i">
          <router-link
            style="text-decoration: underline; color: var(--accent-color)"
            :to="{ name: 'EditEmail', params: { id: account[0].user_id } }"
          >
            {{ account[0].email }}
          </router-link>
          <img @click="deleteUser(account[0].user_id)" src="@/assets/icons/delete.svg" />
        </div>
      </div>
      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import type { Notification } from '@/types/notification'
import CircularLoader from '@/components/CircularLoader.vue'
const search = ref<string>()
const searchOption = ref(0)
const isIconActive = ref(false)

const accounts = ref<Notification[][]>([])
const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const loadAccounts = function () {
  loader.value = true
  axios
    .get('/api/notification/emails')
    .then((res) => {
      accounts.value = res.data
      loader.value = false
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loader.value = false
    })
}

const deleteUser = function (userId: number) {
  loader.value = true
  axios
    .delete('/api/account/' + userId)
    .then((res) => {
      messageOnSubmit.value = res.statusText
      loader.value = false
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loader.value = false
    })
}

loadAccounts()
</script>

<style>
input.search-input {
  width: 100%;
  margin: 0;
}

input.search-input:focus {
  outline: none;
  border: 1px solid #c4dae5;
  background-color: #c4dae5;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.search-email {
}

.search-options-wrapper {
  width: 100%;
  border: 1px solid #c4dae5;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  border-top: none;
}

.search-option {
  width: 100%;
  padding: 12px 14px;
}
</style>
