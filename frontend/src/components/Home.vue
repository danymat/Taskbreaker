<template>
  <div class="text-center flex flex-col space-y-10">
    <Headline />
    <div class="flex">
      <NewButton @click="createTask" class="mb-2 flex" />
    </div>

    <div class="space-y-2">
      <div v-for="task in tasks" v-bind:key="task">
        <Task
          :title="task.title"
          :context="task.context"
          :project="task.project"
          :notification="task.hasNotification"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Headline from "./Headline.vue";
import NewButton from "./NewButton.vue";
import Task from "./Task.vue";

var tasks = ref([]);
const img_number = ref(1);

const createTask = () => {
  console.log("here");
  tasks.value.push({
    title: "Lorem Ipsum Dolor",
    context: "Lorem",
    project: "Lorem Ipsum Dolor",
    hasNotification: false,
  });
};
</script>