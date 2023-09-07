<script>
import { RouterLink } from "vue-router";
export default {};
</script>

<template>
  <div class="grid grid-cols-1 p-60 text-center bg-primary">
    <span class="text-4xl font-bold text-secondary"
      >GRAZIE PER AVER ACQUISTATO DA DELIVEBOO</span
    >
    <RouterLink
      :to="{ name: 'home' }"
      class="mx-auto mt-12 p-4 text-md text-primary font-semibold bg-secondary hover:bg-b_hover rounded-md shadow-md"
    >
      Continua con gli acquisti
    </RouterLink>
  </div>
</template>

<style scoped></style>
