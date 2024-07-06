<template>
  <!-- Conditional rendering: If countryInfo is available, display the country details -->
  <div v-if="countryInfo">
    <!-- Centered container for the country flag -->
    <div class="d-flex justify-content-center">
      <img
        :src="`https://flagcdn.com/w320/${countryInfo.alpha2Code.toLowerCase()}.png`"
        :alt="`${countryInfo.name.common} flag`"
        class="mb-4"
      />
    </div>
    <!-- Display the country name -->
    <h2>{{ countryInfo.name.common }}</h2>
    <!-- List group to display country information -->
    <ul class="list-group list-group-flush">
      <!-- List item for the capital -->
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span class="fw-bold">Capital:</span>
        <span>{{ countryInfo.capital[0] }}</span>
      </li>
      <!-- List item for the area -->
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span class="fw-bold">Area:</span>
        <span>{{ countryInfo.area }} km<sup>2</sup></span>
      </li>
      <!-- List item for the borders -->
      <li class="list-group-item">
        <span class="fw-bold">Borders:</span>
        <!-- Conditional rendering for borders: If no borders, display a message -->
        <p v-if="countryInfo.borders.length === 0">
          This country has no land borders
        </p>
        <!-- If there are borders, display a list of bordering countries -->
        <ul v-else>
          <li v-for="border in countryInfo.borders" :key="border">
            <!-- RouterLink for navigation to bordering country details -->
            <RouterLink :to="`/country/${border}`">{{ border }}</RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <!-- Loading message if countryInfo is not yet available -->
  <div v-else class="text-center">Loading country information...</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

// Create a reference to hold the country information
const countryInfo = ref(null);

// Get the current route
const route = useRoute();

// Function to fetch country information based on the alpha-3 code
const fetchCountryInfo = async (alpha3Code) => {
  try {
    // Fetch the country information from the REST Countries API
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${alpha3Code}`
    );
    if (!response.ok) throw new Error("Failed to fetch country info");
    const [data] = await response.json();
    // Update the countryInfo reference with the fetched data
    countryInfo.value = {
      name: data.name,
      alpha2Code: data.cca2,
      capital: data.capital || ["N/A"],
      area: data.area,
      borders: data.borders || [],
    };
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching country info:", error);
  }
};

// Fetch country information when the component is mounted
onMounted(() => fetchCountryInfo(route.params.alpha3Code));

// Watch for changes to the route params (alpha-3 code) and refetch country info
watch(
  () => route.params.alpha3Code,
  (newAlpha3Code) => {
    fetchCountryInfo(newAlpha3Code);
  }
);
</script>
