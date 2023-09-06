<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProductsCart() {
      let productsStr = localStorage.getItem("cart");
      let products = JSON.parse(productsStr);
      if (products) {
        this.products = products;
      } else {
        this.products = [];
      }
    },
  },
  created() {
    this.getProductsCart();
  },
  watch: {
    products() {
      this.getProductsCart();
    },
  },
};
</script>

<template>
  <!-- riepilogo ordine  -->
  <div
    class="h-60 w-96 bg-secondary absolute top-16 right-12 z-50 rounded-md shadow-md p-4 text-sm"
  >
    <div v-for="product in products">
      <span class="mr-4">{{ product.name }}</span>
      <span class="mr-4">€ {{ product.price }}</span>
      <span>X {{ product.qnt }}</span>
    </div>
  </div>
</template>

<style></style>
