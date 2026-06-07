import { type temperatureUnit, type theme } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(
  "AppStore",
  () => {
    const theme = ref<theme>("system");
    function toggleTheme() {
      if (theme.value === "system") {
        theme.value = "light";
      } else if (theme.value === "light") {
        theme.value = "dark";
      } else if (theme.value === "dark") {
        theme.value = "system";
      }
    }

    const temperatureUnit = ref<temperatureUnit>("celsius");
    function toggleTemperatureUnit() {
      temperatureUnit.value =
        temperatureUnit.value === "celsius" ? "fahrenheit" : "celsius";
    }
    return { theme, toggleTheme, temperatureUnit, toggleTemperatureUnit };
  },
  { persist: true },
);
