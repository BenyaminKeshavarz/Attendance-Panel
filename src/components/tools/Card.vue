<script setup>
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import IconArrow from "@/components/icons/IconArrow.vue";

defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <Card class="group transition-colors duration-300 hover:bg-accent">
    <CardHeader>
      <div class="flex justify-between items-center">
        <section class="space-y-2.5">
          <CardTitle class="max-sm:text-xl max-[375px]:text-lg">{{ title }}</CardTitle>
          <CardDescription class="max-[375px]:text-xs" v-if="description">
            {{ description }}
          </CardDescription>
        </section>

        <IconArrow
          class="size-6 max-[375px]:size-5 rtl:rotate-180 transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2"
        />
      </div>
    </CardHeader>
  </Card>
</template>
