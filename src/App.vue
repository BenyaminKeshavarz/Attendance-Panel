<script setup>
import Navbar from "@/components/global/Navbar.vue";
import Footer from "@/components/global/Footer.vue";
</script>

<template>
  <div class="container flex flex-col min-h-dvh">
    <Navbar />

    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <Footer class="mt-auto" />
  </div>
</template>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
