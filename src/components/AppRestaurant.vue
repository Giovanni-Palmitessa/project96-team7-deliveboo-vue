<script>
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      arrRestaurants: [],
      restaurants: null,
      store,
    }
  },
  methods: {
    getRestaurants() {
      axios.get(this.store.baseUrl + "api/restaurants").then((response) => {
        this.arrRestaurants = response.data.results.data;
      })
    }
  },
  created() {
    this.getRestaurants();
  }
};
</script>

<template>
  <div class="mt-52" v-for="restaurant in arrRestaurants" :key="restaurant.name">{{ restaurant.name }}</div>

  <div class="bg-white border border-gray-200 rounded-lg shadow">
    <a href="#">
      <img class="rounded-t-lg" src="../../public/img/rest01.jpg" alt="" />
    </a>
    <div class="p-5 bg-primary">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Haruka Sushi
        </h5>
      </a>
      <p class="mb-3 font-normal text-sm text-gray-700">
        Esperienza culinaria incantata: Il nostro ristorante trasforma
        ingredienti ordinari in opere d'arte gustative, incantando i palati con
        un connubio magico di sapori e presentazioni uniche
      </p>
      <ul class="flex gap-2 mb-3 text-sm font-semibold">
        <li>Italiano</li>
        <li>Fusion</li>
        <li>Greco</li>
      </ul>
      <a href="#"
        class="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-secondary rounded-lg hover:bg-b_hover focus:ring-4 focus:outline-none focus:ring-secondary">
        Vai al Menù
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
