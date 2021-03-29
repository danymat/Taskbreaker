<template>
  <div class="justify-between flex p-4 bg-gradient-to-r from-blue-400 to-blue-400 w-screen">
    <button
      @click="changeMenuState"
      class="text-2xl font-bold ml-2 text-black-900 rounded-md bg-gray-100 p-2"
    >
      Taskbreaker
    </button>
    <div class="text-base mt-4 mr-8 font-medium space-x-4">
      <router-link to="/signin" tag="button" v-if="!store.getters.isLoggedIn" class="p-2 bg-gray-100 rounded-md hover:scale-110 transform transition duration-300 hover:text-gray-900 ">
          Sign In
      </router-link>
      <router-link to="/signup" tag="button" v-if="!store.getters.isLoggedIn" class="p-2 bg-gray-100 rounded-md hover:scale-110 transform transition duration-300 hover:text-gray-900 ">
          Sign up
      </router-link>
      <button v-if="store.getters.isLoggedIn" v-on:click="logout" class="text-base font-medium space-x-4 p-2 bg-gray-100 rounded-md transform transition duration-300 hover:text-gray-900 hover:scale-110">
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