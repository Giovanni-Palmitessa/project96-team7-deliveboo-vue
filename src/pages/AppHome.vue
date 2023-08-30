<script>
import axios from "axios";
import AppRestaurant from "../components/AppRestaurant.vue";
import AppCategorySelector from "../components/AppCategorySelector.vue";

export default {
  components: { AppRestaurant, AppCategorySelector },
  data() {
    return {
      arrCategory: [],
      category: null,
    };
  },
  methods: {
    getCategory() {
      axios.get("http://localhost:8000/api/categories").then((response) => {
        this.arrCategory = response.data.results;
      });
    },
  },
  created() {
    this.getCategory();
  },
};
</script>

<template>
  <div class="container mx-auto">
    <h1 class="mt-32">Resturant list</h1>

    <div class="mt-20 p-8 grid grid-cols-3 gap-4">
      <AppRestaurant v-for="index in 6" :key="index" />
    </div>

    <AppCategorySelector
      :categories="arrCategory"
      @filtered="category = $event"
    />
  </div>
</template>

<style></style>
