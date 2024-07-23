<template>
  <div class="app-logo">
    <router-link to="/">
      <img class="app-logo__image" src="@/assets/icons/logo-bcc-invest.svg" />
    </router-link>
  </div>
</template>

<style>
.app-logo {
  grid-row: 3;
  padding: 3rem 1rem 2rem 1rem;
  display: flex;
  width: 100%;
}

.app-logo__image {
  max-width: 75%;
  max-height: 4rem;
}

@media only screen and (min-width: 950px) {
  .app-logo {
    grid-row: 1;
    padding: 0;
    padding-left: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .app-logo__image {
    max-width: 65%;
  }
}
</style>
