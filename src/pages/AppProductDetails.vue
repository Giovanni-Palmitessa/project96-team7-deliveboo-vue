<script>
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
  <div>
    <!-- Mostra i dettagli del prodotto in base all'ID -->
    <h1 class="mb-52">Dettagli del prodotto</h1>
    <p>{{ productId }}</p>
    <p>{{ productName }}</p>
    <p>{{ productPrice }}</p>
    <p>{{ productDescription }}</p>
    <p>{{ productIngredients }}</p>
    <p>{{ productUrlImage }}</p>
  </div>
  <div class="container mx-auto">

  </div>

  <!-- <div class="container mx-auto mt-[7rem]">
    <h1 class="text-3xl text-center text-secondary font-bold">
      Stiamo lavorando per voi...
    </h1>
    <Apploader />
  </div> -->
</template>

<style></style>
