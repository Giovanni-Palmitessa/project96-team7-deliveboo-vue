<script>
import { initFlowbite } from "flowbite";
import AppHeader from "./components/AppHeader.vue";
export default {
  mounted() {
    initFlowbite();
  },
  components: { AppHeader },
};
</script>

<template>
  <AppHeader />
</template>

<style></style>
