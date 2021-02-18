<template>
  <div
    class="flex relative flex-row p-2 gap-4 max-w-xl bg-gradient-to-r items-center justify-evenly content-center from-gray-600 to-gray-700 rounded-2xl text-gray-50 shadow-lg"
  >
    <div v-if="notification">
      <div
        class="w-4 h-4 absolute top-0 right-0 -m-2 bg-pink-300 rounded-full"
      ></div>
      <div
        class="w-4 h-4 absolute top-0 right-0 -m-2 bg-pink-300 animate-ping rounded-full"
      ></div>
    </div>

    <div>
      <div class="absolute font-extralight text-xs">Title</div>
    <h2 class="text-xl ml-7 font-bolds truncate">{{ title }}</h2>
    </div>

    <div>
      <div class="absolute font-extralight text-xs">Context</div>
    <h2 class="font-light ml-12 truncate">{{ context }}</h2>
    </div>

    <div>
      <div class="absolute font-extralight text-xs">Project</div>
    <h2 class="truncate ml-12 ">{{ project }}</h2>
    </div>
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