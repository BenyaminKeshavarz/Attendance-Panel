<template>
  <main>
    <Breadcrumb :breadcrumb-items="breadcrumb" />

    <ul class="space-y-3 mt-5">
      <li v-for="item in classes" :key="'semester' + item.id">
        <RouterLink :to="`/classes?semester=${item.id}`">
          <Card :title="item.title" :description="item.description" />
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

import Breadcrumb from "@/components/tools/Breadcrumb.vue";
import Card from "@/components/tools/Card.vue";

import { useSearchStore } from "@/stores/searchStore";

const breadcrumb = [
  {
    title: "Semesters List",
    link: "/",
  },
  {
    title: "Classes List",
    link: "",
  },
];

const route = useRoute();

const searchStore = useSearchStore();

let classesData = [];
const classes = ref([]);

onMounted(async () => {
  try {
    const httpResponse = await fetch(
      `${import.meta.env.BASE_URL}data/classes.json`
    );
    const data = await httpResponse.json();
    classesData = data.filter(
      (current) => current.semesterId == route.query["semester"]
    );
    classes.value = classesData;
  } catch (error) {
    console.error("Failed to load classes:", error);
  }
});

watch(
  () => searchStore.searchValue,
  (value) => {
    classes.value = classesData.filter((current) => {
      const lowerCaseValue = value.toLowerCase();
      return (
        current.title.toLowerCase().includes(lowerCaseValue) ||
        current.description.toLowerCase().includes(lowerCaseValue)
      );
    });
  }
);
</script>
