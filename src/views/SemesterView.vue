<template>
  <main :dir="dir">
    <ul v-if="semesters?.length > 0" class="space-y-3">
      <li v-for="item in semesters" :key="'semester' + item.id">
        <RouterLink :to="`/classes?semester=${item.id}`">
          <Card :title="item.title" />
        </RouterLink>
      </li>
    </ul>

    <EmptyCard v-else />
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import { useFetchData } from "@/composables/useFetchData";

import Card from "@/components/tools/Card.vue";
import EmptyCard from "@/components/tools/EmptyCard.vue";

const searchStore = useSearchStore();
const { getSemesters } = useFetchData();

let dir = "ltr";
let semestersData = [];
const semesters = ref([]);

onMounted(async () => {
  const { data, direction } = await getSemesters();
  semestersData = data;
  dir = direction;
  semesters.value = semestersData;
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
