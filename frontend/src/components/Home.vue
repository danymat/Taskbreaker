<template>
  <div class="text-center flex flex-col">
    <Headline />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Headline from "./Headline.vue";
const img_number = ref(1);
setInterval(change_img, 100);

function change_img() {
  img_number.value = (img_number.value % 10) + 1;
}
</script>