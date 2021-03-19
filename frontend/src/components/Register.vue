<template>
    <div class="bg-white border border-gray-200 rounded-md p-8 space-y-2 shadow-md" id="register">
        <h1 class="text-3xl mb-8 font-bold">Sign Up</h1>
        <form @submit.prevent="signUp" class="flex flex-col space-y-4 font-semibold text-sm">

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1" for="username">Username</label>
                <input class="border rounded-md shadow-sm border-gray-200 px-2" type="text" id="username" v-model="username" required />
                <label class="block text-gray-700 text-sm font-bold mb-1" for="email">Email</label>
                <input class="border rounded-md shadow-sm border-gray-200 px-2" type="email" id="email" v-model="email" required />
                <label class="block text-gray-700 text-sm font-bold mb-1" for="password">Password</label>
                <input class="border rounded-md shadow-sm border-gray-200 px-2" type="password" id="password" v-model="password" required />
                <label class="block text-gray-700 text-sm font-bold mb-1" for="passwordconf">Password Confirmation</label>
                <input class="border rounded-md shadow-sm border-gray-200 px-2" type="password" id="passwordconf" v-model="passwordconf" required />
            </div>
            <button class="rounded-md shadow-sm bg-gray-600 p-1 text-gray-100 font-light
                transition duration-500 shadow-md ease-in-out hover:bg-gray-800 transform hover:scale-105 hover:text-white"
                    type="submit">
                Sign-up with your email
            </button>
            <p id="messagewrong" class="text-red-500" :class="{hidden: !errorbool}">{{errorMessage}}</p>
        </form>
    </div>
</template>
<script setup>
    import { registerUser } from '../api/users';
    import { ref } from 'vue';
    import router from './../router';

    const username = ref('')
    const password = ref('')
    const passwordconf = ref('')
    const email = ref('')
    const errorbool = ref(false)
    const errorMessage = ref('')

    async function signUp() {
        try {
            await registerUser({ username: username.value, email: email.value, password: password.value, passwordconf: passwordconf.value })
            router.push('taskboard');
        } catch (error) {
            errorbool.value = true
            errorMessage.value = error.message
        }
    }
</script>