<script setup>
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      v-model.lazy="searchStore.searchValue"
      id="search"
      type="text"
      placeholder="Search..."
      class="pl-10"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
