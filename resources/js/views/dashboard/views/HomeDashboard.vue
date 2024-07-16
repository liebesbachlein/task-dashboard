<template>
  <div class="dashboard-section-title">Истекут в течении 30 дней</div>
  <div class="main" v-if="getEventsDueInMonth(props.allData)">
    <div class="event-due" v-for="(eventDue, i) in getEventsDueInMonth(props.allData)" :key="i">
      <div class="event-due-name">
        {{ eventDue.event.name }}
      </div>
      <div class="event-due-time">
        {{ getInfo(eventDue.event) }}
      </div>
      <router-link :to="`/${eventDue.routeName}`" class="event-due-link">Перейти</router-link>
    </div>
  </div>
  <div class="main" v-else></div>
</template>

<script setup lang="ts">
import { getInfo, isDueIn } from '@/types/time.methods'
import type { LoadRawCategory } from '@/types/category'
import type { PropType } from 'vue'
import { normalizeRawData, type Event } from '@/types/event'

const props = defineProps({
  allData: { type: Array as PropType<LoadRawCategory[]>, required: true },
  componentData: { required: false }
})

type EventDue = {
  routeName: string
  event: Event
}

const getEventsDueInMonth = function (data: LoadRawCategory[]): EventDue[] {
  const eventsDue: EventDue[] = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].menu_items.length; j++) {
      const events = normalizeRawData(data[i].menu_items[j])
      const routeName = data[i].menu_items[j].menu_item_data.route_name
      for (let k = 0; k < events.length; k++) {
        if (isDueIn(events[k])) {
          eventsDue.push({
            routeName: routeName,
            event: {
              id: events[k].id,
              menu_item_id: events[k].menu_item_id,
              name: events[k].name,
              since: events[k].since,
              until: events[k].until
            }
          })
        }
      }
    }
  }
  return eventsDue
}
</script>

<style>
.event-due {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: auto max-content;
  grid-template-rows: auto auto;
}

.event-due-name {
  grid-row: 1;
  grid-column: 1;
  margin-bottom: 1rem;
}

.event-due-time {
  grid-row: 2;
  grid-column: 1;
}

.event-due-link {
  grid-row: 1;
  grid-column: 2;
  text-decoration: underline;
  color: var(--accent-color);
}
</style>
