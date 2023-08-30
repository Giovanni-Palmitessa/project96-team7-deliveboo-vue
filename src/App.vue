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

  <div class="container">
    <router-view></router-view>
  </div>
  <AppFooter />
</template>

<style></style>
