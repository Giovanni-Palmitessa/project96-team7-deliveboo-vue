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
      store,
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
  },
};
</script>

<template>
  <div class="container mx-auto mt-32 mb-8 px-3 md:px-0">
    <div
      class="flex flex-col items-center bg-primary border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl"
    >
      <img
        class="object-cover w-[30rem] md:pl-3 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg"
        :src="this.store.baseUrl + 'storage/' + productUrlImage"
        :alt="productName"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-secondary">
          {{ productName }}
        </h5>
        <p class="mb-3 font-normal text-gray-700">
          {{ productDescription }}
        </p>
        <div>
          <h2 class="text-secondary font-semibold">Ingredienti:</h2>
          <p class="mb-3 font-normal text-gray-700">
            {{ productIngredients }}
          </p>
        </div>
        <div>
          <h2 class="text-secondary font-semibold">Prezzo:</h2>
          <p class="mb-3 font-normal text-gray-700">€ {{ productPrice }}</p>
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
