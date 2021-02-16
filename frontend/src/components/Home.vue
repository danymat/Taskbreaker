<template>
    <div class="">
        <h1 class="text-6xl">Welcome to Taskbreaker</h1>
        <h2 class="text-3xl">The breaking task manager</h2>
        <img :src="'/sprites/knight/idle ('+img_number+').png'" width="130" height="157"/>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    const img_number = ref(1);
    setInterval(change_img, 100);

    function change_img() {
        img_number.value = (img_number.value)%10 +1
    }
</script>