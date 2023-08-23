<script>
import { initFlowbite } from "flowbite";
import AppHeader from "./components/AppHeader.vue";
import AppFoodList from "./components/AppFoodList.vue";
export default {
  components: {
    AppFoodList,
  },
  mounted() {
    initFlowbite();
  },
  components: { AppHeader },
};
</script>

<template>
  <AppHeader />
  <AppFoodList />
</template>

<style></style>
