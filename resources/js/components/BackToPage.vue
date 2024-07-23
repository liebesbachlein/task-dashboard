<template>
  <router-link :to="props.route" class="back-to-page">
    <img class="back-to-page-arrow" src="@/assets/icons/arrow-left.svg" />
    <div class="back-to-page-text">{{ title ?? 'Назад' }}</div>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
  route: { type: String, required: true },
  title: { type: String, required: false }
})
</script>

<style>
.back-to-page {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  padding-left: 1rem;
}

img.back-to-page-arrow {
  height: 1.5rem;
}

.back-to-page-text {
  padding-left: 1rem;
  font-size: 1rem;
}

@media only screen and (min-width: 950px) {
  .back-to-page-text {
    font-size: 1rem;
  }
}
</style>
