<template>
  <div class="site-content grey-background">
    <div class="standalone-box-wrapper">
    <div class="standalone-box form-wrapper">
      <div class="form-large-title">
        Панель администратора
      </div>
      <form class="form-admin" @submit.prevent="handleSubmit">
        <label>Email</label>
        <input :class="{'invalid' : emailError}" type="email" id="email"  name="email"  v-model="email" @blur="validateEmail" required />

        <label>Пароль</label>
        <input :class="{'invalid' : passwordError}" type="password" v-model="password" id="password" name="password"  required />

        <div class="submit-button-wrapper">
          <Loader v-if="loader"/>
          <input type="submit" :disabled="!enableSubmit" class="button" value="Войти">
        </div>
      </form>
      <label v-show="messageOnSubmit.length > 0" class="label-message">{{ messageOnSubmit}}</label>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Loader from '@/components/Loader.vue'

const loader = ref<boolean>(false)
const messageOnSubmit = ref<string>(' ')

const email = ref<string>()
const password = ref<string>()

const emailError = computed(() => {
  if(email.value != null) return !validateEmail(email.value)
  
  return false
})

const passwordError = computed(() => {
  if(password.value != null) return password.value.length == 0
  return false
})

const enableSubmit = computed(() => {
  return email.value && password.value && !passwordError.value && !emailError.value
})

const validateEmail = function(emailToCheck: string) {     
  // eslint-disable-next-line no-useless-escape
  if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailToCheck)) {
    return true
  } else {
    return false
  }
}

const handleSubmit = function () {
  if(enableSubmit.value) {
    loader.value = true
    
    const data = {
      email: email.value,
      password: password.value,
      name: 'Admin',
      user_type: 'admin'
    }

    /*axios.post('/users/login', data).then((response) => {
      messageOnSubmit.value = 'Успешно' 
      loader.value = false
      $router.push({ path: '/admin/all/' }) 
    }).catch((err) => {          
      messageOnSubmit.value = err.message
      loader.value = false
    })*/
    
  }
}
</script>

<style>


</style>
