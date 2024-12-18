<template>
  <footer class="flex justify-between mt-5 py-5 border-t font-semibold">
    <p>
      Made by ❤️
      <a class="underline" href="https://github.com/BenyaminKeshavarz" target="_blank"
        >Benyamin</a
      >
    </p>

    <p>&copy; {{ year }}</p>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const initialYear = 2024;
const currentYear = new Date().getFullYear();

const year = computed(() =>
  initialYear === currentYear ? initialYear : `${initialYear} - ${currentYear}`
);
</script>
