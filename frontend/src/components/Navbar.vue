<template>
  <div class="justify-between flex p-3">
    <button
      @click="changeMenuState"
      class="text-xl font-medium p-2 text-gray-00 rounded-md"
    >
      Taskbreaker
    </button>
    <div class="text-md font-light mr-2">
      <button class="p-2" @click="emit('current-page', 'login')" v-if="!props.isloggedin">
        Sign In
      </button>
      <button class="p-2" @click="emit('current-page', 'register')" v-if="!props.isloggedin">
        Sign up
      </button>
      <button class="p-2" @click="emit('logout', false)" v-if="props.isloggedin">
        Log out
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmit, defineProps } from "vue";

const current_page = ref("main");
    const emit = defineEmit(["change-menu-state", "current-page", "logout"]);
    const props = defineProps({
        isloggedin: Boolean
    });

function changeMenuState() {
    emit("change-menu-state", true);
}
</script>