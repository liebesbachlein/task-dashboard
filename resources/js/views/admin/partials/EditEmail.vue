<template>
  <BackToPage route="/admin/search-email" />
  <div class="page-content page-content-role">
    <div class="form-wrapper">
      <div class="form-large-title">
        Уведомления
        {{ notifications && notifications[0] ? notifications[0].notification.email : '' }}
      </div>
      <div v-if="loader" class="loader-wrapper">
        <LoaderCircular :is-blue="true" />
      </div>
      <div class="form-role search-email">
        <div class="delete-item" v-for="(notification, i) in notifications" :key="i">
          <span>{{ notification.event.name }}</span>
          <img @click="deleteThis(notification?.notification.id)" src="@/assets/icons/delete.svg" />
        </div>
      </div>

      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackToPage from '../../../components/BackToPage.vue'
import { loadMenuItems } from '@/types/data'
import type { MenuItem } from '@/types/menu-item'
import LoaderCircular from '@/components/LoaderCircular.vue'
import router from '@/router'
import axios from 'axios'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Notification } from '@/types/notification'
import type { LoadRawEvent } from '@/types/event'

type Check = {
  notification: Notification
  event: LoadRawEvent
}

const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')
const route = useRoute()

const notifications = ref<Check[]>()

const getNotifications = function () {
  loader.value = true
  const userId = route.params.id
  axios
    .get('/api/notification/emails/' + userId)
    .then((res) => {
      notifications.value = res.data
      loader.value = false
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loader.value = false
    })
}

getNotifications()

const deleteThis = function (id: number) {
  loader.value = true
  axios
    .delete('/api/notification/' + id)
    .then((res) => {
      console.log(res)
      messageOnSubmit.value = res.statusText
      loader.value = false
      getCurrentInstance()?.update()
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loader.value = false
    })
}
</script>

<style></style>
