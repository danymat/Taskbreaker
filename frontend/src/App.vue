<template>
  <div class="flex flex-col space-y-20 text-gray-700 justify-center bg-white">
    <div class="px-9">
      <Navbar
        class="border-b border-gray-300"
        @change-menu-state="(value) => isHidden = !isHidden"
        @current-page="(value) => changePageState(value)"
        @logout="(value) => login(value)"
        :isloggedin="isLoggedIn"
      />

      <div class="relative">
          <Menu v-if="!isHidden"
                @current-page="(value) => changePageState(value)"
                :isloggedin="isLoggedIn" />

          <div class="absolute inset-0 grid justify-center gap-2 pt-6">
              <Home v-if="current_page == 'home'" class="pt-14" />
              <Main v-else-if="current_page == 'main'" class="pt-14" />
              <Taskboard v-else-if="current_page == 'taskboard'" class="" />
              <Account v-else-if="current_page == 'account'" class="pt-14" />
              <Settings v-else-if="current_page == 'settings'" class="pt-14" />
              <Register v-else-if="current_page == 'register'" />
              <Login v-else-if="current_page == 'login'" @login="(value) => login(value)" />
              <About v-else-if="current_page == 'about'" class="pt-14" />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import Home from "./components/Home.vue";
    import Taskboard from "./components/Taskboard.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Navbar from "./components/Navbar.vue";
    import Menu from "./components/Menu.vue";
    import Main from "./components/Main.vue";
    import About from "./components/About.vue";
    import Account from "./components/Account.vue";
    import Settings from "./components/Settings.vue";

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
        isHidden.value = true;
}

    const login = (value) => {
        isLoggedIn.value = value;
        changePageState('main');
    }


// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>