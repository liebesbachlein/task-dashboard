<script setup lang="ts">
import { onMounted, onUpdated } from 'vue'
import { type Event, normalizeRawData } from '@/types/event'
import type { LoadRawMenuItem } from '@/types/menu-item'
import { getInfo, getDateString } from '@/types/time.methods'
import type { LoadRawCategory } from '@/types/category'

interface Props {
  componentData: LoadRawMenuItem
  allData?: LoadRawCategory[]
  loader: boolean
}

const props = defineProps<Props>()

function getColor(ratio: number, since: Date, until: Date) {
  const differenceInYears = (until.getTime() - since.getTime()) / (1000 * 60 * 60 * 24 * 365)
  const hueConstant = 120
  let hue = 0

  if (differenceInYears > 5) hue = (hueConstant * Math.log(2 - ratio)) / Math.log(2)
  else hue = 120 * Math.cos(ratio * 0.5 * Math.PI)

  return ['hsl(', hue.toString(10), ',100%,50%)'].join('')
}

function getRatio(since: Date, until: Date): number {
  const currentTime: number = new Date(Date.now()).getTime()

  if (since.getTime() >= until.getTime() || currentTime >= until.getTime()) return 1

  if (currentTime <= since.getTime()) return 0

  const ratio: number = (currentTime - since.getTime()) / (until.getTime() - since.getTime())

  if (ratio >= 0.97) return 1

  if (ratio <= 0.05) return 0.05

  return ratio
}

function makeStatusBar() {
  const normalData = normalizeRawData(props.componentData)
  for (let i = 0; i < normalData.length; i++) {
    const event: Event = normalData[i]
    const totalBar = document.getElementById(`${event.id}-total`)
    const pastBar = document.getElementById(`${event.id}-past`)
    const totalWidth: number = totalBar?.offsetWidth ?? 0
    const ratio = getRatio(event.since, event.until)
    if (pastBar) {
      if (ratio >= 1) {
        pastBar.style.width = `${totalWidth}px`
        pastBar.style.borderRadius = '0.5rem'
      } else {
        pastBar.style.width = `${totalWidth * ratio}px`
        pastBar.style.borderTopLeftRadius = '0.5rem'
        pastBar.style.borderTopRightRadius = '0rem'
        pastBar.style.borderBottomLeftRadius = '0.5rem'
        pastBar.style.borderBottomRightRadius = '0rem'
      }
      pastBar.style.backgroundColor = getColor(ratio, event.since, event.until)
    }
  }
}

onMounted(() => {
  makeStatusBar()
})

onUpdated(() => {
  makeStatusBar()
})
</script>

<template>
  <!--Loader elements-->
  <template v-if="props.loader">
    <div class="page-title page-load" />
    <div class="status-list">
      <div class="status-list__item">
        <div class="status-list__item__color-bar">
          <div class="color-bar__dates-wrapper">
            <span class="color-bar__date color-bar__date--start page-load" />
            <span class="color-bar__date color-bar__date--end page-load" />
          </div>
          <div class="color-bar__progress page-load">
            <div class="color-bar__progress__past page-load" />
          </div>
        </div>
        <div class="status-list__item__details page-load" />
      </div>
    </div>
  </template>
  <!--Rendered elements-->
  <template v-else>
    <div v-if="componentData" class="page-title">
      {{ componentData.menu_item_data.name }}
    </div>
    <ul class="plain-ul status-list">
      <li
        v-for="event in normalizeRawData(componentData)"
        :key="event.id"
        class="status-list__item"
      >
        <div
          v-if="componentData && componentData.events && componentData.events.length > 1"
          class="status-list__item__event-name"
        >
          {{ event.name }}
        </div>
        <div class="status-list__item__color-bar">
          <div class="color-bar__dates-wrapper">
            <span class="color-bar__date color-bar__date--start">{{
              getDateString(event.since)
            }}</span>
            <span class="color-bar__date color-bar__date--end">{{
              getDateString(event.until)
            }}</span>
          </div>
          <div :id="`${event.id}-total`" class="color-bar__progress">
            <div :id="`${event.id}-past`" class="color-bar__progress__past" />
          </div>
        </div>
        <div class="status-list__item__details">
          {{ getInfo(event) }}
        </div>
      </li>
    </ul>
  </template>
</template>

<style>
.page-title {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.status-list {
  margin-bottom: 3rem;
}

.status-list__item {
  margin-bottom: 2rem;
}

.status-list__item__color-bar {
  width: 100%;
  margin-bottom: 1rem;
}

.status-list__item__details {
  font-size: 0.875rem;
}

.status-list__item__event-name {
  margin-bottom: 1.25rem;
}

.color-bar__dates-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.color-bar__date {
  font-size: 0.875rem;
}

.color-bar__progress {
  width: 100%;
  height: 2rem;
  background-color: #dbdad6;
  grid: auto auto;
}

.color-bar__progress__past {
  height: 100%;
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 0rem;
  background-color: red;
}

.color-bar__progress,
.color-bar__progress__past {
  border-radius: 0.5rem;
  transition: none;
}

/**
Loading elements style
*/

.page-title.page-load {
  background: linear-gradient(90deg, #b6b8daa2 40%, #d1d3f9a2 50%, #b6b8daa2 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: loading-shimmer 1s infinite linear;

  height: 2rem;
  border-radius: 0.25rem;
}

.color-bar__progress.page-load {
  background-color: linear-gradient(90deg, #b6b8daa2 40%, #d1d3f9a2 50%, #b6b8daa2 60%);
}

.color-bar__progress__past.page-load {
  background: linear-gradient(90deg, #b6b8daa2 40%, #d1d3f9a2 50%, #b6b8daa2 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: loading-shimmer 1s infinite linear;
  width: 75%;
}

.color-bar__progress.page-load {
  background-color: #e1e2ffa2;
}

.color-bar__date.page-load {
  width: 4rem;
  height: 1rem;
  border-radius: 0.125rem;
  background-color: #e1e2ffa2;
}

.status-list__item__details.page-load {
  background: #e1e2ffa2;
  width: 50%;
  height: 1.5rem;
  border-radius: 0.25rem;
}

@media only screen and (min-width: 950px) {
  .status-list__item__color-bar {
    width: 75%;
  }
}
</style>
