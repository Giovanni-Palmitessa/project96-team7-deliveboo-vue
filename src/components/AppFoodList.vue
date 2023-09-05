<script>
import axios from "axios";
import { store } from "../store";
import { RouterLink } from "vue-router";
import Apploader from "./apploader.vue";
import AppAlert from "./AppAlert.vue";

export default {
  data() {
    return {
      store,
      products: [],
      productsCart: JSON.parse(localStorage.getItem("cart")) || [],
      restaurantId: null,
      notAllowed: false,
      showAlert: false,
      loader: false,
    };
  },
  methods: {
    getProducts() {
      this.loader = true;
      axios
        .get(store.baseUrl + "api/products", {
          params: {
            restaurant_id: this.restaurantId,
          },
        })
        .then((response) => {
          this.products = response.data.results.data;
          this.loader = false;
        });
    },

    getProductInfo(product) {
      console.log("Current restaurantId:", this.restaurantId); // Debug
      console.log("Product restaurantId:", product.restaurantId); // Debug
      console.log("Current productsCart:", this.productsCart); // Debug
      // Se il carrello è vuoto o contiene prodotti dello stesso ristorante
      if (
        this.productsCart.length === 0 ||
        this.productsCart[0].restaurant_id === this.restaurantId
      ) {
        let newProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          qnt: 1,
          restaurant_id: this.restaurantId,
        };
        if (this.productsCart.some((item) => item.id === newProduct.id)) {
          const obj = this.productsCart.find(
            (item) => item.id === newProduct.id
          );
          obj.qnt++;
        } else {
          this.productsCart.push(newProduct);
        }
        let cartStr = JSON.stringify(this.productsCart);
        localStorage.setItem("cart", cartStr);
        this.notAllowed = false; // Resetta il flag di errore
      } else {
        this.notAllowed = true;
        this.showAlert = true;
      }
    },
    alert() {
      this.showAlert = false;
    },
  },
  created() {
    this.restaurantId = sessionStorage.getItem("restaurant_id");
    this.getProducts();
  },
  components: { RouterLink, Apploader, AppAlert },
};
</script>

<template>
  <div class="container mt-[5.5rem] py-8 px-4 md:px-0">
    <AppAlert v-if="this.showAlert" @closeAlert="alert" />

    <h1 class="text-4xl text-center font-bold text-secondary pb-8">
      Il nostro Menù
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        v-for="product in products"
      >
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-48 lg:h-full md:w-full md:rounded-none md:rounded-l-lg"
          src="https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg"
          alt="ristorante"
        />
        <div class="grid grid-cols-1 justify-between p-4 leading-normal">
          <div>
            <h5
              class="mb-2 text-2xl md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900"
            >
              {{ product.name }}
            </h5>
            <h5
              class="mb-2 text-xl font-semibold tracking-tight text-secondary"
            >
              € {{ product.price }}
            </h5>
          </div>

          <button
            @click="getProductInfo(product)"
            class="text-white text-sm bg-secondary hover:text-primary px-0 py-1 rounded-md shadow-md mb-2"
          >
            <i class="fa-solid fa-cart-arrow-down"></i>
            Aggiungi al carrello!
          </button>

          <RouterLink
            :to="{ name: 'details' }"
            class="text-white text-center text-sm bg-primary hover:text-secondary px-0 py-1 rounded-md shadow-md"
          >
            Dettagli prodotto
          </RouterLink>
        </div>
      </div>
    </div>

    <Apploader v-if="loader" />
  </div>
</template>

<style scoped>
/* :root {
  --white: #efefef;
  --black: #222;
  --trueBlack: #000;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background-color: var(--black);
}

.main {
  max-width: 1200px;
  margin: 0 auto;
} */

/* .cards {
  display: grid;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
} */

.cards_item {
  display: flex;
  height: 550px;
}

.card_image {
  display: flex;
  height: 250px;
  /* box-shadow: 0 50px 100px 0 var(--violet); */
}

.card_image img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  /* background-color: var(--purple); */
  border-radius: 5px 25px 5px 50px;
  transition: transform 0.1s linear, box-shadow 0.2s;
}

/* .card_text:focus,
.card:focus {
  outline: 2px dashed var(--aqua);
} */

.card:focus,
.card:hover {
  transform: scale(1.01);
  box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.2);
}

.card_content {
  padding: 0.5rem 1rem 1rem;
  color: black;
}

.card_title {
  position: absolute;
  top: 0;
  right: 0;
  width: 90%;
  height: auto;
  color: var(--black);
  padding: 0.5rem;
  border-radius: 5px 0 0 5px;
  transform: rotate(-3.3deg);
  transform-origin: left top;
  font-weight: 600;
  font-size: 1.325rem;
  overflow: hidden;
  z-index: 1;
  /* background-color: rgba(253, 73, 160, 0.75); */
  animation: 0s 0s fly-in 0 reverse both;
}

@media (min-width: 535px) {
  .card_title {
    animation: 0.5s 0.25s fly-out 1 both;
  }
}

.card:focus .card_title,
.card:hover .card_title {
  animation: 0.5s ease-in 0s fly-in 1 both;
}

.card_text {
  line-height: 1.5;
  text-size-adjust: 0.2px;
  padding: 0 1rem;
}

.card_text p:first-of-type:first-letter {
  font-size: 1.8em;
  margin-right: 0.05em;
}

@media (min-width: 480px) {
  .card_text {
    overflow: auto;
    max-height: 20rem;
    scrollbar-width: thin;
  }

  .card_text::-webkit-scrollbar {
    width: 12px;
  }

  .card_text::-webkit-scrollbar-track {
    background: var(--violet);
  }

  .card_text::-webkit-scrollbar-thumb {
    background-color: var(--aqua);
  }
}

.upcharge {
  position: absolute;
  bottom: 0;
  left: 70px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  font-weight: 600;
  /* background-color: var(--violet); */
  padding: 0.5rem 0.75rem;
  color: var(--trueBlack);
  border-radius: 0 10px;
  z-index: 0;
  overflow: hidden;
  margin-bottom: 1rem;
}

.upcharge::after,
.upcharge::before {
  content: "+";
  display: block;
  line-height: 0;
  font-size: 3rem;
  position: absolute;
  color: var(--purple);
  z-index: -1;
  opacity: 0.3;
}

.upcharge::before {
  left: 0;
  top: 0.5rem;
}

.upcharge::after {
  right: 0;
  bottom: 1.25rem;
}

@keyframes fly-in {
  0% {
    top: 0;
    right: 0;
    font-size: 1.325rem;
  }

  25% {
    top: 0;
    right: -200%;
    font-size: 1.325rem;
  }

  26% {
    font-size: 2rem;
  }

  100% {
    top: 2rem;
    right: 0;
    font-size: 2rem;
  }
}

@keyframes fly-out {
  0% {
    top: 2rem;
    right: 0;
    font-size: 2rem;
  }

  50% {
    top: 0;
    right: -200%;
    font-size: 1.325rem;
  }

  100% {
    top: 0;
    right: 0;
    font-size: 1.325rem;
  }
}

/* BOTTONE */

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  outline: 3px #00846b solid;
  outline-offset: -3px;
  border-radius: 30px;
  border: 1px solid #00846b;
  cursor: pointer;
  transition: 400ms;
}

.button .text {
  color: #00846b;
  font-weight: 700;
  font-size: 1em;
  transition: 400ms;
}

.button svg path {
  transition: 400ms;
}

.button:hover {
  background-color: transparent;
}

.button:hover .text {
  color: #ffc244;
}

.button:hover svg path {
  fill: #ffc244;
}
</style>
