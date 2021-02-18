<template>
  <div class="space-y-10">
    <div class="flex flex-row">
      <div>
        <img src="/sprites/knight/Idle (1).png" width="130" height="157" />
      </div>
      <div class="grid place-content-center">
        <h2 class="text-2xl font-light">The all-new</h2>
        <h1
          class="text-7xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-gray-300 to-gray-600"
        >
          Taskbreaker
        </h1>
      </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const img_number = ref(1);
    setInterval(change_img, 100);
    function change_img() {
        img_number.value = (img_number.value) % 10 + 1
    }
</script>
