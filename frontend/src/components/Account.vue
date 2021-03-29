<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="">
            <p>Email : </p><p>{{ account.email }}</p>
        </div>
        <div class="">
            <p>Username : </p><p>{{ account.username }}</p>
        </div>
        <div class="">
            <p>Created : </p><p>{{ createdDate }}</p>
        </div>
        <button @click="hideme=!hideme" :class="{hidden: !hideme}">Change Password</button>
        <div class="flex flex-col" :class="{hidden: hideme}">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="oldpassword">Old Password</label>
            <input class="border rounded-md shadow-sm border-gray-200 px-2" type="password" id="oldpassword" v-model="oldpassword" required />
            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">New Password</label>
            <input class="border rounded-md shadow-sm border-gray-200 px-2" type="password" id="password" v-model="password" required />
            <label class="block text-gray-700 text-sm font-bold mb-1" for="passwordconf">Password Confirmation</label>
            <input class="border rounded-md shadow-sm border-gray-200 px-2" type="password" id="passwordconf" v-model="passwordconf" required />
            <button @click="changePassword">Change</button>
        </div>
        <div class="text-red-600">{{ messageChange }}</div>
    </div>
</template>
<script setup>
    import { getUserData, postChangePassword } from '../api/users';
    import { ref } from "vue";
    import store from './../store'
    import router from './../router'

    const account = ref({})
    const createdDate = ref(String)
    const hideme = ref(true)
    const oldpassword = ref('')
    const password = ref('')
    const passwordconf = ref('')
    const messageChange = ref('')

    async function getUserInfo() {
        try {
            let resp = await getUserData()
            account.value = resp.account
            createdDate.value = (new Date(account.value.created)).toLocaleDateString()
        } catch (error) {
            store.dispatch('logout')
            router.push('/')
        }
    }
    getUserInfo()

    async function changePassword() {
        if (password.value != passwordconf.value) {
            messageChange.value = 'Error wrong password confirmation'
            return
        }
        let data = { oldpassword: oldpassword.value, password: password.value }
        var resp = {message: ""}
        try {
            resp = await postChangePassword(data)
        } catch (error) {
            resp.message = error.message
        }
        messageChange.value = resp.message
        hideme.value = true
    }
</script>