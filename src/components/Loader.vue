<template>
  <div class="skeletons">
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </div>
</template>

<script setup lang="ts">
import Skeleton from "./Skeleton.vue";
</script>

<style lang="css" scoped>
.skeletons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2em;
}
</style>
