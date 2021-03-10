<template>
    <div class="bg-white border border-gray-200 rounded-md p-8 space-y-2 shadow-md" id="register">
        <h1 class="text-3xl mb-8 font-bold">Sign In</h1>
        <form @submit.prevent="logIn" class="flex flex-col space-y-4 font-semibold text-sm">

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1" for="email">Email</label>
                <input class="border rounded-md shadow-sm border-gray-200 px-2" type="text" id="email" v-model="email" required />
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1" for="email">Password</label>
                <input class="border rounded-md shadow-sm border-gray-200 px-2" type="password" id="password" v-model="password" required />
            </div>
            <button class="rounded-md shadow-sm bg-gray-600 p-1 text-gray-100 font-light
                transition duration-500 ease-in-out hover:bg-gray-800 transform hover:scale-105 hover:text-white"
                type="submit"
            >
                Sign In
            </button>
            <p id="messagewrong" class="text-red-500"></p>
        </form>
    </div>
</template>
<script setup>
    import { logUser } from '../api/users';
    import { ref, defineEmit } from 'vue';

    const emit = defineEmit(['login'])

const password = ref('')
const email = ref('')

    async function logIn() {
        const data = await logUser({ email: email.value, password: password.value })
        if (typeof (data.token) == "undefined") {
            document.getElementById("messagewrong").textContent = data.message;
       } else {
            emit("login", true);
            window.router.push('taskboard');
       }
}
</script>