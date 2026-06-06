import { useWeatherStore } from "@/stores/weather";

const controller = new AbortController();
export async function useFetchWeather(
  weatherLocation: string,
  timeout: number,
) {
  const { setError } = useWeatherStore();
  let timeoutId: number | undefined;
  timeoutId = setTimeout(() => {
    controller.abort();
    setError("Request timed out, please check your connection and try again");
  }, timeout);
  const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${weatherLocation}&days=3&aqi=no&alerts=no`;
  let res = await fetch(apiURL, { signal: controller.signal });
  clearTimeout(timeoutId);

  return res;
}
