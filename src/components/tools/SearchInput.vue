<script setup>
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";
import { useVModel } from "@vueuse/core";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
});

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="relative w-full sm:max-w-sm items-center">
    <Input
      v-model="modelValue"
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
