<script setup lang="ts">
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'

interface Props {
  isCrossWhite?: true
}

const props = defineProps<Props>()
</script>

<template>
  <div class="layout-header layout-header--close mobile">
    <img
      v-if="props.isCrossWhite"
      class="layout-header__icon layout-header__icon--close mobile"
      src="@/assets/icons/cross-white.svg"
      @click="useMenuSidebarStore().closeMenuSidebar"
    />
    <img
      v-else
      class="layout-header__icon layout-header__icon--close mobile"
      src="@/assets/icons/cross.svg"
      @click="useMenuSidebarStore().closeMenuSidebar"
    />
  </div>
</template>

<style>
.layout-header--close {
  position: relative;
  justify-content: flex-end;
  border-bottom: 1px solid #5b5b5b9d;
  box-shadow: none;
  z-index: 2;
}

@media only screen and (min-width: 950px) {
  .mobile {
    display: none;
  }
}
</style>
