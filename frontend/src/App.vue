<template>
  <div
    class="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-gray-300"
  >
    <Navbar class="shadow-2xl" />
    <!-- <Menu class="" /> -->
    <div class="grid content-center justify-center gap-2 pt-6">
      <NewButton @click="createTask" class="mb-2" />
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
import Task from "./components/Task.vue";
import Navbar from "./components/Navbar.vue";
// import Menu from "./components/Menu.vue";
import NewButton from "./components/NewButton.vue";
import { ref } from "vue";
var tasks = ref([]);

const createTask = () => {
  tasks.value.push({
    title: "hey",
    context: "hey2",
    project: "project",
    hasNotification: false,
  });
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>