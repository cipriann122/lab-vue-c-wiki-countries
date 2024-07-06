<template>
  <h1 class="text-center">Countries List</h1>
  <!-- Container for the countries list, only shown when countries are loaded -->
  <div class="container" v-if="countries.length">
    <div class="row">
      <!-- Left column for the list of countries -->
      <div class="col-sm-4">
        <ul class="list-group py-4">
          <!-- Loop through each country and create a link -->
          <RouterLink
            v-for="country in countries"
            :key="country.alpha3Code"
            :to="`/country/${country.alpha3Code}`"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <!-- Display country flag -->
            <img
              :src="`https://flagcdn.com/w40/${country.alpha2Code.toLowerCase()}.png`"
              :alt="`${country.name.common} flag`"
              class="me-2 country-flag"
            />
            <!-- Display country name -->
            <span>{{ country.name.common }}</span>
          </RouterLink>
        </ul>
      </div>
      <!-- Right column for displaying country details -->
      <div class="col-sm-8">
        <RouterView />
      </div>
    </div>
  </div>
  <!-- Loading message shown while fetching countries -->
  <div v-else class="text-center">Loading countries...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

// Reactive reference to store the list of countries
const countries = ref([]);

// Function to fetch countries from the API
const fetchCountries = async () => {
  try {
    console.log("Fetching countries...");
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Failed to fetch countries");
    const data = await response.json();
    console.log("Fetched countries:", data);

    // Process and sort the fetched data
    countries.value = data
      .map((country) => ({
        alpha3Code: country.cca3,
        alpha2Code: country.cca2,
        name: {
          common: country.name.common,
        },
      }))
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error("Error fetching countries:", error);
    errorMessage.value = "Failed to load countries. Please try again.";
  }
};

// Call fetchCountries when the component is mounted
onMounted(() => {
  console.log("Component mounted");
  fetchCountries();
});
</script>

<style scoped>
/* Style for the country flag images */
.country-flag {
  width: 40px;
  height: auto;
}
</style>
