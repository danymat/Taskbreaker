<template>
    <div class="relative flex flex-col bg-purple-800 p-4 w-40 rounded text-black z-10">
        <div class="flex flex-col">
            <router-link to="/" tag="button" class="p-2" @click="emit('current-page', 'home')" v-if="!props.isloggedin">
                Home
            </router-link>
            <router-link to="/main" tag="button" class="p-2" @click="emit('current-page', 'main')" v-if="props.isloggedin">
                Main
            </router-link>
            <router-link to="/taskboard" tag="button" class="p-2" @click="emit('current-page', 'taskboard')" v-if="props.isloggedin">
                Taskboard
            </router-link>
            <router-link to="/account" tag="button" class="p-2" @click="emit('current-page', 'account')" v-if="props.isloggedin">
                Account
            </router-link>
            <router-link to="/settings" tag="button" class="p-2" @click="emit('current-page', 'settings')" v-if="props.isloggedin">
                Settings
            </router-link>
            <router-link to="/about" tag="button" class="p-2" @click="emit('current-page', 'about')">
                About
            </router-link>
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