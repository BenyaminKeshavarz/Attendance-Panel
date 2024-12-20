<template>
  <header
    class="fixed w-full flex items-center justify-center z-10 top-0 left-0 bg-background border-b sm:py-5 py-4"
  >
    <nav
      class="container flex justify-between items-center sm:gap-4 gap-3 max-sm:flex-col"
    >
      <span class="inline-flex items-center font-extrabold text-3xl">
        <IconUserList class="size-11 me-1 mt-0.5 text-primary" />
        <span>Attend</span><span class="text-primary">Ease</span>
      </span>

      <div class="flex items-center gap-2 max-sm:w-full">
        <SearchInput v-model="searchStore.searchValue" />

        <ThemeSwitcher />
      </div>
    </nav>
  </header>
</template>

<script setup>
import ThemeSwitcher from "@/components/tools/ThemeSwitcher.vue";
import SearchInput from "@/components/tools/SearchInput.vue";
import IconUserList from "@/components/icons/IconUserList.vue";

import { useSearchStore } from "@/stores/searchStore";
const searchStore = useSearchStore();
</script>
