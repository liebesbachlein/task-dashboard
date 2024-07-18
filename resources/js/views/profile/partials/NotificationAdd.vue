<template>
  <div class="dashboard-section dashboard-section-role">
    <div class="form-wrapper">
      <div class="form-large-title">Добавить уведомление</div>

      <form class="form-role" @submit.prevent="handleSubmit">
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
import { ref, computed, type PropType } from 'vue'
import { type Event, type LoadRawEvent } from '@/types/event'
import CircularLoader from '@/components/CircularLoader.vue'
import { useFetchAllData } from '@/composables/useFetch'
import type { Category, LoadRawCategory } from '@/types/category'

const { data, loader, messageOnSubmit } = useFetchAllData()

const props = defineProps({
  whoIsUser: {
    type: Object as PropType<{
      email: string
      id: string
    }>,
    required: true
  }
})

const eventId = ref<number | null>(null)

const eventIdError = computed(() => {
  if (!eventId.value && eventId.value !== null) return true

  return false
})

const enableSubmit = computed(() => {
  return eventId.value && !eventIdError.value && props.whoIsUser.email
})

const handleSubmit = function () {
  if (enableSubmit.value) {
    loader.value = true
    axios
      .post('/api/user/notification', {
        email: props.whoIsUser.email,
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
