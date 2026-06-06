<template>
  <div class="skeleton">
    <div class="circle"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.skeleton {
  position: relative;
  background: #e0e0e045;
  border-radius: var(--radius-card);
  overflow: hidden;
  height: 25.125rem;
  width: 100%;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
    animation: shimmer 1.5s infinite;
  }
  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--primary);
    box-shadow: 0 0 15px var(--secondary);
    animation: animate 1s linear infinite;
    margin-inline: auto;
    padding: var(--space-6);
  }
}
@keyframes shimmer {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
