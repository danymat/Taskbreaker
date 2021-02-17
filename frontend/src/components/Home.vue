<template>
  <div class="text-center flex flex-row">
    <div>
      <img
        :src="'/sprites/knight/idle (' + img_number + ').png'"
        width="130"
        height="157"
      />
    </div>
    <div class="grid place-content-center">
      <h2 class="text-xl">Gamify your tasks with</h2>
      <h1 class="text-6xl font-bold">Taskbreaker</h1>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const img_number = ref(1);
setInterval(change_img, 100);

function change_img() {
  img_number.value = (img_number.value % 10) + 1;
}
</script>