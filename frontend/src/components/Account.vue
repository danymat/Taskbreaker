<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="">
            <p>Email : </p><p>{{ account.email }}</p>
        </div>
        <div class="">
            <p>username : </p><p>{{ account.username }}</p>
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

    const account = ref({})
    const hideme = ref(true)
    const oldpassword = ref('')
    const password = ref('')
    const passwordconf = ref('')
    const messageChange = ref('')

    async function getUserInfo() {
        let resp = await getUserData()
        account.value = resp.account
    }
    getUserInfo()

    async function changePassword() {
        if (password.value != passwordconf.value) {
            messageChange.value = 'Error wrong password confirmation'
            return
        }
        let data = { oldpassword: oldpassword.value, password: password.value }
        let resp = await postChangePassword(data)
        messageChange.value = resp.message
        hideme.value = true
    }
</script>