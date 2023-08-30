<script>
import { initFlowbite } from "flowbite";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
  mounted() {
    initFlowbite();
  },
};
</script>

<template>
  <AppHeader />

  <div class="container mx-auto">
    <router-view></router-view>
  </div>
  <AppFooter />
</template>

<style></style>
