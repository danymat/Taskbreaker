<template>
  <div class="flex flex-row p-2 max-w-sm bg-gradient-to-r items-center justify-evenly content-center from-red-500 to-red-300 rounded-md text-white shadow-md">
    <h2 class="text-xl font-bolds truncate">{{ title }}</h2>
    <div class="font-light">{{context}}</div>
    <div class="">{{project}}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  context: String,
  project: String
})
</script>