<template>
  <header class="sticky z-10 top-0 bg-background border-b py-5 mb-5">
    <nav
      class="flex justify-between items-center"
      :class="{ 'gap-4 max-sm:flex-col': !isStudentPage }"
    >
      <span class="inline-flex items-center font-extrabold text-3xl">
        <IconUserList class="size-11 me-1 mt-0.5 text-primary" />
        <span>Attend</span><span class="text-primary">Ease</span>
      </span>

      <div
        class="flex items-center"
        :class="{ 'gap-2 max-sm:w-full': !isStudentPage }"
      >
        <SearchInput
          v-if="!isStudentPage"
          v-model="searchStore.searchValue"
        />

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
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const searchStore = useSearchStore();

const isStudentPage = computed(() => route.name?.includes("students"));
</script>
