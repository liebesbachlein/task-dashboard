<template>
  <div class="main" v-if="eventsDueInMonth.length">
    <div class="event-due" v-for="(event, i) in eventsDueInMonth" :key="i">
      <div class="event-due-name">
        {{ event.eventName }}
      </div>
      <div class="event-due-time">
        {{ getInfo(event.eventDates) }}
      </div>
      <router-link :to="`/${event.routeName}`" class="event-due-link">Перейти</router-link>
    </div>
  </div>
  <div class="main" v-else>
    <div class="main-text">Нет ближайших событий</div>
  </div>
</template>

<script setup lang="ts">
import { getCategories, getEvents, getMenuItems } from '@/data/data'
import type { EventType } from '../../data/event.data'
import { getInfo, isDueIn } from '../../data/time.methods'

type EventDueType = {
  routeName: string
  eventName: string
  eventDates: EventType
}

const getEventsDueInMonth = function (): EventDueType[] {
  const eventsDue: EventDueType[] = []
  const categories = getCategories()
  for (let i = 0; i < categories.length - 1; i++) {
    const menuItems = getMenuItems(categories[i].id)
    for (let j = 0; j < menuItems.length; j++) {
      const events = getEvents(menuItems[j].id)
      for (let k = 0; k < events.length; k++) {
        if (isDueIn(events[k])) {
          eventsDue.push({
            routeName: menuItems[j].routeName,
            eventName: events[k].name,
            eventDates: events[k]
          })
        }
      }
    }
  }
  return eventsDue
}

const eventsDueInMonth: EventDueType[] = getEventsDueInMonth()
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
  border: 1x solid red;
  text-decoration: underline;
  color: var(--accent-color);
}
</style>
