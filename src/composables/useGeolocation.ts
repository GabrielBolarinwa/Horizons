import { useWeatherStore } from "@/stores/weather";

export async function useCurrentLocation() {
  const weatherStore = useWeatherStore();
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        weatherStore.setLocationData({
          accuracy: position.coords.accuracy,
          location: `${position.coords.latitude} ${position.coords.longitude}`,
        }),
      () => {
        weatherStore.setError(
          "Failed to get location please move to a better location or check your settings",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  } else {
    weatherStore.setError(
      "Your browser does not support location services, please update your browser or check your phone's location settings",
    );
  }
}
