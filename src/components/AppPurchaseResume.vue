<script>
export default {
  data() {
    return {};
  },
  props: {
    productsResume: Array,
  },
  methods: {},
  created() {},
};
</script>

<template>
  <div
    class="h-60 w-96 bg-secondary absolute top-16 right-12 z-50 rounded-md shadow-md p-4 text-sm"
  >
    <div v-for="product in productsResume">
      <span class="mr-4">{{ product.name }}</span>
      <span class="mr-4">€ {{ product.price }}</span>
      <span>X {{ product.qnt }}</span>
    </div>
  </div>
</template>

<style></style>
