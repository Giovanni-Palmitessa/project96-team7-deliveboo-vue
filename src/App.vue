<script>
import { initFlowbite } from "flowbite";
import AppFoodList from "./components/AppFoodList.vue";
export default {
  components: {
    AppFoodList,
  },
  mounted() {
    initFlowbite();
  },
};
</script>

<template>
  <AppFoodList />
</template>

<style></style>
