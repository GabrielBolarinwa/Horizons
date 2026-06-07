<script setup lang="ts">
import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";
import Weather from "@/components/Weather.vue";
import { watch } from "vue";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import WeatherForm from "./components/WeatherForm.vue";
import { useAppStore } from "./stores/app.ts";
import { useWeatherStore } from "./stores/weather.ts";
const weatherStore = useWeatherStore();
const appStore = useAppStore();
watch(
  () => appStore.theme,
  (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  },
  { immediate: true },
);
</script>

<template>
  <main class="container" id="app_container" role="main">
    <Header />
    <WeatherForm />
    <article class="resultDisplay">
      <Loader v-if="weatherStore.loading" />
      <Weather v-else-if="weatherStore.weatherData" />
    </article>
  </main>
  <Toaster
    position="bottom-right"
    :theme="appStore.theme"
    :richColors="true"
    expand
  />
</template>
