<template>
  <header class="sticky top-0 bg-background border-b py-5 mb-5">
    <nav class="flex justify-between items-center">
      <span class="inline-flex items-center gap-2 font-extrabold text-3xl">
        <IconUserList class="size-8 text-primary" />
        Attendance
      </span>

      <div class="flex items-center gap-2">
        <SearchInput />
        <ThemeSwitcher />
      </div>
    </nav>
  </header>
</template>

<script setup>
import ThemeSwitcher from "@/components/tools/ThemeSwitcher.vue";
import SearchInput from "@/components/tools/SearchInput.vue";
import IconUserList from "@/components/icons/IconUserList.vue";
</script>
