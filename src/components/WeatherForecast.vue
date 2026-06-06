<template>
  <div class="forecast_weather">
    <h3 class="weather_header">
      {{ weatherData?.forecastday.slice(1).length }}-Day Forecast
    </h3>
    <ul class="forecast_list">
      <li
        class="forecast_item"
        v-for="forecast in weatherData?.forecastday.slice(1)"
        tabindex="0"
      >
        <div class="forecast-heading">
          <p>
            {{ formatDayOfWeek(`${forecast.date} 00:00`) }}
          </p>
          <p class="forecast-temperatures" v-if="temperatureUnit === 'celsius'">
            <span :style="{ color: getTempColor(forecast.day.mintemp_c) }"
              >{{ forecast.day.mintemp_c }}°C</span
            >
            <span :style="{ color: getTempColor(forecast.day.maxtemp_c) }">
              {{ forecast.day.maxtemp_c }}°C</span
            >
          </p>
          <p
            class="forecast-temperatures"
            v-else-if="temperatureUnit === 'fahrenheit'"
          >
            <span :style="{ color: getTempColor(forecast.day.mintemp_c) }"
              >{{ forecast.day.mintemp_f }}°F</span
            >
            <span :style="{ color: getTempColor(forecast.day.maxtemp_c) }">
              {{ forecast.day.maxtemp_f }}°F</span
            >
          </p>
        </div>
        <div class="conditions">
          <img
            :src="forecast.day.condition.icon"
            class="weather-icon"
            alt="condition-image"
            height="64"
            width="64"
          />
          <p class="city_conditions">
            {{ forecast.day.condition.text }}
          </p>
        </div>
        <section class="city_details">
          <div class="detail-item">
            <p class="detail-label">
              <CloudRain />
              Rain
            </p>
            <p class="detail-value">{{ forecast.day.daily_chance_of_rain }}%</p>
          </div>

          <div class="detail-item">
            <p class="detail-label">
              <Sun />
              UV Index
            </p>
            <p class="detail-value">{{ forecast.day.uv }}</p>
          </div>
          <div class="detail-item">
            <p class="detail-label">
              <Wind />
              Max Wind Speed
            </p>
            <p class="detail-value">{{ forecast.day.maxwind_mph }} mph</p>
          </div>
          <div class="detail-item">
            <p class="detail-label">
              <Droplets />
              Humidity
            </p>
            <p class="detail-value">{{ forecast.day.avghumidity }}%</p>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.forecast_weather {
  background: var(--card-bg);
  padding: var(--space-10);
  border-radius: var(--radius-card);
  border: 1px solid var(--muted);
  @media (max-width: 425px) {
    padding: var(--space-6);
  }
  .weather_header {
    color: var(--secondary);
    margin-bottom: var(--space-6);
  }
  .forecast_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;
    list-style-type: none;
    li.forecast_item {
      background: var(--card-bg-3);
      width: 100%;
      padding: var(--space-4) var(--space-6);
      border-radius: var(--radius-card);
      height: auto;
      .forecast-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
        p.forecast-temperatures {
          display: flex;
          align-items: center;
          gap: 1em;
        }
      }
      .conditions {
        display: flex;
        align-items: center;
        gap: 1em;
        margin-block: var(--space-4);
        .weather-icon {
          width: 50px;
        }
        .city_conditions {
          color: var(--muted);
        }
      }
      .city_details {
        display: flex;
        align-items: center;
        margin-right: var(--space-2);
        flex-wrap: wrap;
        gap: 1em;
        .detail-item {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5em;
          color: var(--meta);
          overflow: hidden;
          word-wrap: break-word;
          text-wrap: wrap;
          text-overflow: clip;
          width: 45%;
          .detail-label {
            display: flex;
            gap: 0.5em;
            justify-content: center;
            align-items: center;
            svg {
              color: var(--accent);
            }
          }
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { useWeatherStore } from "@/stores/weather";
import { formatDayOfWeek, getTempColor } from "@/utils";
import { CloudRain, Droplets, Sun, Wind } from "@lucide/vue";
import { storeToRefs } from "pinia";

const { weatherData: fullWeather } = useWeatherStore();
const { temperatureUnit } = storeToRefs(useAppStore());
const weatherData = fullWeather?.forecast;
</script>
