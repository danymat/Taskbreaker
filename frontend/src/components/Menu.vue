<template>
    <div class="absolute flex flex-col bg-purple-800 p-4 ml-4 w-40 rounded text-black z-20">
        <div class="flex flex-col space-y-5 text-xl">
            <router-link to="/" tag="button" class="p-2" v-if="!store.getters.isLoggedIn">
                Home
            </router-link>
            <router-link to="/taskboard" tag="button" class="p-2" v-if="store.getters.isLoggedIn">
                Taskboard
            </router-link>
            <router-link to="/account" tag="button" class="p-2" v-if="store.getters.isLoggedIn">
                Account
            </router-link>
            <router-link to="/about" tag="button" class="p-2">
                About
            </router-link>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import store from './../store';

</script>