<template>
  <div
    class="flex relative flex-row p-2 gap-4 max-w-sm bg-gradient-to-r items-center justify-evenly content-center from-gray-600 to-gray-700 rounded-tr-lg rounded-bl-lg text-gray-50 shadow-lg"
  >
    <div v-if="notification">
      <div
        class="w-4 h-4 absolute top-0 right-0 -m-2 bg-pink-300 rounded-full"
      ></div>
      <div
        class="w-4 h-4 absolute top-0 right-0 -m-2 bg-pink-300 animate-ping rounded-full"
      ></div>
    </div>

    <h2 class="text-xl font-bolds truncate">{{ title }}</h2>
    <div class="font-light truncate">{{ context }}</div>
    <div class="truncate">{{ project }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
  context: String,
  project: String,
  notification: Boolean,
});
</script>