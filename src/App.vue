<script setup>
import Navbar from "@/components/global/Navbar.vue";
import Footer from "@/components/global/Footer.vue";
</script>

<template>
  <div class="container relative flex flex-col min-h-dvh">
    <Navbar />

    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component class="mb-5 pb-20 sm:pt-[108px] pt-[150px]" :is="Component" />
      </Transition>
    </RouterView>

    <Footer class="mt-auto" />
  </div>
</template>
