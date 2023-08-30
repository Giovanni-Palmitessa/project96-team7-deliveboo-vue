<script>
export default {};
</script>

<template>
  <div class="mt-[120px] flex justify-between mx-20">
    <!-- Card con l'immagine a sinistra -->
    <div
      class="card-sinistra flex flex-col items-center md:flex-row md:max-w-xl bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        class="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="https://picsum.photos/id/237/200/300"
        alt=""
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Titolo Prodotto
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Descrizione- Ingredienti - Ingredienti - Ingredienti - Ingredienti -.
        </p>
        <div class="rounded-full">Aggiungi al carrello</div>
      </div>
    </div>
    <!-- Riepilogo ordine a destra -->
    <div
      class="max-w-3xl Container-carrello p-6 bg-white rounded-lg shadow-md text-center dark:bg-gray-800"
    >
      <h1 class="text-3xl font-bold mb-6">Carrello</h1>
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold text-gray-900 dark:text-white">
          Prodotti Ordinati
        </h5>
        <a
          href="#"
          class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li class="py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img
                class="w-16 h-16 rounded-lg"
                src="https://picsum.photos/id/237/200/300"
                alt="Product Image"
              />
              <div class="flex-1 min-w-0">
                <p
                  class="text-lg font-medium text-gray-900 dark:text-white truncate"
                >
                  Nome Prodotto
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Qta Ordinata: <span class="font-medium">2</span>
                </p>
              </div>
            </div>
            <div>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">
                €30
              </p>
            </div>
          </div>
        </li>
        <!-- Add more list items here -->
      </ul>
      <div class="mt-4 flex items-center justify-between">
        <h5 class="text-xl font-bold text-gray-900 dark:text-white">Totale:</h5>
        <p class="text-xl font-semibold text-gray-900 dark:text-white">€60</p>
      </div>
      <div class="mt-6">
        <button
          class="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
        >
          Procedi all'acquisto
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional CSS if needed */
.object-cover {
  height: 100%;
}
.card-sinistra {
  height: 200px;
}
.Container-carrello {
  width: 450px;
}
</style>
