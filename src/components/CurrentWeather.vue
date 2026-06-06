<template>
  <div class="current-weather weather-info" tabindex="0">
    <h3 class="weather_header">
      {{ weatherData?.location.name }}, {{ weatherData?.location.country }}
    </h3>
    <p class="locationTimetext">
      {{ formatFullDate(weatherData?.location.localtime || "") }}
    </p>
    <div class="temperatureInfo">
      <p
        class="city_temperature"
        :style="{ color: getTempColor(weatherData?.current.temp_c!) }"
      >
        {{
          temperatureUnit === "fahrenheit"
            ? `${weatherData?.current.temp_f}°F`
            : `${weatherData?.current.temp_c}°C`
        }}
      </p>
      <img
        :src="weatherData?.current.condition.icon"
        alt="weather icon"
        class="weather-icon"
        height="64"
        width="64"
      />
    </div>
    <p class="city_conditions">
      {{ weatherData?.current.condition.text }}
    </p>

    <section class="city_details">
      <div class="detail-item">
        <p class="detail-label"><Wind /> Wind</p>
        <p class="detail-value">
          {{ weatherData?.current.wind_mph }} mph
          {{ weatherData?.current.wind_dir }}
        </p>
      </div>
      <div class="detail-item">
        <p class="detail-label"><Gauge /> Pressure</p>
        <p class="detail-value">{{ weatherData?.current.pressure_mb }} mb</p>
      </div>

      <div class="detail-item">
        <p class="detail-label"><Droplets /> Humidity</p>
        <p class="detail-value">{{ weatherData?.current.humidity }}%</p>
      </div>

      <div class="detail-item">
        <p class="detail-label"><Eye /> Visibility</p>
        <p class="detail-value">{{ weatherData?.current.vis_miles }} miles</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { useWeatherStore } from "@/stores/weather";
import { formatFullDate, getTempColor } from "@/utils";
import { Droplets, Eye, Gauge, Wind } from "@lucide/vue";
import { storeToRefs } from "pinia";

const { weatherData } = storeToRefs(useWeatherStore());
const { temperatureUnit } = storeToRefs(useAppStore());
</script>

<style scoped>
.current-weather {
  background: var(--card-bg-2);
  padding: var(--space-10);
  border-radius: var(--radius-card);
  @media (max-width: 425px) {
    padding: var(--space-6);
  }
  .locationTimetext {
    color: var(--secondary);
    font-size: var(--text-sm);
  }

  .temperatureInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .weather-icon {
      width: 150px;
      @media (max-width: 425px) {
        width: 75px;
      }
    }
    .city_temperature {
      font-size: var(--text-hero);
      font-weight: bolder;
    }
  }

  .city_conditions {
    font-size: var(--text-lg);
  }
  .city_details {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);

    gap: var(--space-6) var(--space-4);
    width: 100%;
    margin-top: var(--space-8);
    position: relative;
    flex-wrap: wrap;

    @media (max-width: 425px) {
      grid-template-columns: repeat(2, 1fr);
    }
    hr {
      height: 4rem;
    }
    .detail-item {
      font-family: var(--default-sans-serif-font);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
      padding: var(--size-value-big);
      border-radius: var(--border-radius-default);
      background: var(--detail-bg);
      .detail-label {
        font-size: 0.9rem;
        font-weight: 400;
        font-style: italic;
        color: var(--secondary);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .detail-value {
        font-size: 1.1rem;
        font-weight: 700;
      }
    }
  }
}
</style>
