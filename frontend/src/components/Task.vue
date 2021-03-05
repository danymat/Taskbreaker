<template>
    <div class="flex relative flex-row p-2 gap-4 bg-gradient-to-r items-center justify-evenly content-center from-gray-600 to-gray-700 rounded-2xl text-gray-50 shadow-lg">

        <div v-if="priority">
            <div class="absolute font-extralight text-xs">priority</div>
            <h2 class="text-xl ml-7 mt-4 font-bolds">{{ priority }}</h2>
        </div>
        <div v-if="completion_date">
            <div class="absolute font-extralight text-xs">Completion Date</div>
            <h2 class="ml-12 mt-4">{{ completion_date }}</h2>
        </div>
        <div v-if="creation_date">
            <div class="absolute font-extralight text-xs">Creation Date</div>
            <h2 class="ml-12 mt-4">{{ creation_date }}</h2>
        </div>
        <div>
            <h2 class="text-xl ml-7 font-bolds">{{ description }}</h2>
        </div>

        <div v-if="context.length != 0">
            <div class="absolute font-extralight text-xs">Context</div>
            <h2 class="font-light ml-12">{{ context }}</h2>
        </div>

        <div v-if="project.length != 0">
            <div class="absolute font-extralight text-xs">Project</div>
            <h2 class="ml-12 ">{{ project }}</h2>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

defineProps({
  priority: String,
  completion_date: Date,
  creation_date: Date,
  description: String,
  context: String,
  project: String,
  special: {}
});
</script>