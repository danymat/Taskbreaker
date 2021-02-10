<template>
  <div
    class="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-gray-300"
  >
    <Navbar class="shadow-2xl" />
    <div class="grid content-center justify-center overflow-y-auto gap-2">
      <div v-for="x in 100">
        <Task
          title="Description de la tâche"
          context="Context1"
          project="Projet1"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Task from "./components/Task.vue";
import Navbar from "./components/Navbar.vue";

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>