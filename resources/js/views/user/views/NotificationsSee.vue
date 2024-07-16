<template>
  <div class="dashboard-section dashboard-section-role">
    <div class="form-wrapper">
      <div class="form-large-title">Поиск</div>
      <div class="form-role search-email">
        <label>Email</label>

        <div :class="{ invalid: passwordError }" class="search-input-wrapper">
          <div class="seach-icon" @click="toggleSearchFocu()">
            <img v-if="isPasswordHidden" src="@/assets/icons/eye-closed.svg" />
            <img v-else src="@/assets/icons/eye-closed.svg" />
          </div>
          <input
            class="blank-input"
            :type="isPasswordHidden ? 'password' : 'text'"
            v-model="password"
            id="password"
            name="password"
            required
          />
        </div>

        <input type="text" v-model="email" class="search-input" />
        <div class="search-options-wrapper">
          <div class="search-option" v-for="(word, i) in data" :key="i">
            {{ word }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const email = ref<string>()

const data = ['ddffff', 'daowief', 'pweiruowe', ',xvn,mxcv']
</script>

<style></style>
