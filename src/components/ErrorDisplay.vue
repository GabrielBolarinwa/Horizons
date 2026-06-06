<template>
  <p class="errorDisplay">{{ error }}</p>
</template>

<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const { error } = storeToRefs(useWeatherStore());
</script>

<style scoped>
.errorDisplay {
  display: block;
  text-align: center;
  color: #ff4500;
  font-weight: 900;
  font-style: italic;
  background: #3333;
  margin-inline: auto;
  padding: var(--space-4);
  text-shadow: 2px 2px 5px #ff450080;
}
</style>
