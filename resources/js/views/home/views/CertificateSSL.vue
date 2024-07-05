<template>
  <div class="ssl">
    <div class="ssl-inner">
      <div class="ssl-inner-name">Название сертификата: www.bcc-invest/kz</div>
      <StatusBar :id="`${props.routeName}0`" :event-data="eventData[0]" />
    </div>
    <div class="ssl-inner">
      <div class="ssl-inner-name">Название сертификата: ISRG Root X1</div>
      <StatusBar :id="`${props.routeName}1`" :event-data="eventData[1]" />
    </div>
    <div class="ssl-inner">
      <div class="ssl-inner-name">Название сертификата: E6</div>
      <StatusBar :id="`${props.routeName}2`" :event-data="eventData[2]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBar from '../components/StatusBar.vue'
import { type PropType } from 'vue'
import type { EventType } from '../data/event.data'

const props = defineProps({
  eventData: { type: Array as PropType<EventType[]> | undefined, required: true },
  routeName: { type: String, required: true }
})
</script>

<style>
.ssl {
  margin-bottom: 3rem;
}

.ssl-inner {
  margin-bottom: 3.5rem;
}

.ssl-inner-name {
  margin-bottom: 1.75rem;
}

.ssl div:last-child {
  margin: 0;
}
</style>
