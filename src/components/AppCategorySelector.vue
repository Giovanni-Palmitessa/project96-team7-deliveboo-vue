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
      // Invia gli elementi selezionati al componente genitore
      this.$emit("filtered", this.selectedCategories);
    },
  },
};
</script>

<template>
  <div>
    <div>
      <form @submit.prevent="filterRestaurants">
        <div v-for="category in categories" :key="category.name">
          <input
            type="checkbox"
            :value="category.name"
            v-model="selectedCategories"
          />
          {{ category.name }}
        </div>
        <button type="submit">Filtra</button>
      </form>
    </div>
  </div>
</template>

<style></style>
