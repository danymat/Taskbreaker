<template>
  <div class="justify-between flex p-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-screen">
    <button
      @click="changeMenuState"
      class="text-2xl font-bold ml-2 text-black-900 rounded-md bg-purple-500 p-2"
    >
      Taskbreaker
    </button>
    <div class="text-base mt-4 mr-8 font-medium space-x-4">
      <router-link to="/signin" tag="button" v-if="!store.getters.isLoggedIn" class="p-2 bg-blue-400 rounded-md hover:scale-110 hover:text-gray-900 hover:bg-blue-200">
          Sign In
      </router-link>
      <router-link to="/signup" tag="button" v-if="!store.getters.isLoggedIn" class="p-2 bg-blue-400 rounded-md hover:scale-110 hover:text-gray-900 hover:bg-blue-200">
          Sign up
      </router-link>
      <button v-if="store.getters.isLoggedIn" v-on:click="logout" class="text-base font-medium space-x-4 p-2 bg-blue-400 rounded-md hover:scale-110 hover:text-gray-900 hover:bg-blue-200">
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