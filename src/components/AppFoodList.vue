<script>
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      store,
      products: [],
      restaurantId: sessionStorage.getItem("restaurant_id"),
    };
  },
  methods: {
    getProducts() {
      axios
        .get(store.baseUrl + "api/products", {
          params: {
            restaurant_id: this.restaurantId,
          },
        })
        .then((response) => {
          this.products = response.data.results.data;
          console.log(this.products);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
<template>
  <div class="container mt-[5.5rem] py-8 px-4 md:px-0">
    <h1 class="text-4xl text-center font-bold text-secondary pb-8">
      Il nostro Menù
    </h1>
    <ul class="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="product in products" class="cards_item relative">
        <div class="card bg-primary" tabindex="0">
          <div class="card_image">
            <img
              src="https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg"
              alt="mixed vegetable salad in a mason jar. "
            />
          </div>
          <div class="card_content">
            <h2 class="card_title bg-secondary">
              {{ product.name }} &#x2022; {{ product.price }}€
            </h2>
            <div class="card_text">
              <p>{{ product.description }}</p>
              <p class="upcharge bg-secondary absolute bottom-0">
                <button class="button bg-primary">
                  <svg
                    viewBox="0 0 16 16"
                    class="bi bi-cart-check"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#00846B"
                  >
                    <path
                      d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                    ></path>
                    <path
                      d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                    ></path>
                  </svg>
                  <p class="text">Aggiungi all'ordine</p>
                </button>
              </p>
            </div>
          </div>
          <input
            type="number"
            id="number"
            class="w-2/5 mx-auto border-2 border-secondary rounded-xl text-gray-900 text-sm focus:ring-secondary focus:border-secondary block p-2.5"
            required
          />
        </div>
      </li>
    </ul>
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
