<template>
  <div class="expiration-checker-section">
    <StatusBar :id="`${props.routeName}0`" :event-data="eventData[0]" />
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

<style></style>
