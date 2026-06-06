<template>
  <header>
    <div class="app-brand">
      <img
        src="/favicon.webp"
        alt="weather logo"
        height="738"
        width="781"
        fetchpriority="high"
        loading="eager"
      />
      <h1>Horizons</h1>
    </div>
    <div class="settingButtons">
      <button
        class="themeSwitcher"
        @click="store.toggleTheme"
        aria-label="Switch Theme"
        title="Switch Theme"
      >
        <SunMoon height="32" width="32" />
      </button>
      <button
        class="tempUnitSwitcher"
        @click="store.toggleTemperatureUnit"
        aria-label="Switch Temperature Unit"
        title="Switch Temperature Unit"
      >
        <span v-if="store.temperatureUnit === 'celsius'">°C</span>
        <span v-else>°F</span>
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { SunMoon } from "@lucide/vue";
const store = useAppStore();
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .app-brand {
    display: flex;
    align-items: center;
    gap: 0.75em;
    img {
      height: 50px;
      width: auto;
    }
    h1 {
      font-size: var(--text-2xl);
      font-weight: 700;
    }
  }
  .settingButtons {
    display: flex;
    gap: 1.355em;
    button {
      padding: var(--space-2) 0.75rem;
      font-size: 1.25rem;
      border-radius: 10px;
    }
  }
}
</style>
