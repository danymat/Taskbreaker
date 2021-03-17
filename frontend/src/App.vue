<template>
  <div class="flex flex-col space-y-20 text-gray-700 justify-center bg-white h-screen">
    <div class="h-screen">
      <Navbar class="" />
      <div class="relative ml-9 h-5/6">
          <Menu v-if="!store.getters.isMenuHidden" />
          <div class="absolute inset-0 grid justify-center gap-2 pt-6">
              <router-view />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import Navbar from "./components/Navbar.vue";
    import Menu from "./components/Menu.vue";
    import store from './store';



// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>