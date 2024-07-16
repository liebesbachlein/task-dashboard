<template>
  <div class="site-content grey-background">
    <div class="standalone-box-wrapper">
      <div class="standalone-box form-wrapper">
        <div class="form-large-title">Вход в личный кабинет</div>
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
          >Забыли пароль?</router-link
        >
        <router-link
          class="label-link label-message"
          to="/"
          style="text-decoration: underline; margin-bottom: 1rem"
          >Зарегистрироваться</router-link
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
      .post('/users/login', {
        email: email.value,
        password: password.value,
        user_type: 'admin'
      })
      .then((res) => {
        messageOnSubmit.value = res.statusText
        loader.value = false
        router.push({ path: '/user/home' })
      })
      .catch((err) => {
        messageOnSubmit.value = err.message
        loader.value = false
      })
  }
}
</script>

<style>
.password-wrapper {
  height: fit-content;
  width: 100%;
  border: 1px solid #c4dae5;
  border-radius: 0.25rem;
  color: #454545;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: auto min-content;
  align-items: center;
}

.password-wrapper:has(input:focus) {
  border: 1px solid #fff;
  outline: 1px solid #454545;
}

.password-wrapper:has(input:-webkit-autofill) {
  background: #e8f0fe;
}

input.blank-input,
input.blank-input:focus {
  grid-column: 1;
  border: none;
  margin: 0;
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background-color: #e8f0fe;
}

.password-eye {
  width: 40px;
  height: 40px;
  grid-column: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: fill;
  margin-right: 0.25rem;
}

.password-eye img {
  width: 24px;
  height: 24px;
  padding: 0;
  position: relative;
  top: 12px;
}
</style>
