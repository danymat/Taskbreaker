<template>
    <button class="rounded-md shadow-sm
            bg-gray-100 border px-2 text-gray-900
            transition duration-300 transform hover:scale-105">
        <span>{{ buttonName }}</span>
    </button>
</template>
<script setup>
    import { defineProps } from "vue"

    const props = defineProps({
        buttonName: String
    })
</script>