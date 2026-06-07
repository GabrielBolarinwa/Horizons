<template>
  <form
    class="main_form"
    role="search"
    id="app-form"
    @submit.prevent="getCityWeatherData(weatherInput!.value)"
  >
    <div class="input-box">
      <label for="form_input" class="offscreen">Search for a city</label>
      <input
        type="text"
        name="form_input"
        placeholder="e.g. New York"
        id="form_input"
        class="form_input"
        autocomplete="address-level2"
        :disabled="loading"
        ref="weatherInput"
      />
    </div>
    <div class="weatherButtons">
      <button
        type="submit"
        class="form_button"
        aria-label="Get Weather"
        title="Get Weather"
      >
        <ArrowRight :size="22" color="#3b72f6" />
      </button>
      <button
        class="currentLocation"
        type="button"
        @click="getCurrLocationWeather()"
        aria-label="Use Current Location"
        title="Use Current Location"
      >
        <MapPin :size="22" color="#3b72f6" />
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ArrowRight, MapPin } from "@lucide/vue";
import { ref } from "vue";
import { useWeatherStore } from "../stores/weather.ts";
const { loading, getCityWeatherData, getCurrLocationWeather } =
  useWeatherStore();
const weatherInput = ref<HTMLInputElement>();
</script>

<style>
form.main_form {
  display: grid;
  align-items: center;
  gap: var(--space-4);
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 1fr);
  width: 100%;
  margin-inline: auto;
  padding: var(--space-8) 0;
  border-radius: var(--radius-section);
  .input-box {
    grid-column: 1 / 6;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      display: block;
      background: var(--accent);
      width: 90%;
      height: 2px;
      bottom: 3px;
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      transition: transform 0.5s;
    }
    &:focus-within::after {
      transform: translateX(-50%) scaleX(1);
    }
    .form_input {
      font-size: var(--text-sm);
      font-weight: normal;
      width: 100%;
      padding: var(--space-3);
      padding-left: var(--space-8);
      border: var(--input-border);
      border-radius: 10px;
      color: inherit;
      background: var(--card-bg);
    }
  }
  .weatherButtons {
    display: flex;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
    grid-column: auto;
    height: 100%;
    button {
      height: 100%;
      width: 3rem;
      padding-inline: var(--space-2);
      border-radius: var(--radius-btn);
    }
  }
}
</style>
