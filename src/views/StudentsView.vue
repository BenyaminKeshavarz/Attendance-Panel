<template>
  <main>
    <Breadcrumb :breadcrumb-items="breadcrumb" />

    <div class="mt-5">
      <!-- Search and Columns Actions -->
      <div class="flex items-center justify-between mb-2">
        <SearchInput v-model="searchQuery" />
      </div>

      <!-- Table -->
      <div :dir="dir" class="overflow-hidden rounded-md border">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left bg-background text-foreground">
            <!-- Table Header -->
            <thead class="border-b">
              <tr>
                <th
                  v-for="col in columns"
                  :key="col.field"
                  class="px-6 py-4 font-medium whitespace-nowrap"
                >
                  <div
                    :class="[
                      'flex items-center justify-center text-center cursor-pointer',
                      'text-muted-foreground transition-colors duration-300',
                      { 'hover:text-inherit': col.sortable },
                    ]"
                    @click="col.sortable ? sortData(col.field) : null"
                  >
                    {{ col.label }}
                    <span v-if="col.sortable" class="ml-1 text-xs">
                      <span
                        v-if="
                          sortField === col.field && sortDirection === 'asc'
                        "
                        >▲</span
                      >
                      <span
                        v-else-if="
                          sortField === col.field && sortDirection === 'desc'
                        "
                        >▼</span
                      >
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <!-- Table Body -->
            <tbody>
              <tr
                v-for="(row, rowIndex) in filteredData"
                :key="rowIndex"
                class="whitespace-nowrap text-center"
                :class="{
                  'border-b': rowIndex !== filteredData.length - 1,
                }"
              >
                <td class="px-6 py-3">{{ row.number }}</td>
                <td class="px-6 py-3">{{ row.fullName }}</td>
                <td class="px-6 py-3">
                  <div class="flex flex-col items-center gap-1">
                    <span>{{ row.presentation.date }}</span>
                    <span class="inline-flex items-center gap-1">
                      <IconCheck
                        v-if="row.presentation.presented === true"
                        class="size-7 text-green-500"
                      />
                      <IconXMark
                        v-else-if="row.presentation.presented === false"
                        class="size-6 text-red-500"
                      />
                      <IconCheck v-else class="size-7 text-amber-500" />
                      {{ row.presentation.title }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-3">
                  <span v-if="row.finalScore">
                    {{ row.finalScore }}
                  </span>
                  <span v-else>-</span>
                </td>
                <td class="px-6 py-3">
                  <div class="inline-flex items-center gap-1">
                    <IconCheck
                      v-if="row.totalScore.passed === true"
                      class="size-7 text-green-500"
                    />
                    <IconXMark
                      v-else-if="row.totalScore.passed === false"
                      class="size-6 text-red-500"
                    />
                    <span>{{ row.totalScore.score }}</span>
                    <span v-if="!row.totalScore.score && !row.totalScore.passed"
                      >-</span
                    >
                  </div>
                </td>
                <template
                  v-for="(record, recordIndex) in row.records"
                  :key="'record' + recordIndex"
                >
                  <td v-if="record" class="px-6 py-3">
                    <div class="flex flex-col items-center gap-1">
                      <span class="inline-flex items-center gap-1">
                        <IconCheck
                          v-if="record.attendance"
                          class="size-7 text-green-500"
                        />
                        <IconXMark v-else class="size-6 text-red-500" />
                        {{ record.attendance ? "حاضر" : "غایب" }}
                      </span>
                      <span
                        v-if="record.homeWork"
                        class="inline-flex items-center gap-1"
                      >
                        <IconCheck class="size-7 text-green-500" />
                        تمرین ارسال شده
                      </span>
                      <span>{{ record.quiz }}</span>
                    </div>
                  </td>
                  <td v-else class="px-6 py-3">-</td>
                </template>
              </tr>
              <tr v-if="filteredData.length === 0">
                <td
                  :colspan="columns.length + 2"
                  class="px-6 py-3 text-center text-gray-500"
                >
                  No results found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import SearchInput from "@/components/tools/SearchInput.vue";
import Breadcrumb from "@/components/tools/Breadcrumb.vue";

import IconCheck from "@/components/icons/IconCheck.vue";
import IconXMark from "@/components/icons/IconXMark.vue";

import { useFetchData } from "@/composables/useFetchData";
import { useRoute } from "vue-router";
const { getStudents } = useFetchData();

// State
let dir = "ltr";
const searchQuery = ref("");
const sortField = ref(null);
const sortDirection = ref(null);
const route = useRoute();
const semesterId = route.query["semester"];
const classId = route.query["class"];

const breadcrumb = [
  {
    title: "Semesters List",
    link: "/",
  },
  {
    title: "Classes List",
    link: `/classes?semester=${semesterId}`,
  },
  {
    title: "Students List",
    link: "",
  },
];

// Data
const data = ref([]);
const columns = ref([]);

onMounted(async () => {
  const { studentsData, direction } = await getStudents(semesterId, classId);
  const allDates = studentsData.flatMap((student) =>
    student.dates.map((entry) => entry.date)
  );
  const dateCols = [...new Set(allDates)].map((current, index) => ({
    label: current,
    field: `session${index + 1}`,
    sortable: true,
  }));
  data.value = studentsData.map((student, index) => ({
    number: index + 1,
    fullName: student.fullName,
    records: student.dates?.map((current) => current.records),
    presentation: {
      presented: student.presentation.presented,
      date: student.presentation.date,
      title: student.presentation.title,
    },
    finalScore: student.finalScore,
    totalScore: {
      passed: student.totalScore.passed,
      score: student.totalScore.score,
    },
  }));
  columns.value = [
    { label: "#", field: "number", sortable: true },
    { label: "نام و نام خانوادگی", field: "fullName", sortable: true },
    { label: "ارائه", field: "presentation", sortable: true },
    { label: "پایان ترم", field: "finalScore", sortable: true },
    { label: "نمره کل", field: "totalScore", sortable: true },
    ...dateCols,
  ];
  dir = direction;
});

// Computed Properties
const sortedData = computed(() => {
  if (!sortField.value) return data.value;

  return [...data.value].sort((a, b) => {
    const aValue = a[sortField.value];
    const bValue = b[sortField.value];

    if (aValue === bValue) return 0;

    const modifier = sortDirection.value === "asc" ? 1 : -1;
    return aValue > bValue ? modifier : -modifier;
  });
});

const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return sortedData.value.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(query)
  );
});

// Methods
const sortData = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
};
</script>
