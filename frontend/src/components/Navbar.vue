<template>
  <div class="justify-between flex p-3">
    <button
      @click="changeMenuState"
      class="text-xl font-medium p-2 text-gray-00 rounded-md"
    >
      Taskbreaker
    </button>
    <div class="text-md font-light mr-2">
      <router-link to="/signin" tag="button" class="p-2" v-if="!isloggedin">
          Sign In
      </router-link>
      <router-link to="/signup" tag="button" class="p-2" v-if="!isloggedin">
          Sign up
      </router-link>
      <button class="p-2" v-if="isloggedin" v-on:click="logout">
          Log out
      </button>
    </div>
  </div>
</template>
<script setup>
    import { ref, defineEmit } from "vue";
    import store from './../store'
    const isloggedin = ref(false)
    isloggedin.value = store.getters.isLoggedIn;
    function logout() {
        store.dispatch('logout')
    }
    const emit = defineEmit(['change-menu-state']);

    function changeMenuState() {
        emit("change-menu-state", true);
    }
</script>