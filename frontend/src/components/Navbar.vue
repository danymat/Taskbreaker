<template>
  <div class="justify-between flex p-3">
    <button
      @click="changeMenuState"
      class="text-xl font-medium p-2 text-gray-00 rounded-md"
    >
      Taskbreaker
    </button>
    <div class="text-md font-light mr-2">
      <router-link to="/signin" tag="button" class="p-2" v-if="!store.getters.isLoggedIn">
          Sign In
      </router-link>
      <router-link to="/signup" tag="button" class="p-2" v-if="!store.getters.isLoggedIn">
          Sign up
      </router-link>
      <button class="p-2" v-if="store.getters.isLoggedIn" v-on:click="logout">
          Log out
      </button>
    </div>
  </div>
</template>
<script setup>
    import store from './../store'
    import router from './../router'

    function logout() {
        store.dispatch('logout');
        router.push('/');
    }

    function changeMenuState() {
        store.dispatch("changeMenuState");
    }
</script>