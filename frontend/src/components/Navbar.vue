<template>
    <div class="bg-gray-800 justify-between flex text-gray-100 p-3">
        <div class="" @click="changeMenuState">
            <div><img src="/public/favicon.ico" /></div>
        </div>
        <div class="text-xl font-normal bg-gray-200 p-2 text-gray-800 rounded-md">
            Taskbreaker
        </div>

        <div class="text-md font-light flex mr-2">
            <button class="p-2" @click="emit('current-page', 'login')">Login</button>
            <button class="p-2" @click="emit('current-page', 'register')">Sign up</button>
            <button class="p-2" :class="{ hidden: !isLoggedIn }" @click="">Log out</button>
        </div>
    </div>
</template>
<script setup>
import {ref, defineEmit} from 'vue'

const isHidden = ref(true)
    const current_page = ref('main')
    const isLoggedIn = ref(false)
const emit = defineEmit(['is-menu-hidden', 'current-page'])


function changeMenuState() {
    isHidden.value = !isHidden.value
    emit("is-menu-hidden", isHidden.value)

}

</script>