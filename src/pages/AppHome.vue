<script>
import axios from "axios";
import { store } from "../store";
import AppRestaurant from "../components/AppRestaurant.vue";
import AppCategorySelector from "../components/AppCategorySelector.vue";

export default {
  components: { AppRestaurant, AppCategorySelector },
  data() {
    return {
      // Store
      store,
      // Categorie
      arrCategory: [],
      category: null,
      // Ristoranti
      arrRestaurants: [],
      restaurants: null,
    };
  },
  methods: {
    getCategory() {
      axios.get("http://localhost:8000/api/categories").then((response) => {
        this.arrCategory = response.data.results;
      });
    },
    getRestaurants() {
      axios.get(this.store.baseUrl + "api/restaurants").then((response) => {
        this.arrRestaurants = response.data.results.data;
      })
    },
  },
  created() {
    this.getCategory();
    this.getRestaurants();
  },
};
</script>

<template>
  <h1 class="mt-32">Resturant list</h1>

  <div class="mt-20 p-8 grid grid-cols-3 gap-4">
    <AppRestaurant :restaurants="arrRestaurants" />
    <!-- <AppRestaurant v-for="index in 6" :key="index" :restaurants="arrRestaurants" /> -->
  </div>

  <AppCategorySelector :categories="arrCategory" @filtered="category = $event" />
</template>

<style></style>
