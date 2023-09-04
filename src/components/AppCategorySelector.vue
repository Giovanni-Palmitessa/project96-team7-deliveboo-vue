<script>
export default {
  props: ["categories"],
  data() {
    return {
      selectedCategories: [],
    };
  },
  methods: {
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category);
      if (index === -1) {
        this.selectedCategories.push(category);
      } else {
        this.selectedCategories.splice(index, 1);
      }
    },
    isSelected(category) {
      return this.selectedCategories.includes(category);
    },
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
        <div class="flex justify-around">
          <div
            class="category-button"
            v-for="category in categories"
            :key="category.id"
          >
            <button
              type="button"
              class="category-button"
              :class="{ 'category-selected': isSelected(category) }"
              @click="toggleCategory(category)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        <div class="mt-10">
          <button type="submit" class="filter-button">Filtra</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.category-button {
  display: flex;
  text-align: center;
  justify-content: space-between;
  background-color: #00846b;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.category-selected {
  background-color: #ffc244; /* Cambia il colore di sfondo al passaggio del mouse */
}

.filter-button {
  justify-self: center;
  background-color: #00846b; /* Colore di sfondo del pulsante */
  color: white; /* Colore del testo del pulsante */
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.filter-button:hover {
  background-color: #ffc244; /* Cambia il colore di sfondo al passaggio del mouse */
}
</style>
