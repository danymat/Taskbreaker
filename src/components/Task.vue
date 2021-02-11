<template>
  <div
    class="flex flex-row p-2 gap-4 max-w-sm bg-gradient-to-r items-center justify-evenly content-center from-gray-700 to-gray-800 rounded-tr-lg rounded-bl-lg text-gray-100 shadow-lg"
  >

    <h2 class="text-xl font-bolds truncate">{{ title }}</h2>
    <div class="font-light">{{ context }}</div>
    <div class="">{{ project }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
  context: String,
  project: String,
});
</script>