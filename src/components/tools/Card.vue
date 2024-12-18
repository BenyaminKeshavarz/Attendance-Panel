<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import IconArrow from "@/components/icons/IconArrow.vue";

defineProps({
  title: String,
});
</script>

<template>
  <Card class="group transition-colors duration-300 hover:bg-accent">
    <CardHeader>
      <div class="flex justify-between items-center">
        <CardTitle>{{ title }}</CardTitle>
        <IconArrow
          class="size-6 rtl:rotate-180 transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2"
        />
      </div>
    </CardHeader>
  </Card>
</template>
