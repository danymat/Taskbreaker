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

const isHidden = ref(true);
const current_page = ref("main");
const isLoggedIn = ref(false);
const emit = defineEmit(["is-menu-hidden", "current-page"]);

function changeMenuState() {
  isHidden.value = !isHidden.value;
  emit("is-menu-hidden", isHidden.value);
}
</script>