<template>
    <div class="relative flex flex-col bg-purple-800 p-4 w-40 rounded text-black z-10">
        <div class="flex flex-col">
            <button class="p-2" @click="emit('current-page', 'home')" v-if="!props.isloggedin">
                Home
            </button>
            <button class="p-2" @click="emit('current-page', 'main')" v-if="props.isloggedin">
                Main
            </button>
            <button class="p-2" @click="emit('current-page', 'taskboard')" v-if="props.isloggedin">
                Taskboard
            </button>
            <button class="p-2" @click="emit('current-page', 'account')" v-if="props.isloggedin">
                Account
            </button>
            <button class="p-2" @click="emit('current-page', 'settings')" v-if="props.isloggedin">
                Settings
            </button>
            <button class="p-2" @click="emit('current-page', 'about')">
                About
            </button>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineEmit, defineProps } from "vue";
    const emit = defineEmit(['current-page']);
    const props = defineProps({
        isloggedin: Boolean
    });
</script>