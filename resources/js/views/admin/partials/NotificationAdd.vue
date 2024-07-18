<template>
  <div class="dashboard-section dashboard-section-role">
    <div class="form-wrapper">
      <div class="form-large-title">Добавить уведомление</div>
      <form class="form-role" @submit.prevent="handleSubmit">
        <label>Email</label>
        <input
          id="email"
          name="email"
          :class="{ invalid: emailError }"
          type="email"
          v-model="email"
          required
        />

        <label>Событие</label>
        <select :class="{ invalid: eventIdError }" v-model="eventId" required>
          <optgroup
            v-for="category in minimiseData(data)"
            :key="category.category_data.id"
            :label="category.category_data.name"
          >
            <option v-for="(optionEvent, i) in category.events" :key="i" :value="optionEvent.id">
              {{ optionEvent.name }}
            </option>
          </optgroup>
        </select>

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
import { type Event, type LoadRawEvent } from '@/types/event'
import CircularLoader from '@/components/CircularLoader.vue'
import { useFetchAllData } from '@/composables/useFetch'
import type { Category, LoadRawCategory } from '@/types/category'

const { data, loader, messageOnSubmit } = useFetchAllData()

const email = ref<string>()

const eventId = ref<number | null>(null)

const eventIdError = computed(() => {
  if (!eventId.value && eventId.value !== null) return true

  return false
})

const emailError = computed(() => {
  if (typeof email.value === 'string') return email.value.length == 0 || !validateEmail(email.value)

  return false
})

const enableSubmit = computed(() => {
  return email.value && eventId.value && !eventIdError.value && !emailError.value
})

const validateEmail = function (email: string) {
  if (
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return true
  } else {
    return false
  }
}

const handleSubmit = function () {
  if (enableSubmit.value) {
    loader.value = true
    axios
      .post('/api/notification', {
        email: email.value,
        event_id: eventId.value
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

type LoadMinimalCategory = {
  category_data: Category
  events: LoadRawEvent[]
}

const minimiseData = function (rawData: LoadRawCategory[]): LoadMinimalCategory[] {
  const newData: LoadMinimalCategory[] = []
  for (let i = 0; i < rawData.length; i++) {
    const menuItems = rawData[i].menu_items
    const eventsTotal: LoadRawEvent[] = []
    for (let j = 0; j < menuItems.length; j++) {
      const events = rawData[i].menu_items[j].events
      for (let k = 0; k < events.length; k++) {
        eventsTotal.push(events[k])
      }
    }
    newData.push({
      category_data: rawData[i].category_data,
      events: eventsTotal
    })
  }
  return newData
}
</script>

<style></style>
