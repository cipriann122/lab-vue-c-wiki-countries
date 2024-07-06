<template>
  <Navbar />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<style global>
@media (max-width: 600px) {
  .country-info-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .list-group-item {
    width: 100%;
    max-width: 300px;
  }
}
</style>
