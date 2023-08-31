<script>
export default {
  data() {
    return {};
  },
  props: {
    restaurant: Object,
  },
  methods: {
    setRestaurantId(index) {
      sessionStorage.removeItem("restaurantId");
      sessionStorage.setItem("restaurant_id", index);
      console.log(sessionStorage.getItem("restaurant_id"));
    },
  },
};
</script>

<template>
  <div class="bg-primary border border-gray-200 rounded-lg shadow">
    <a href="#">
      <img class="rounded-t-lg" src="../../public/img/rest01.jpg" alt="" />
    </a>
    <div class="p-5 bg-primary">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {{ restaurant.name }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-sm text-gray-700">
        {{ restaurant.description }}
      </p>
      <template v-for="category in restaurant.categories">
        <a class="flex gap-2 mb-3 text-sm font-semibold" href="#">
          {{ category.name }}
        </a>
      </template>
      <RouterLink
        :to="{ name: 'menu' }"
        class="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-secondary rounded-lg hover:bg-b_hover focus:ring-4 focus:outline-none focus:ring-secondary"
        @click.prevent="setRestaurantId(restaurant.id)"
      >
        Vai al Menù
        <svg
          class="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
