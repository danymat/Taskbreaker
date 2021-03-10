<template>
  <div class="justify-between flex p-5">
    <button
      @click="changeMenuState"
      class="text-xl font-medium text-gray-00 rounded-md"
    >
      Taskbreaker
    </button>
    <div class="text-md font-light space-x-4">
      <router-link to="/signin" tag="button" v-if="!store.getters.isLoggedIn">
          Sign In
      </router-link>
      <router-link to="/signup" tag="button" v-if="!store.getters.isLoggedIn">
          Sign up
      </router-link>
      <button v-if="store.getters.isLoggedIn" v-on:click="logout">
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