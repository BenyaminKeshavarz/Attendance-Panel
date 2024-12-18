<template>
  <main>
    <ul class="space-y-3">
      <li v-for="item in semesters" :key="'semester' + item.id">
        <RouterLink :to="`/classes?semester=${item.id}`">
          <Card :title="item.title" />
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

import Card from "@/components/tools/Card.vue";

import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

let semestersData = [];
const semesters = ref([]);

onMounted(async () => {
  try {
    const httpResponse = await fetch(
      `${import.meta.env.BASE_URL}data/semesters.json`
    );
    semestersData = await httpResponse.json();
    semesters.value = semestersData;
  } catch (error) {
    console.error("Failed to load semesters:", error);
  }
});

watch(
  () => searchStore.searchValue,
  (value) => {
    semesters.value = semestersData.filter((current) =>
      current.title.toLowerCase().includes(value.toLowerCase())
    );
  }
);
</script>
