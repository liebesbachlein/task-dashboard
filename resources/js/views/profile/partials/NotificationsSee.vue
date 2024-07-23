<script setup lang="ts">
import type { LoadRawEvent } from '@/types/event'
import axios from 'axios'
import { getCurrentInstance, ref, watch, type PropType } from 'vue'
import type { Notification } from '@/types/notification'

const props = defineProps({
  whoIsUser: {
    type: Object as PropType<{
      email: string
      id: string
    }>,
    required: true
  }
})

type Check = {
  notification: Notification
  event: LoadRawEvent
}

const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const notifications = ref<Check[]>([])

const getNotifications = function () {
  loader.value = true
  axios
    .get('/api/user/notification/emails/' + props.whoIsUser.id)
    .then((res) => {
      notifications.value = res.data
      loader.value = false
    })
    .catch((err) => {
      messageOnSubmit.value = 'Ошибка'
      loader.value = false
    })
}

watch(props.whoIsUser, getNotifications)

if (props.whoIsUser) {
  getNotifications()
}

const deleteThis = function (id: number) {
  loader.value = true
  axios
    .delete('/api/user/notification/' + id)
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

<template>
  <div class="page-content page-content-role">
    <div class="form-wrapper">
      <div class="form-large-title">Активные уведомления</div>
      <div class="form-role search-email">
        <template v-if="loader">
          <div class="event-load" />
          <div class="event-load" />
          <div class="event-load" />
        </template>
        <template v-else>
          <div
            class="delete-item"
            v-for="(notification, i) in notifications.filter((e) => e !== undefined)"
            :key="i"
          >
            <span>{{ notification?.event?.name }}</span>
            <img
              @click="deleteThis(notification?.notification.id)"
              src="@/assets/icons/delete.svg"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.delete-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
}

.delete-item span {
}

.delete-item img {
  height: 1.5rem;
}

.event-load {
  background: linear-gradient(90deg, #e1e2ffa2 40%, #eeefffa2 50%, #e1e2ffa2 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: status-shimmer-long 1s infinite linear;

  height: 2rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
</style>
