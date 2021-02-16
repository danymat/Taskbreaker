<template>
    <div class="bg-blue-300" id="register">
        <h1 class="p-8 text-3xl">Sign Up</h1>
        <form action="/login" method="post" class="flex flex-col space-y-4">
            <div>
                <label for="username">Enter your name: </label>
                <input type="text" placeholder="Username" name="username" id="username" required />
            </div>
            <div>
                <label for="pass">Enter your password: </label>
                <input type="password" placeholder="Password" name="pass" id="pass" required />
            </div>
            <input type="submit" value="Login !">
        </form>
    </div>
</template>
<script setup>
</script>