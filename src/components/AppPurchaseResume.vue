<script>
export default {
  data() {
    return {};
  },
  props: {
    productsResume: Array,
  },
  methods: {
    removeCartEle(index) {
      this.productsResume.splice(index, 1);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.productsResume));
    },
    increaseQnt(index) {
      this.productsResume[index].qnt += 1;
      this.updateCart();
    },
    decreaseQnt(index) {
      if (this.productsResume[index].qnt > 0) {
        this.productsResume[index].qnt -= 1;
        this.updateCart();
      } else {
        this.productsResume[index].qnt = 0;
      }
    },
  },
  created() {},
};
</script>

<template>
  <div
    class="resume h-48 w-96 bg-secondary absolute top-16 right-12 z-50 rounded-md shadow-md p-2 text-sm overflow-y-scroll"
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
      v-for="(product, index) in productsResume"
      class="grid grid-cols-7 text-white font-semibold p-1 mb-1 bg-b_hover rounded-md shadow-sm"
    >
      <span class="col-span-4 mr-4">{{ product.name }}</span>
      <span class="mr-4">€ {{ product.price }}</span>
      <div class="inline-block">
        <i
          @click="decreaseQnt(index)"
          class="fa-solid fa-minus text-xs mr-2 text-primary_hover hover:text-primary cursor-pointer"
        ></i>
        <span>{{ product.qnt }}</span>
        <i
          @click="increaseQnt(index)"
          class="fa-solid fa-plus text-xs ml-2 text-primary_hover hover:text-primary cursor-pointer"
        ></i>
      </div>
      <i
        @click="removeCartEle(index)"
        class="fa-solid fa-xmark p-1 mr-2 mb-1 ml-3 text-primary_hover hover:text-primary rounded-md cursor-pointer"
      ></i>
    </div>
    <RouterLink
      :to="{ name: 'cart' }"
      class="font-semibold underline hover:no-underline text-primary ml-56"
      >Vai al carrello</RouterLink
    >
  </div>
</template>

<style scoped>
.resume::-webkit-scrollbar {
  background: #c79735;
  width: 5px;
  height: 8px;
}
</style>
