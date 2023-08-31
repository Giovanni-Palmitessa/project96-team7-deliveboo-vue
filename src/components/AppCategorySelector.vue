<script>
export default {
  props: ["categories"],
  data() {
    return {
      selectedCategories: [],
    };
  },
  methods: {
    filterRestaurants() {
      this.$emit(
        "filtered",
        this.selectedCategories.map((category) => category.id)
      );
    },
  },
};
</script>

<template>
  <div>
    <div>
      <form @submit.prevent="filterRestaurants">
        <div v-for="category in categories" :key="category.id">
          <input
            type="checkbox"
            :value="category"
            v-model="selectedCategories"
          />
          {{ category.name }}
        </div>
        <button type="submit">Filtra</button>
      </form>
    </div>
  </div>
</template>
