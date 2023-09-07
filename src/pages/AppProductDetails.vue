<script>
import { store } from "../store";
import Apploader from "../components/apploader.vue";

export default {
  data() {
    return {
      productId: [],
      productName: [],
      productPrice: [],
      productDescription: [],
      productIngredients: [],
      productUrlImage: [],
      // store
      store
    };
  },
  components: { Apploader },
  created() {
    this.productId = this.$route.params.productId;
    this.productName = this.$route.params.productName;
    this.productPrice = this.$route.params.productPrice;
    this.productDescription = this.$route.params.productDescription;
    this.productIngredients = this.$route.params.productIngredients;
    this.productUrlImage = this.$route.params.productUrlImage;
  }
};
</script>

<template>
  <div class="container max-w-lg mx-auto mt-32 mb-8">
    <div
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        :src="this.store.baseUrl + 'storage/' + productUrlImage" :alt="productName">
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ productName }}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ productDescription }}</p>
        <div>
          <h2>Ingredienti:</h2>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ productIngredients }}</p>
        </div>
        <div>
          <h2>Prezzo:</h2>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ productPrice }}</p>
        </div>
      </div>
    </div>
    <!-- Mostra i dettagli del prodotto in base all'ID -->
  </div>

  <!-- <div class="container mx-auto mt-[7rem]">
    <h1 class="text-3xl text-center text-secondary font-bold">
      Stiamo lavorando per voi...
    </h1>
    <Apploader />
  </div> -->
</template>

<style></style>
