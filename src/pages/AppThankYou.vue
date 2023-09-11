<script>
import { RouterLink } from "vue-router";
export default {};
</script>

<template>
  <div class="bg-primary py-[83px]">
    <div class="container mx-auto pt-32 p-2">
      <div class="flex flex-col">
        <span class="text-4xl font-bold text-secondary text-center">GRAZIE PER AVER ACQUISTATO DA DELIVEBOO</span>
        <RouterLink :to="{ name: 'home' }"
          class="mx-auto mt-12 p-4 text-md text-primary font-semibold bg-secondary hover:bg-b_hover rounded-md shadow-md">
          Continua con gli acquisti
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
