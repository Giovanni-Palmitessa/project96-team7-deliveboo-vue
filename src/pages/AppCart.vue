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
      console.log(products);
      this.products = products;
    },
  },
  created() {
    this.getProductsCart();
  },
};
</script>

<template>
  <!-- component -->
  <div class="flex flex-col md:flex-row w-screen h-full px-14 py-7 mt-[5.5rem]">
    <!-- My Cart -->
    <div class="w-full flex flex-col h-fit gap-4 p-4">
      <p class="text-secondary text-xl font-extrabold">Il mio carrello</p>

      <!-- Product -->
      <div
        class="flex flex-col p-4 text-lg font-semibold bg-primary shadow-md border rounded-lg"
        v-for="product in products"
      >
        <div class="flex flex-col md:flex-row gap-3 justify-between">
          <!-- Product Information -->
          <div class="flex flex-row gap-6 items-center">
            <div class="w-28 h-28 rounded-full overflow-hidden">
              <img
                class="w-full h-full"
                src="https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-masculino/09/NQQ-4635-309/NQQ-4635-309_zoom1.jpg?ts=1675445414&ims=544x"
              />
            </div>
            <div class="flex flex-col gap-1 max-w-[300px]">
              <p class="text-lg text-gray-800 font-semibold">
                {{ product.name }}
              </p>
              <p class="text-xs text-gray-600 font-semibold">
                {{ product.description }}
              </p>
              <!-- <p class="text-xs text-gray-600 font-semibold">
                Size: <span class="font-normal">42</span>
              </p> -->
            </div>
          </div>
          <!-- Price Information -->
          <div class="self-center text-center">
            <!-- <p class="text-gray-600 font-normal text-sm line-through">
              €99.99
              <span class="text-emerald-500 ml-2">(-50% OFF)</span>
            </p> -->
            <p class="text-gray-800 font-normal text-xl">
              € {{ product.price }}
            </p>
          </div>
          <!-- Remove Product Icon -->
          <div class="self-center">
            <button class="">
              <svg
                class=""
                height="24px"
                width="24px"
                id="Layer_1"
                style="enable-background: new 0 0 512 512"
                version="1.1"
                viewBox="0 0 512 512"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <path
                    d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z"
                  />
                  <g>
                    <rect height="241" width="14" x="249" y="160" />
                    <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                    <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <!-- Product Quantity -->
        <div class="flex flex-row self-center gap-1">
          <button
            class="w-5 h-5 self-center rounded-full border border-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1d5db"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
          </button>
          <input
            type="text"
            readonly="readonly"
            value="1"
            class="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-secondary rounded-sm"
          />
          <button
            class="w-5 h-5 self-center rounded-full border border-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill=""
              stroke="#9ca3af"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Purchase Resume -->
    <div
      class="flex flex-col bg-primary w-full md:w-2/3 h-fit gap-4 p-4 rounded-lg"
    >
      <p class="text-secondary text-xl font-extrabold">Riepilogo Acquisti</p>
      <div
        class="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border border-secondary rounded-sm"
      >
        <div class="flex flex-row justify-between">
          <p class="text-dark">Subtotale (2 Articoli)</p>
          <p class="text-end font-bold">€99.98</p>
        </div>
        <hr class="bg-secondary h-[1px] border-t-0" />
        <div class="flex flex-row justify-between">
          <p class="text-dark">Spedizione</p>
          <div>
            <p class="text-end font-bold">€3.90</p>
            <p class="text-dark text-sm font-normal">Arriverà il 16 Luglio</p>
          </div>
        </div>
        <hr class="bg-secondary h-[1px] border-t-0" />
        <div class="flex flex-row justify-between">
          <p class="text-dark">Discount Coupon</p>
          <a class="text-gray-500 text-base underline" href="#">Add</a>
        </div>
        <hr class="bg-secondary h-[1px] border-t-0" />
        <div class="flex flex-row justify-between">
          <p class="text-dark">Totale</p>
          <div>
            <p class="text-end font-bold">€103.88</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            class="transition-colors text-sm bg-secondary hover:bg-b_hover p-2 rounded-sm w-full text-white text-hover shadow-md"
          >
            CHECKOUT
          </button>
          <button
            class="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md"
          >
            SVUOTA CARRELLO
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional CSS if needed */
.object-cover {
  height: 100%;
}
/* .card-sinistra {
  height: 200px;
} */
/* .container-carrello {
    
    width: 450px;
} */
</style>
