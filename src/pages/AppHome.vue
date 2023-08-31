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
    changePage(page) {
      this.currentPage = page;
    },
    nextPage(page) {
      if (this.currentPage >= this.nPages) {
        this.currentPage = page;
      }
      this.currentPage++;
    },
    previousPage(page) {
      if (this.currentPage <= 1) {
        this.currentPage = page;
      }
      this.currentPage--;
    },
    getCategory() {
      axios.get("http://localhost:8000/api/categories").then((response) => {
        this.arrCategory = response.data.results;
      });
    },
    getRestaurants() {
      const params = {
        page: this.currentPage,
      };
      if (this.category && this.category.length > 0) {
        params.category_id = this.category;
      }

      axios
        .get(this.store.baseUrl + "api/restaurants", { params })
        .then((response) => {
          this.arrRestaurants = response.data.results.data;
          this.nPages = response.data.results.last_page;
        });
    },
  },
  created() {
    this.getCategory();
    this.getRestaurants();
  },
  watch: {
    currentPage() {
      this.getRestaurants();
    },
    category: {
      deep: true,
      handler() {
        this.getRestaurants();
      },
    },
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
      <AppRestaurant
        v-for="restaurant in arrRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>

    <!-- paginator -->
    <nav
      class="pl-4 md:pl-6 lg:pl-4 mb-3 py-3"
      aria-label="Page navigation example"
    >
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-white bg-blue-800 border border-blue-800 rounded-l-lg hover:bg-blue-500 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="previousPage(page)"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        <li v-for="page in nPages" :key="page">
          <button
            class="flex items-center justify-center px-4 h-10 leading-tight text-white border border-blue-800 hover:bg-blue-500 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :class="{
              'bg-blue-500': page == currentPage,
              'bg-blue-800': page !== currentPage,
            }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li @click="nextPage(page)">
          <button
            class="flex items-center justify-center px-4 h-10 leading-tight text-white bg-blue-800 border border-blue-800 rounded-r-lg hover:bg-blue-500 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style></style>
