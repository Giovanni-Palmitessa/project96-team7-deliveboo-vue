<script>
import AppRestaurant from "../components/AppRestaurant.vue";

export default { components: { AppRestaurant } };
</script>

<template>
  <h1 class="mt-32">Resturant list</h1>
  <div class="mt-20 p-8 grid grid-cols-3 gap-4">
    <AppRestaurant v-for="index in 6" :key="index" />
  </div>
</template>

<style></style>
