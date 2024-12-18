<template>
  <main>
    <Breadcrumb :breadcrumb-items="breadcrumb" />

    <ul class="space-y-3 mt-5">
      <li v-for="item in semesters" :key="'semester' + item.id">
        <RouterLink :to="`/classes?semester=${item.id}`">
          <Card :title="item.title" />
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import Breadcrumb from "@/components/tools/Breadcrumb.vue";
import Card from "@/components/tools/Card.vue";

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

const semesters = [
  {
    id: 3991,
    title: "Semester 3991",
  },
  {
    id: 3992,
    title: "Semester 3992",
  },
  {
    id: 3993,
    title: "Semester 3993",
  },
  {
    id: 4001,
    title: "Semester 4001",
  },
  {
    id: 4002,
    title: "Semester 4002",
  },
  {
    id: 4003,
    title: "Semester 4003",
  },
  {
    id: 4011,
    title: "Semester 4011",
  },
  {
    id: 4012,
    title: "Semester 4012",
  },
  {
    id: 4013,
    title: "Semester 4013",
  },
  {
    id: 4021,
    title: "Semester 4021",
  },
  {
    id: 4022,
    title: "Semester 4022",
  },
  {
    id: 4023,
    title: "Semester 4023",
  },
  {
    id: 4031,
    title: "Semester 4031",
  },
];
</script>
