import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", () => {
  const searchValue = ref("");

  return { searchValue };
});
