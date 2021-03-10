import { createWebHistory, createRouter } from "vue-router"
import Home from "./../components/Home.vue";
import Taskboard from "./../components/Taskboard.vue";
import Register from "./../components/Register.vue";
import Login from "./../components/Login.vue";
import Main from "./../components/Main.vue";
import About from "./../components/About.vue";
import Account from "./../components/Account.vue";
import Settings from "./../components/Settings.vue";
import store from './../store';
import PageNotFound from "./../components/PageNotFound.vue";

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
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/taskboard",
        name: "Taskboard",
        component: Taskboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/account",
        name: "Account",
        component: Account,
        meta: {
            requiresAuth: true
        }
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
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: PageNotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    store.dispatch("changeMenuState", false);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/signin')
    } else {
        next()
    }
})

export default router;