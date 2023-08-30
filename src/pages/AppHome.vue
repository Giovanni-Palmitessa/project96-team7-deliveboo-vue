<script>
import axios from "axios";
import { store } from "../store";
import AppRestaurant from "../components/AppRestaurant.vue";
import AppCategorySelector from "../components/AppCategorySelector.vue";
import AppJumbo from "../components/AppJumbo.vue";

export default {
  components: { AppRestaurant, AppCategorySelector, AppJumbo },
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
      // Paginatore
      currentPage: 1,
      nPages: 0,
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
      });
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  created() {
    this.getCategory();
    this.getRestaurants();
  },
};
</script>

<template>
  <AppJumbo />
  <div class="container mx-auto">
    <h1 class="text-5xl text-center font-bold text-secondary my-3">
      Resturants
    </h1>
    <AppCategorySelector
      :categories="arrCategory"
      @filtered="category = $event"
    />
    <div class="mt-20 p-8 grid grid-cols-3 gap-4">
      <AppRestaurant :restaurants="arrRestaurants" />
    </div>
  </div>
</template>

<style></style>
