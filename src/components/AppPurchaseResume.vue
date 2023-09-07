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
    class="h-48 w-96 bg-secondary absolute top-16 right-12 z-50 rounded-md shadow-md p-2 text-sm"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-center mb-2 text-md font-semibold text-primary">
        IL TUO ORDINE
      </h2>
      <i
        @click="$emit('closeResume')"
        class="fa-solid fa-xmark p-1 mr-2 mb-1 text-primary_hover hover:bg-b_hover rounded-md cursor-pointer"
      ></i>
    </div>
    <div
      v-for="product in productsResume"
      class="grid grid-cols-5 text-primary font-semibold p-1 mb-1 bg-b_hover rounded-md shadow-sm"
    >
      <span class="col-span-3 mr-4">{{ product.name }}</span>
      <span class="mr-4">€ {{ product.price }}</span>
      <span>x {{ product.qnt }}</span>
    </div>
    <RouterLink
      :to="{ name: 'cart' }"
      class="font-semibold underline hover:no-underline text-primary ml-56"
      >Vai al carrello</RouterLink
    >
  </div>
</template>

<style></style>
