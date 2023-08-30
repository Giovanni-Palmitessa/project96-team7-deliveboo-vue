<script>
import axios from "axios";
import AppFoodList from "../components/AppFoodList.vue";
import AppCategorySelector from "../components/AppCategorySelector.vue";

export default {
  components: { AppFoodList, AppCategorySelector },
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
  <h1 class="mt-32">Resturant list</h1>
  <AppCategorySelector
    :categories="arrCategory"
    @filtered="category = $event"
  />
</template>

<style></style>
