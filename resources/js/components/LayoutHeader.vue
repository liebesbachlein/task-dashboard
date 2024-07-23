<script setup lang="ts">
import { useMenuSidebarStore } from '@/stores/useMenuSidebarStore'

interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="layout-header layout-header--open">
    <div class="layout-header__title">{{ props.title }}</div>
    <img
      class="layout-header__icon layout-header__icon--mobile--open"
      src="@/assets/icons/arrow-left.svg"
      @click="useMenuSidebarStore().openMenuSidebar()"
    />
  </div>
</template>

<style>
/*
<template>
  <div class="dashboard-title-wrap mobile">
    <div class="dashboard-title">Dashboard</div>
    <img
      class="dashboard-arrow"
      src="@/assets/icons/arrow-left.svg"
      @click="useMenuSidebarStore().openMenuSidebar()"
    />
  </div>
</template>
*/

.layout-header {
  display: flex;

  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
}

.layout-header--open {
  position: relative;
  justify-content: space-between;
  box-shadow: 1px 1px 4px 0px rgba(101, 101, 101, 0.25);
  z-index: 1;
}

.layout-header__title {
  font-size: 1.25rem;
}

.layout-header__icon {
  height: 1.5rem;
}

@media only screen and (min-width: 950px) {
  .layout-header {
    width: 100%;
    height: 3.2rem;
    padding: 0;
    border: none;
  }

  .layout-header--open {
    align-items: flex-end;
    box-shadow: none;
    text-align: left;
    margin-bottom: 3rem;
  }

  .layout-header__icon {
    display: none;
  }
}
</style>
