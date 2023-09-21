<script>
import axios from "axios";
import { store } from "../store";
import braintreeDropIn from "braintree-web-drop-in";
import AppLoader from "../components/AppLoader.vue";

export default {
  data() {
    return {
      products: [],
      email: "",
      name: "",
      surname: "",
      message: "",
      nonce: "",
      error: "",
      paymentToken: null,
      restaurantId: null,
      hasErrors: false,
      emailError: "",
      nameError: "",
      surnameError: "",
      messageError: "",
      showLoader: false,
    };
  },
  components: { AppLoader },
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
    async getPaymentToken() {
      await axios
        .get("http://localhost:8000/api/orders/generate")
        .then((response) => {
          if (response.data.success) {
            this.paymentToken = response.data.token;
          } else {
            console.error("Errore nella generazione del token di pagamento");
          }
        });
    },
    async initializeDropIn() {
      try {
        const instance = await braintreeDropIn.create({
          container: "#dropin-container",
          authorization: this.paymentToken,
        });

        const payButton = this.$refs.payButton;
        payButton.addEventListener("click", () => {
          instance.requestPaymentMethod((err, payload) => {
            if (err) {
              console.error(
                "Errore nel recupero del metodo di pagamento:",
                err
              );
              return;
            }
            this.nonce = payload.nonce;
            this.submitPayment();
          });
        });
      } catch (createErr) {
        console.error("Errore nella creazione di Drop-in:", createErr);
      }
    },
    validateFields() {
      let isValid = true;

      if (!this.email) {
        this.emailError = "Il campo 'email' è richiesto!";
        isValid = false;
        this.hasErrors = true;
      } else if (!this.email.includes("@")) {
        this.emailError = "Il campo 'email' deve contenere la '@'";
        isValid = false;
        this.hasErrors = true;
      } else if (!(this.email.endsWith(".com") || this.email.endsWith(".it"))) {
        this.emailError = "Il campo 'email' deve terminare con '.com' o '.it'";
        isValid = false;
        this.hasErrors = true;
      } else if (this.email.length < 5) {
        this.emailError = "Il campo 'email' deve contenere almeno 5 caratteri";
        isValid = false;
        this.hasErrors = true;
      } else {
        this.emailError = ""; // Azzera l'errore se il campo è valido
      }

      if (!this.name) {
        this.nameError = "Il campo 'nome' è richiesto!";
        isValid = false;
        this.hasErrors = true;
      } else if (this.name.length < 2) {
        this.nameError = "Il campo 'nome' è troppo corto!";
        isValid = false;
        this.hasErrors = true;
      } else {
        this.nameError = ""; // Azzera l'errore se il campo è valido
      }

      if (!this.surname) {
        this.surnameError = "Il campo 'cognome' è richiesto!";
        isValid = false;
        this.hasErrors = true;
      } else if (this.surname.length < 2) {
        this.surnameError = "Il campo 'cognome' è troppo corto!";
        isValid = false;
        this.hasErrors = true;
      } else {
        this.surnameError = "";
      }
      return isValid;
    },

    submitPayment() {
      if (!this.validateFields()) {
        this.hasErrors = true;
        return; // Interrompe se la validazione fallisce.
      }
      this.hasErrors = false;
      this.showLoader = true;
      axios
        .post("http://localhost:8000/api/orders/make/payment", {
          token: this.nonce,
          cart: this.products,
          restaurant_id: this.products[0].restaurant_id,
          name: this.name,
          surname: this.surname,
          email: this.email,
          message: this.message,
        })
        .then((response) => {
          if (response.data.success) {
            this.$router.push({ name: "thankYou" });
            localStorage.clear();
          } else {
            // handle failure
          }
        })
        .catch((error) => {
          console.error("Payment Error:", error);
          this.error =
            error.response.data.message ||
            "Errore durante il processo di pagamento. Si prega di riprovare.";
        });
    },
  },
  async created() {
    await this.getProductsCart();
    await this.getPaymentToken();
    this.initializeDropIn();
  },
};
</script>

<template>
  <div class="container">
    <div class="mt-28">
      <!-- ERRORE -->
      <div
        v-if="hasErrors"
        id="alert-2"
        class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50"
        role="alert"
      >
        <svg
          class="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 text-sm font-medium">
          Ordine non inviato, controlla i campi e riprova!
        </div>
        <button
          @click="closeModalErr"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#alert-2"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>

      <h1 class="text-3xl text-center font-bold text-secondary">
        Completa il tuo ordine
      </h1>
      <h1 class="text-3xl text-center font-bold text-secondary">
        Completa il tuo ordine
      </h1>
      <form @submit.prevent="submitPayment">
        <input
          v-model="name"
          placeholder="Nome"
          :class="{ 'invalid-field': nameError }"
        />
        <input
          v-model="surname"
          placeholder="Cognome"
          :class="{ 'invalid-field': surnameError }"
        />
        <input
          v-model="message"
          placeholder="Messaggio"
          :class="{ 'invalid-field': messageError }"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          :class="{ 'invalid-field': emailError }"
        />
        <div id="dropin-container"></div>
        <button ref="payButton" type="submit">Effettua pagamento</button>
      </form>
      <div v-if="showLoader">
        <AppLoader />
      </div>
    </div>
  </div>
</template>
<style scoped>
.my-label {
  margin-bottom: 10px;
}
.invalid-field {
  border: 1px solid red;
  /* altri stili per indicare un campo non valido */
}

#card:hover {
  transform: rotateY(180deg);
}

#card > div:nth-child(1) {
  transition-delay: 150ms;
}

#card:hover > div:nth-child(1) {
  opacity: 0;
  z-index: -1;
}
</style>
