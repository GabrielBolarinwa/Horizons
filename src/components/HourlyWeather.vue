<template>
  <div class="hourlyWeather">
    <h3 class="weather-header">Hourly Weather</h3>

    <Swiper
      :modules="modules"
      :space-between="50"
      :navigation="{ prevEl: '.prevSlide', nextEl: '.nextSlide' }"
      :pagination="{ clickable: true }"
      :a11y="true"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
    >
      <SwiperSlide v-for="hour in weatherData">
        <div class="forecast_card">
          <p class="heading-time">{{ formatTime(hour.time) }}</p>
          <div class="weather-icon">
            <img
              :src="hour.condition.icon"
              alt="Weather Icon"
              height="64"
              width="64"
            />
          </div>
          <p class="temp" :style="{ color: getTempColor(hour.temp_c) }">
            {{
              temperatureUnit === "fahrenheit"
                ? `${hour.temp_f}°F`
                : `${hour.temp_c}°C`
            }}
          </p>
          <p class="condition">{{ hour.condition.text }}</p>
          <div class="city_details">
            <div class="detail_item">
              <p class="detail_label"><Thermometer /> Feels like</p>
              <p
                class="detail_value"
                :style="{ color: getTempColor(hour.feelslike_c) }"
              >
                {{
                  temperatureUnit === "fahrenheit"
                    ? `${hour.feelslike_f}°F`
                    : `${hour.feelslike_c}°C`
                }}
              </p>
            </div>
            <div class="detail_item">
              <p class="detail_label"><CloudRain /> Rain</p>
              <p class="detail_value">{{ hour.chance_of_rain }}%</p>
            </div>
            <div class="detail_item">
              <p class="detail_label"><Wind /> Wind</p>
              <p class="detail_value">{{ hour.wind_mph }} mph</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <button class="prevSlide"><ChevronLeft /></button>
      <button class="nextSlide"><ChevronRight /></button>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { useWeatherStore } from "@/stores/weather";
import { formatTime, getTempColor } from "@/utils";
import {
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Thermometer,
  Wind,
} from "@lucide/vue";
import { storeToRefs } from "pinia";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
const modules = [Navigation, Pagination, A11y, Autoplay];
const { weatherData: fullWeather } = storeToRefs(useWeatherStore());
const { temperatureUnit } = storeToRefs(useAppStore());
const weatherData = fullWeather.value?.forecast.forecastday[0]?.hour;
</script>

<style scoped>
.hourlyWeather {
  width: 100%;
  background: var(--card-bg);
  padding: var(--space-10);
  border-radius: var(--radius-card);
  @media (max-width: 425px) {
    padding: var(--space-6);
  }
  .weather-header {
    color: var(--secondary);
    margin-bottom: var(--space-6);
  }
  :is(.prevSlide, .nextSlide) {
    position: absolute;
    top: 0;
    border-radius: var(--radius-pill);
    width: var(--space-10);
    height: var(--space-10);
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    z-index: 2;
    &.prevSlide {
      left: 0;
    }
    &.nextSlide {
      right: 0;
    }
  }
  .forecast_card {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin-top: var(--space-4);
    padding-bottom: 4rem;
    .heading-time {
      font-weight: bolder;
    }
    .weather-icon {
      width: 85px;
      height: 85px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-block: var(--space-4);
      img {
        object-fit: cover;
      }
    }
    .temp {
      font-size: 2rem;
    }
    .condition {
      color: var(--muted);
    }
    .city_details {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1em;
      width: 100%;
      .detail_item {
        background: var(--card-bg-3);
        padding: var(--space-10);
        width: 33.3%;
        border-radius: var(--radius-chip);
        height: 12rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        @media (max-width: 425px) {
          padding: var(--space-3);
        }
        .detail_label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5em;
          width: 100%;
          color: var(--muted);
          margin-bottom: var(--space-2);
          svg {
            color: var(--accent);
          }
        }
      }
    }
  }
}
</style>
