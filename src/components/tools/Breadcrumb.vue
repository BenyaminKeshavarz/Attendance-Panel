<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, index) in breadcrumbItems" :key="item.title">
        <BreadcrumbItem>
          <BreadcrumbLink v-if="item.link" as-child>
            <RouterLink :to="item.link">{{ item.title }}</RouterLink>
          </BreadcrumbLink>

          <template v-else>{{ item.title }}</template>
        </BreadcrumbItem>

        <BreadcrumbSeparator v-if="index !== breadcrumbItems.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

defineProps({
  breadcrumbItems: {
    type: Array,
    default: () => [],
    validator: (value) =>
      value.every((item) => item.title && item.link !== undefined),
  },
});
</script>
