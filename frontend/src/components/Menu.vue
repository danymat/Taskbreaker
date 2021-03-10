<template>
    <div class="relative flex flex-col bg-purple-800 p-4 w-40 rounded text-black z-10">
        <div class="flex flex-col">
            <router-link to="/" tag="button" class="p-2" v-if="!isloggedin">
                Home
            </router-link>
            <router-link to="/main" tag="button" class="p-2" v-if="isloggedin">
                Main
            </router-link>
            <router-link to="/taskboard" tag="button" class="p-2" v-if="isloggedin">
                Taskboard
            </router-link>
            <router-link to="/account" tag="button" class="p-2" v-if="isloggedin">
                Account
            </router-link>
            <router-link to="/settings" tag="button" class="p-2" v-if="isloggedin">
                Settings
            </router-link>
            <router-link to="/about" tag="button" class="p-2">
                About
            </router-link>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import store from './../store'
    const isloggedin = ref(false)
    isloggedin.value = store.getters.isLoggedIn;
</script>