<template>
    <div class="bg-white border border-gray-200 rounded-md p-8 space-y-2 shadow-md" id="register">
        <h1 class="text-3xl mb-8 font-bold">Sign Up</h1>
        <form class="flex flex-col space-y-4 font-semibold text-sm">

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1" for="email">Email</label>
                <input class="border rounded-md shadow-sm border-gray-200 px-2" type="text" id="email" required />
            </div>
            <button class="rounded-md shadow-sm bg-gray-600 p-1 text-gray-100 font-light
                transition duration-500 shadow-md ease-in-out hover:bg-gray-800 transform hover:scale-105 hover:text-white"
                type="submit">
                Sign-up with your email
            </button>
        </form>
    </div>
</template>
<script setup>
</script>