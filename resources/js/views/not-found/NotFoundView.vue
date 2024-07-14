<template>
  <div class="site-content standalone-box-wrapper">
    <div class="standalone-box not-found">
      <div class="not-found-top">
        <img src="@/assets/icons/logo-bcc-invest.svg" />
        <div class="not-found-title">Страница не найдена</div>
        <div class="not-found-details">Запрашиваемая страница не существует</div>
      </div>
      <div class="not-found-inner-bottom">
        <router-link to="/home">
          <div class="button">На главную</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(route, () => useErrorStore().closeError())
</script>

<style>
.not-found {
  align-items: flex-start;
  justify-content: space-between;
  min-height: 60vh;
  padding-bottom: 2rem;
}

.not-found-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.not-found .button {
  width: 100%;
}

.not-found-inner-bottom {
  width: 100%;
}
</style>
