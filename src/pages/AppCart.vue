<script>
export default {};
</script>

<template>
  <div class="mt-[120px] flex flex-col-reverse lg:flex-row justify-between sm:mx-0 md:mx-0 lg:mx-20">
    <!-- Card con l'immagine a sinistra -->
    <div class="flex flex-col">
        <div class="card-sinistra gap-3 p-3 flex flex-col md:flex-row md:max-w-full sm:mx-4 md:mx-4 lg:mx-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6">
            <img class="object-cover self-center md:self-start lg:self-start h-32 w-32 rounded-t-lg lg:h-20 lg:w-28 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://picsum.photos/id/237/200/300" alt=""/>
            <div class="flex flex-col justify-between w-full">
                <div class="text-center md:text-start lg:text-start">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nome Prodotto</h5>
                    <p class="mb-3 lg:px-2 font-normal text-gray-700 dark:text-gray-400">
                        Descrizione- Ingredienti - Ingredienti - Ingredienti - Ingredienti -.
                    </p>
                </div>
                <button class="rounded self-center md:self-end lg:self-end w-48 mb-2 mx-4 p-2 text-center bg-red-700 text-white">
                    Rimuovi dal carrello
                </button>
            </div>
        </div>
        <div class="card-sinistra gap-3 p-3 flex flex-col md:flex-row md:max-w-full sm:mx-4 md:mx-4 lg:mx-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6">
            <img class="object-cover self-center md:self-start lg:self-start h-32 w-32 rounded-t-lg lg:h-20 lg:w-28 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://picsum.photos/id/237/200/300" alt=""/>
            <div class="flex flex-col justify-between w-full">
                <div class="text-center md:text-start lg:text-start">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nome Prodotto</h5>
                    <p class="mb-3 lg:px-2 font-normal text-gray-700 dark:text-gray-400">
                        Descrizione- Ingredienti - Ingredienti - Ingredienti - Ingredienti -.
                    </p>
                </div>
                <button class="rounded self-center md:self-end lg:self-end w-48 mb-2 mx-4 p-2 text-center bg-red-700 text-white">
                    Rimuovi dal carrello
                </button>
            </div>
        </div>
        <div class="card-sinistra gap-3 p-3 flex flex-col md:flex-row md:max-w-full sm:mx-4 md:mx-4 lg:mx-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6">
            <img class="object-cover self-center md:self-start lg:self-start h-32 w-32 rounded-t-lg lg:h-20 lg:w-28 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://picsum.photos/id/237/200/300" alt=""/>
            <div class="flex flex-col justify-between w-full">
                <div class="text-center md:text-start lg:text-start">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nome Prodotto</h5>
                    <p class="mb-3 lg:px-2 font-normal text-gray-700 dark:text-gray-400">
                        Descrizione- Ingredienti - Ingredienti - Ingredienti - Ingredienti -.
                    </p>
                </div>
                <button class="rounded self-center md:self-end lg:self-end w-48 mb-2 mx-4 p-2 text-center bg-red-700 text-white">
                    Rimuovi dal carrello
                </button>
            </div>
        </div>
        <div class="card-sinistra gap-3 p-3 flex flex-col md:flex-row md:max-w-full sm:mx-4 md:mx-4 lg:mx-0 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6">
            <img class="object-cover self-center md:self-start lg:self-start h-32 w-32 rounded-t-lg lg:h-20 lg:w-28 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://picsum.photos/id/237/200/300" alt=""/>
            <div class="flex flex-col justify-between w-full">
                <div class="text-center md:text-start lg:text-start">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nome Prodotto</h5>
                    <p class="mb-3 lg:px-2 font-normal text-gray-700 dark:text-gray-400">
                        Descrizione- Ingredienti - Ingredienti - Ingredienti - Ingredienti -.
                    </p>
                </div>
                <button class="rounded self-center md:self-end lg:self-end w-48 mb-2 mx-4 p-2 text-center bg-red-700 text-white">
                    Rimuovi dal carrello
                </button>
            </div>
        </div>
    </div>
    
    

    <!-- Riepilogo ordine a destra -->
    <div
    class="max-w-3xl container-carrello p-6 bg-white rounded-lg shadow-md text-center dark:bg-gray-800 mb-6 lg:mb-0"
    >
      <h1 class="text-3xl text-secondary font-bold mb-6">Carrello</h1>
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
          class="w-full py-2 font-bold text-primary bg-secondary hover:bg-b_hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
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
/* .card-sinistra {
  height: 200px;
} */
/* .container-carrello {
    
    width: 450px;
} */
</style>
