<template>
  <section class="weather-data" aria-live="polite" id="weather-data">
    <div class="weatherData">
      <div class="main-weather">
        <CurrentWeather />
        <HourlyWeather />
        <WeatherForecast />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CurrentWeather from "./CurrentWeather.vue";
import HourlyWeather from "./HourlyWeather.vue";
import WeatherForecast from "./WeatherForecast.vue";
</script>

<style scoped>
section.weather-data {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  .weatherData {
    width: 100%;
  }
}

section.weather-data .weather-info:hover {
  transform: translateY(-5px);
}

.main-weather {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  gap: 1em;
  & > div {
    width: 100%;
  }
}
</style>
