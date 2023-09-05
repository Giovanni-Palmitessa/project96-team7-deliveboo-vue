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
      loader: false,
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
      this.loader = true;
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
          this.loader = false;
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
    <div class="mt-20 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-b_hover bg-primary_hover border border-prbg-primary_hover rounded-l-lg hover:bg-primary shadow-md"
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
            class="flex items-center justify-center px-4 h-10 leading-tight text-b_hover border border-prbg-primary_hover hover:bg-primary shadow-md"
            :class="{
              'bg-primary': page == currentPage,
              'bg-primary_hover': page !== currentPage,
            }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li @click="nextPage(page)">
          <button
            class="flex items-center justify-center px-4 h-10 leading-tight text-b_hover bg-primary_hover border border-prbg-primary_hover rounded-r-lg hover:bg-primary shadow-md"
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

    <!-- Loader  -->
    <div v-if="loader" role="status" class="text-center py-40">
      <svg
        aria-hidden="true"
        class="inline w-16 h-16 mr-2 text-gray-200 animate-spin fill-yellow-400"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#FFC244"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style></style>
