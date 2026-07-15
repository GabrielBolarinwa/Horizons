import { useFetchWeather } from "@/composables/useFetchWeather";
import { useCurrentLocation } from "@/composables/useGeolocation";
import type { ApiErrorResponse, WeatherAPIResponse } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";

export const useWeatherStore = defineStore("WeatherStore", () => {
  const weatherData = ref<WeatherAPIResponse | undefined>(undefined);
  const loading = ref<boolean>(false);
  async function getCityWeatherData(location: string) {
    loading.value = true;
    let timeout = 10000;
    try {
      const weatherResponse = await useFetchWeather(location, timeout);
      if (weatherResponse.status === 400) {
        const errorResponse =
          (await weatherResponse.json()) as ApiErrorResponse;
        if (errorResponse.error.code === 1003) {
          toast.error("Please enter a city");
        } else if (errorResponse.error.code === 1006) {
          toast.error(
            "The location you entered was not found, please try a different location",
          );
        } else if (errorResponse.error.code === 9999) {
          toast.error("Internal application error");
        }
        return;
      }
      weatherData.value = (await weatherResponse.json()) as WeatherAPIResponse;
    } catch (err) {
      if ((err as unknown as any).name === "AbortError") {
        loading.value = false;
        timeout += 1000;
        return;
      }
      console.error(err);
      toast.error(
        "Failed to get weather data, please check your internet and try again",
      );
      throw err;
    }
    loading.value = false;
    timeout += 1000;
  }
  async function getCurrLocationWeather() {
    loading.value = true;
    try {
      const position = (await useCurrentLocation()) as GeolocationPosition;
      if (position.coords.accuracy > 500) {
        toast.warning(
          "Location accuracy is low, consider using the search for precise location",
        );
      }

      let timeout = 10000;

      timeout += 1000;
      const location = `${position.coords.latitude} ${position.coords.longitude}`;
      try {
        const weatherResponse = await useFetchWeather(location.trim(), timeout);

        if (weatherResponse.status === 400) {
          const errorResponse =
            (await weatherResponse.json()) as ApiErrorResponse;
          if (errorResponse.error.code === 1003) {
            toast.error("Please enter a city");
          } else if (errorResponse.error.code === 1006) {
            toast.error(
              "The location you entered was not found, please try a different location",
            );
          } else if (errorResponse.error.code === 9999) {
            toast.error("Internal application error");
          }
          console.error(errorResponse.error.message);
          return;
        } else if (weatherResponse.ok) {
          weatherData.value =
            (await weatherResponse.json()) as WeatherAPIResponse;
        }
      } catch (err) {
        console.error(err);
        toast.error(
          "Failed to get weather data, please check your network connection and try again",
        );
      }
    } catch (err) {
      const error = err as unknown as GeolocationPositionError;
      if (error.code === 1) {
        toast.error(
          "Location permission denied, please allow location info usage or check your location services settings",
        );
      } else if (error.code === 2) {
        toast.error(
          "Could not determine your location, please check again later",
        );
      } else if (error.code === 3) {
        toast.error(
          "Location request timeout, please move to a better location for better GPS position or better connectivity",
        );
      }
      console.error(error.message);
    }
    loading.value = false;
  }
  return {
    loading,
    weatherData,
    getCityWeatherData,
    getCurrLocationWeather,
  };
});
