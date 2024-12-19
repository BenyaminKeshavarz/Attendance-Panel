<script setup>
import Navbar from "@/components/global/Navbar.vue";
import Footer from "@/components/global/Footer.vue";
</script>

<template>
  <div class="container flex flex-col min-h-dvh">
    <Navbar />

    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component class="mb-5" :is="Component" />
      </Transition>
    </RouterView>

    <Footer class="mt-auto" />
  </div>
</template>
