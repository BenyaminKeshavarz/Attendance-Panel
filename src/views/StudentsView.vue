<template>
  <main>
    <Breadcrumb :breadcrumb-items="breadcrumb" />

    <div class="mt-5">

      <!-- Table -->
      <div v-if="filteredData?.length > 0" :dir="dir" class="overflow-hidden rounded-md border">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left bg-background text-foreground">
            <!-- Table Header -->
            <thead class="border-b">
              <tr>
                <th
                  v-for="col in columns"
                  :key="col.field"
                  class="px-4 py-2 font-medium text-center"
                >
                  <div
                    :class="[
                      'flex items-center justify-center gap-2 rounded text-center ps-2 pe-1.5 py-2 transition-colors duration-300 w-max mx-auto whitespace-nowrap',
                      'text-muted-foreground ',
                      {
                        'hover:text-inherit hover:bg-secondary cursor-pointer':
                          col.sortable,
                      },
                    ]"
                    @click="col.sortable ? sortData(col.field) : null"
                  >
                    {{ col.label }}
                    <IconArrowUpDown v-if="col.sortable" class="size-5" />
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
                <td class="px-1 py-3">{{ row.number }}</td>
                <td class="px-1 py-3">{{ row.fullName }}</td>
                <td class="px-1 py-3">
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
                <td class="px-1 py-3">
                  <span v-if="row.finalScore">
                    {{ row.finalScore }}
                  </span>
                  <span v-else>-</span>
                </td>
                <td class="px-1 py-3">
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
                  <td v-if="record" class="px-4 py-3">
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
                  <td v-else class="px-4 py-3">-</td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <EmptyCard v-else />
    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import Breadcrumb from "@/components/tools/Breadcrumb.vue";
import EmptyCard from "@/components/tools/EmptyCard.vue";

import IconCheck from "@/components/icons/IconCheck.vue";
import IconXMark from "@/components/icons/IconXMark.vue";
import IconArrowUpDown from "@/components/icons/IconArrowUpDown.vue";

import { useFetchData } from "@/composables/useFetchData";
import { useRoute } from "vue-router";
import { useSearchStore } from "@/stores/searchStore";

const { getStudents } = useFetchData();
const searchStore = useSearchStore();

// State
let dir = "ltr";
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
    sortable: false,
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
    let aValue, bValue;

    switch (sortField.value) {
      case "presentation":
        aValue = a.presentation?.presented || false;
        bValue = b.presentation?.presented || false;
        break;
      case "finalScore":
        aValue = a.finalScore || 0;
        bValue = b.finalScore || 0;
        break;
      case "totalScore":
        aValue = a.totalScore?.score || 0;
        bValue = b.totalScore?.score || 0;
        break;
      default:
        aValue = a[sortField.value];
        bValue = b[sortField.value];
        break;
    }

    if (aValue === bValue) return 0;

    const modifier = sortDirection.value === "asc" ? 1 : -1;
    return aValue > bValue ? modifier : -modifier;
  });
});

const filteredData = computed(() => {
  const query = searchStore.searchValue.toLowerCase();

  const flattenValues = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(flattenValues).join(" ");
    } else if (obj && typeof obj === "object") {
      return Object.values(obj).map(flattenValues).join(" ");
    }
    return String(obj || "").toLowerCase();
  };

  return sortedData.value.filter((row) => flattenValues(row).includes(query));
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
