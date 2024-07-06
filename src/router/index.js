import { createRouter, createWebHistory } from "vue-router";
import CountriesList from "../components/CountriesList.vue";
import CountryDetails from "../components/CountryDetails.vue";

const routes = [
  {
    path: "/",
    name: "Countries",
    component: CountriesList,
  },
  {
    path: "/country/:alpha3Code",
    name: "CountryDetails",
    component: CountryDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
