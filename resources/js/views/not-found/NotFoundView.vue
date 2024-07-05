<template>
  <div class="site-content not-found">
    <div class="not-found-inner">
      <div class="not-found-inner-top">
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
import { useErrorStore } from '@/stores/router'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route?.path,
  () => useErrorStore().closeError()
)
</script>

<style>
@media only screen and (min-width: 1024px) {
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: calc(100vw * 8 / 16);
    background-color: var(--backdrop-color-desktop);
  }

  .not-found-inner {
    width: 41%;
    height: 60vh;
    min-height: calc(100vw * 8 * 0.6 / 16);
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .not-found-inner img {
    width: 45%;
    margin-bottom: 1.5rem;
  }

  .not-found-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .not-found .button {
    width: 100%;
  }
}
</style>
