<template>
  <footer class="sticky z-10 bottom-0 bg-background py-5 border-t font-semibold">
    <section class="flex justify-between">
      <p>
        Made by ❤️
        <a
          class="underline"
          href="https://github.com/BenyaminKeshavarz"
          target="_blank"
          >Benyamin</a
        >
      </p>

      <p>&copy; {{ year }}</p>
    </section>
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
