import { createWebHistory, createRouter } from "vue-router"
import Home from "./../components/Home.vue";
import Taskboard from "./../components/Taskboard.vue";
import Register from "./../components/Register.vue";
import Login from "./../components/Login.vue";
import Main from "./../components/Main.vue";
import About from "./../components/About.vue";
import Account from "./../components/Account.vue";
import Settings from "./../components/Settings.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/main",
        name: "Main",
        component: Main,
    },
    {
        path: "/taskboard",
        name: "Taskboard",
        component: Taskboard,
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
    },
    {
        path: "/account",
        name: "Account",
        component: Account,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/signin",
        name: "SignIn",
        component: Login,
    },
    {
        path: "/signup",
        name: "SignUp",
        component: Register,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;