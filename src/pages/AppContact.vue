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
      email: "",
      name: "",
      surname: "",
      message: "",
      showSuccess: false,
      isSending: false,
      hasErrors: false,
      hostedFieldInstance: false,
      nonce: "",
      error: "",
      amount: 10,
      paymentToken: null,
      restaurantId: null,
    };
  },
  methods: {
    sendMailtoGuest() {
      this.isSending = true;
      axios
        .post(this.store.baseUrl + "api/guests", {
          email: this.email,
          name: this.name,
          surname: this.surname,
          message: this.message,
        })
        .then((response) => {
          this.isSending = false;

          if (response.data.success) {
            this.showSuccess = true;
            this.resetForm();
          } else {
            this.hasErrors = true;
          }
        });
    },
    closeModal() {
      this.showSuccess = false;
    },
    closeModalErr() {
      this.hasErrors = false;
    },
    resetForm() {
      this.email = "";
      this.name = "";
      this.surname = "";
      this.message = "";
    },
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
                  // handle success
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
  },
  created() {
    this.getProductsCart();

    this.payWithCreditCard();
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
          // styles: {
          //   input: {
          //     "font-size": "14px",
          //     "font-family": "Open Sans",
          //   },
          // },
          fields: {
            number: {
              selector: "#creditCardNumber",
              placeholder: "Enter Credit Card",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "fake-three-digit-cvv-only-nonce",
            },
            expirationDate: {
              selector: "#expireDate",
              placeholder: "00 / 0000",
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
      v-if="showSuccess"
      id="alert-border-3"
      class="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 mt-20"
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
      <div class="ml-3 text-sm font-medium">Ordine inviato con successo!</div>
      <button
        @click="closeModal"
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <span class="sr-only">Dismiss</span>
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

    <h1 class="text-5xl text-center font-bold">Riepilogo Ordine</h1>

    <form
      class="my-32 max-w-7xl mx-auto"
      @submit.prevent="payWithCreditCard"
      novalidate
    >
      <div class="relative z-0 w-full mb-6 group">
        <input
          v-model="email"
          type="email"
          id="email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email</label
        >
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="name"
            type="text"
            id="name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none -blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Nome</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="surname"
            type="text"
            id="surname"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none -blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="surname"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Cognome</label
          >
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="message"
            type="text"
            name="message"
            id="message"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="message"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Messaggio</label
          >
        </div>
      </div>

      <div class="form-group">
        <label>Credit Card Number</label>
        <div id="creditCardNumber" class="form-control"></div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-6">
            <label>Expire Date</label>
            <div id="expireDate" class="form-control"></div>
          </div>
          <div class="col-6">
            <label>CVV</label>
            <div id="cvv" class="form-control"></div>
          </div>
        </div>
      </div>
      <!-- @click.prevent="payWithCreditCard" -->

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        :disabled="isSending"
      >
        Paga Ora!
      </button>
    </form>

    <!-- <div id="dropin-wrapper" class="max-w-sm mx-auto mb-8">
      <div id="checkout-message"></div>
      <div id="dropin-container"></div>
      <button id="submit-button">Submit payment</button>
    </div>
  </div> 
  <div>-->
  </div>
</template>
<!-- 
  <div>
      <label for="amount">Amount</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>
        <input
          type="number"
          id="amount"
          v-model="amount"
          class="form-control"
          placeholder="Enter Amount"
        />
      </div>
    </div>
        <form>
        <div class="form-group">
          <label for="amount">Amount</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
            </div>
            <input
              type="number"
              id="amount"
              v-model="amount"
              class="form-control"
              placeholder="Enter Amount"
            />
          </div>
        </div>
        <hr />
        <div class="form-group">
          <label>Credit Card Number</label>
          <div id="creditCardNumber" class="form-control"></div>
        </div>
        <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label>Expire Date</label>
                <div id="expireDate" class="form-control"></div>
              </div>
              <div class="col-6">
                <label>CVV</label>
                <div id="cvv" class="form-control"></div>
              </div>
            </div>
            </div>
          </form>
        <button
          class="btn btn-primary btn-block"
          @click.prevent="payWithCreditCard"
        >
          Pay with Credit Card
        </button>
 -->
<style></style>
