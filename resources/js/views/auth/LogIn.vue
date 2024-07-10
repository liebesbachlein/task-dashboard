<template>
  <div class="login" @submit="submit()">
    <form class="form-admin">
      <label>Email</label>
      <input type="email" v-model="email" />

      <label>Password</label>
      <input type="password" v-model="password" />

      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref<string>()
const password = ref<string>()

const submit = function () {
  console.log('submit')
}
</script>

<style>
.form-admin {
  margin: auto auto;
  display: flex;
  flex-direction: column;
  width: fit-content;
}
</style>
