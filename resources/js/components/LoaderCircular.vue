<script setup lang="ts">
const props = defineProps({
  isBlue: { type: Boolean, required: false }
})
</script>

<template>
  <div class="loader-box">
    <span class="loader" :class="{ 'loader-blue': props.isBlue }"></span>
  </div>
</template>

<style>
.loader-box {
  position: absolute;
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
}

.loader {
  width: 40px;
  height: 40px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader-blue {
  border: 5px solid var(--accent-color);
  border-bottom-color: transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
