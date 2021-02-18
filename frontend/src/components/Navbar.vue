<template>
  <div class="justify-between flex p-3">
    <button
      @click="changeMenuState"
      class="text-xl font-medium p-2 text-gray-00 rounded-md"
    >
      Taskbreaker
    </button>
    <div class="text-md font-light mr-2">
      <button class="p-2" @click="emit('current-page', 'login')">Login</button>
      <button class="p-2" @click="emit('current-page', 'register')">
        Sign up
      </button>
      <button class="p-2" :class="{ hidden: !isLoggedIn }">
        Log out
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmit } from "vue";

const current_page = ref("main");
const isLoggedIn = ref(false);
const emit = defineEmit(["change-menu-state", "current-page"]);

function changeMenuState() {
    emit("change-menu-state", true);
}
</script>