import { useFetchWeather } from "@/composables/useFetchWeather";
import { useCurrentLocation } from "@/composables/useGeolocation";
import type { ApiErrorResponse, WeatherAPIResponse } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWeatherStore = defineStore("WeatherStore", () => {
  const weatherData = ref<WeatherAPIResponse | undefined>(undefined);
  const loading = ref<boolean>(false);
  const error = ref<string>("");
  const locationData = ref<
    | {
        location: string;
        accuracy: number;
      }
    | undefined
  >(undefined);
  async function getCityWeatherData(location: string) {
    error.value = "";
    loading.value = true;
    let timeout = 10000;
    try {
      const weatherResponse = await useFetchWeather(location, timeout);
      if (weatherResponse.status === 400) {
        const errorResponse =
          (await weatherResponse.json()) as ApiErrorResponse;
        if (errorResponse.error.code === 1003) {
          error.value = "Please enter a city";
        } else if (errorResponse.error.code === 1006) {
          error.value =
            "The location you entered was not found, please try a different location";
        } else if (errorResponse.error.code === 9999) {
          error.value = "Internal application error";
        }
        console.log(errorResponse.error.message);
        return;
      }
      weatherData.value = (await weatherResponse.json()) as WeatherAPIResponse;
    } catch (err) {
      console.error(err);
      error.value =
        "Failed to get weather data, please check your location and try again";
    }
    loading.value = false;
    timeout += 1000;
  }
  async function getCurrLocationWeather() {
    error.value = "";

    loading.value = true;
    let timeout = 10000;
    let weatherResponse;
    await useCurrentLocation();
    if (locationData.value?.location) {
      try {
        weatherResponse = await useFetchWeather(
          locationData.value.location.trim(),
          timeout,
        );
        if (weatherResponse.status === 400) {
          const errorResponse =
            (await weatherResponse.json()) as ApiErrorResponse;
          if (errorResponse.error.code === 1003) {
            error.value = "Please enter a city";
          } else if (errorResponse.error.code === 1006) {
            error.value =
              "The location you entered was not found, please try a different location";
          } else if (errorResponse.error.code === 9999) {
            error.value = "Internal application error";
          }
          console.log(errorResponse.error.message);
          return;
        }
        weatherData.value =
          (await weatherResponse.json()) as WeatherAPIResponse;
      } catch (err) {
        console.error(err);
        error.value =
          "Failed to get weather data, please check your network connection and try again";
      }
    }
    loading.value = false;
    timeout += 1000;
  }
  function setError(errorString: string) {
    error.value = errorString;
  }
  function setLocationData(locationResponse: {
    accuracy: number;
    location: string;
  }) {
    locationData.value = locationResponse;
  }

  return {
    error,
    loading,
    weatherData,
    setError,
    setLocationData,
    getCityWeatherData,
    getCurrLocationWeather,
  };
});
