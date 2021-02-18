<template>
    <div class="relative flex flex-col bg-purple-800 p-4 w-40 rounded text-black z-10">
        <div class="flex flex-col" :class="{ hidden: !isLoggedIn } ">
            <button class="p-2">
                Accounts
            </button>
            <button class="p-2">
                Settings
            </button>
        </div>
        <div class="flex flex-col">
            <button class="p-2" @click="emit('current-page', 'home')">
                Home
            </button>
            <button class="p-2" @click="emit('current-page', 'about')">
                About
            </button>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineEmit } from "vue";
    const isLoggedIn = ref(false)
    const emit = defineEmit(['current-page'])
</script>