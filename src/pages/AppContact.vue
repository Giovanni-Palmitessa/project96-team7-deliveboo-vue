<script>
import axios from "axios";
import braintree from "braintree-web";
import { store } from "../store";
import { initFlowbite } from "flowbite";

export default {
  data() {
    return {
      store,
      products: [],
      hostedFieldInstance: false,
      hostedFieldInstance: false,
      email: "",
      name: "",
      surname: "",
      message: "",
      nonce: "",
      error: "",
      amount: 10,
      paymentToken: null,
      restaurantId: null,
      hasErrors: false,
      emailError: "",
      nameError: "",
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

    payWithCreditCard() {
      if (this.hostedFieldInstance) {
        this.error = "";
        this.nonce = "";

        this.hostedFieldInstance
          .tokenize()
          .then((payload) => {
            console.log(payload);
            this.nonce = payload.nonce;

            // Verifica le validazioni dei campi
            if (!this.email || !this.name || !this.surname || !this.message) {
              this.hasErrors = true;
              return; // Esci se ci sono errori
            }

            // Imposta gli errori per i campi specifici
            if (!this.email) {
              this.emailError = "Campo email obbligatorio";
            } else {
              this.emailError = ""; // Azzera l'errore se il campo è valido
            }

            // Sending nonce to Laravel API
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
              });
          })
          .catch((err) => {
            console.error(err);
            this.error = err.message;
          });
      }
    },

    closeModalErr() {
      this.hasErrors = false;
    },
  },
  created() {
    this.getProductsCart();

    // this.payWithCreditCard();
  },

  async mounted() {
    await this.getPaymentToken();
    console.log("SERVER TOKEN", this.paymentToken);
    braintree.client
      .create({
        //authorization: "sandbox_93smtrz3_bbgx4xf7h8bx24xg",
        authorization: this.paymentToken,
      })
      .then((clientInstance) => {
        let options = {
          client: clientInstance,
          styles: {
            input: {
              "font-size": "18px",
              "font-family": "Open Sans",
              "font-weight": "500",
            },
          },
          fields: {
            number: {
              selector: "#creditCardNumber",
              placeholder: "Inserisci carta di credito valida",
              prefill: "4111111111111111",
              minlength: 12,
            },
            cvv: {
              selector: "#cvv",
              placeholder: "fake-three-digit-cvv-only-nonce",
              prefill: "123",
              minlength: 3,
              maxlength: 3,
            },
            expirationDate: {
              selector: "#expireDate",
              placeholder: "00 / 0000",
              prefill: "12/2023",
            },
          },
        };

        return braintree.hostedFields.create(options);
      })
      .then((hostedFieldInstance) => {
        this.hostedFieldInstance = hostedFieldInstance;
        console.log(hostedFieldInstance);
      })
      .catch((err) => {
        // gestione errori
        console.log(err);
      });
  },
};
</script>
<template>
  <div class="mt-40">
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

    <h1 class="text-5xl text-center font-bold text-secondary">
      Riepilogo Ordine
    </h1>

    <form class="my-20 max-w-5xl mx-auto px-10" novalidate>
      <div class="relative z-0 w-full mb-6 group">
        <input
          v-model="email"
          type="email"
          id="email"
          class="block py-5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          for="email"
          class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email</label
        >
      </div>

      <div v-if="emailError || emailError" class="text-red-500 mt-2">
        {{ hasErrors ? "il campo email è richiesto!" : emailError }}
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="name"
            type="text"
            id="name"
            class="block py-5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none -blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="name"
            class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Nome</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="surname"
            type="text"
            id="surname"
            class="block py-5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none -blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="surname"
            class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Cognome</label
          >
        </div>
      </div>
      <div class="w-full md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="message"
            type="text"
            name="message"
            id="message"
            class="block py-5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="message"
            class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Messaggio</label
          >
        </div>
      </div>
    </form>

    <form class="my-20 max-w-5xl mx-auto px-10" novalidate>
      <div class="form-group">
        <label for="creditCardNumber" style="color: #00a082">
          Numero carta di credito
        </label>

        <div
          id="creditCardNumber"
          style="
            height: 80px;
            border-bottom: 2px solid #d1d5db;
            margin-bottom: 15px;
          "
        ></div>
      </div>
      <div class="form-group">
        <div class="row" style="display: flex; justify-content: space-between">
          <div class="col-6" style="flex-basis: 45%">
            <label style="color: #00a082">Data di scadenza</label>
            <div
              id="expireDate"
              class="form-control"
              style="
                height: 80px;
                border-bottom: 2px solid #d1d5db;
                margin-bottom: 15px;
              "
            ></div>
          </div>
          <div class="col-6" style="flex-basis: 45%">
            <label style="color: #00a082">CVV</label>
            <div
              id="cvv"
              class="form-control"
              style="
                height: 80px;
                border-bottom: 2px solid #d1d5db;
                margin-bottom: 15px;
              "
            ></div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="text-white bg-secondary hover:bg-b_hover focus:ring-4 focus:outline-none font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mt-5"
        @click.prevent="payWithCreditCard"
      >
        Paga Ora!
      </button>
    </form>
  </div>
</template>

<style></style>
