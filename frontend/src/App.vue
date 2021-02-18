<template>
  <div class="flex flex-col space-y-20 text-gray-700 justify-center bg-white">
    <div class="px-9">
      <Navbar
        class="border-b border-gray-300"
        @is-menu-hidden="(value) => (isHidden = value)"
        @current-page="(value) => changePageState(value)"
      />

      <Menu
        v-if="!isHidden"
        @current-page="(value) => changePageState(value)"
      />

      <div class="grid justify-center gap-2 pt-6">
        <Home v-if="current_page == 'home'" class="pt-14" />
        <Register v-else-if="current_page == 'register'" />
        <Login v-else-if="current_page == 'login'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Navbar from "./components/Navbar.vue";
import Menu from "./components/Menu.vue";

import { ref } from "vue";

const isHidden = ref(true);
const current_page = ref("home");
const isLoggedIn = ref(false);

function changePageState(page_select) {
  if (current_page.value == page_select) {
    if (isLoggedIn.value) current_page.value = "main";
    else current_page.value = "home";
  } else {
    current_page.value = page_select;
  }
}


// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>