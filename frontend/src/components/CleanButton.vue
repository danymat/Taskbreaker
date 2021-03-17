<template>
    <button class="items-center pr-2 rounded-md 
            bg-gradient-to-r from-gray-300 via-blue-200 to-gray-200 
            transition duration-300 transform hover:scale-110 hover:text-gray-900">
        <span class="ml-2 text-black-600 text-base">{{ buttonName }}</span>
    </button>
</template>
<script setup>
    import { defineProps } from "vue"

    const props = defineProps({
        buttonName: String
    })
</script>