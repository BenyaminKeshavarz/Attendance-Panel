<template>
  <main>
    <Breadcrumb :breadcrumb-items="breadcrumb" />

    <div class="mt-5" :dir="dir">
      <ul v-if="classes?.length > 0"  class="space-y-3">
        <li v-for="item in classes" :key="'semester' + item.id">
          <RouterLink
            :to="`/classes/students?semester=${semesterId}&class=${item.id}`"
          >
            <Card :title="item.title" :description="item.description" />
          </RouterLink>
        </li>
      </ul>

      <EmptyCard v-else/>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

import Breadcrumb from "@/components/tools/Breadcrumb.vue";
import Card from "@/components/tools/Card.vue";
import EmptyCard from "@/components/tools/EmptyCard.vue";

import { useSearchStore } from "@/stores/searchStore";
import { useFetchData } from "@/composables/useFetchData";

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
const semesterId = route.query["semester"];

const searchStore = useSearchStore();
const { getClasses } = useFetchData();

let dir = "ltr";
let classesData = [];
const classes = ref([]);

onMounted(async () => {
  const { classesData: data, direction } = await getClasses(semesterId);
  classesData = data;
  dir = direction;
  classes.value = classesData;
});

watch(
  () => searchStore.searchValue,
  (value) => {
    const query = value.toLowerCase();
    classes.value = classesData.filter((current) => {
      return (
        current.title.toLowerCase().includes(query) ||
        current.description.toLowerCase().includes(query)
      );
    });
  }
);
</script>
