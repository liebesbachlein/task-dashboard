<template>
  <div class="site-content grey-background">
    <div class="standalone-box-wrapper">
      <div class="standalone-box form-wrapper">
        <div class="form-large-title">Панель администратора</div>
        <form class="form-role" @submit.prevent="handleSubmit">
          <label>Email</label>
          <input
            :class="{ invalid: emailError }"
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
          />

          <label>Пароль</label>
          <div :class="{ invalid: passwordError }" class="password-wrapper">
            <input
              class="blank-input"
              :type="isPasswordHidden ? 'password' : 'text'"
              v-model="password"
              id="password"
              name="password"
              required
            />
            <div class="password-eye" @click="toggleVisibilityPassword()">
              <img v-if="isPasswordHidden" src="@/assets/icons/eye-closed.svg" />
              <img v-else src="@/assets/icons/eye-open.svg" />
            </div>
          </div>

          <div class="submit-button-wrapper">
            <Loader v-if="loader" />
            <input type="submit" :disabled="!enableSubmit" class="button" value="Войти" />
          </div>
        </form>
        <label v-show="messageOnSubmit.length > 0" class="label-message">{{
          messageOnSubmit
        }}</label>
        <router-link
          class="label-link label-message"
          to="/"
          style="text-decoration: underline; margin-bottom: 1rem"
          >Вернуться на главную</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios'
import router from '@/router'

const isPasswordHidden = ref<boolean>(true)
const toggleVisibilityPassword = function () {
  isPasswordHidden.value = !isPasswordHidden.value
}

const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const email = ref<string>()
const password = ref<string>()

const emailError = computed(() => {
  if (email.value != null) return !validateEmail(email.value)

  return false
})

const passwordError = computed(() => {
  if (password.value != null) return password.value.length == 0
  return false
})

const enableSubmit = computed(() => {
  return email.value && password.value && !passwordError.value && !emailError.value
})

const validateEmail = function (emailToCheck: string) {
  // eslint-disable-next-line no-useless-escape
  if (
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailToCheck
    )
  ) {
    return true
  } else {
    return false
  }
}

const handleSubmit = function () {
  if (enableSubmit.value) {
    loader.value = true
    axios
      .post('/admins/login', {
        email: email.value,
        password: password.value
      })
      .then((res) => {
        messageOnSubmit.value = res.statusText
        loader.value = false
        router.push({ path: '/admin/control-all/' })
      })
      .catch((err) => {
        messageOnSubmit.value = err.message
        loader.value = false
      })
  }
}
</script>

<style></style>
