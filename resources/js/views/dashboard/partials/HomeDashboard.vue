<script setup lang="ts">
import { getInfo, isDueIn } from '@/types/time.methods'
import type { LoadRawCategory } from '@/types/category'
import type { PropType } from 'vue'
import { normalizeRawData, type Event } from '@/types/event'

const props = defineProps({
  allData: { type: Array as PropType<LoadRawCategory[]>, required: true },
  componentData: { required: false },
  loader: { Boolean, required: true }
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

<template>
  <template v-if="props.loader">
    <div class="page-title page-load" />
    <ul class="plain-ul home-list">
      <li class="plain-li home-list__item page-load">
        <div class="home-list__item__name page-load" />
        <div class="home-list__item__time page-load" />
      </li>
    </ul>
  </template>
  <template v-else>
    <div class="page-title">Истекут в течении 30 дней</div>
    <ul class="plain-ul home-list" v-if="getEventsDueInMonth(props.allData).length > 0">
      <li
        class="plain-li home-list__item"
        v-for="(eventDue, i) in getEventsDueInMonth(props.allData).sort((a, b) => {
          if (a.event.until.getTime() < b.event.until.getTime()) return -1
          if (a.event.until.getTime() > b.event.until.getTime()) return 1
          else return 0
        })"
        :key="i"
      >
        <div class="home-list__item__name">
          {{ eventDue.event.name }}
        </div>
        <div class="home-list__item__time">
          {{ getInfo(eventDue.event) }}
        </div>
        <router-link :to="`/${eventDue.routeName}`" class="plain-link home-list__item__link"
          >Перейти</router-link
        >
      </li>
    </ul>
    <div class="home-list" v-else>Нет ближайших событий</div>
  </template>
</template>

<style>
.home-list__item {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: auto max-content;
  grid-template-rows: auto auto;
}

.home-list__item__name {
  grid-row: 1;
  grid-column: 1;
  margin-bottom: 1rem;
}

.home-list__item__time {
  grid-row: 2;
  grid-column: 1;
}

.home-list__item__link {
  grid-row: 1;
  grid-column: 2;
  text-decoration: underline;
  color: var(--accent-color);
}

.home-list__item.page-load {
  margin-bottom: 0;
}

.home-list__item__name.page-load,
.home-list__item__time.page-load {
  width: 80%;
  height: 1.75rem;
  border-radius: 0.25rem;
  margin: 0.25rem;
  background: linear-gradient(90deg, #e1e2ffa2 40%, #eeefffa2 50%, #e1e2ffa2 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: loading-shimmer-short 1s infinite linear;
}

@media only screen and (min-width: 950px) {
  .home-list__item__name.page-load,
  .home-list__item__time.page-load {
    width: 50%;
  }
}
</style>
