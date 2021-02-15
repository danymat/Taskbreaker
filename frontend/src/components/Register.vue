<template>
    <div class="hidden bg-blue-300" id="register">
        <h1 class="p-8 text-3xl">Sign Up</h1>
        <form action="/register" method="post" class="flex flex-col space-y-4">
            <div>
                <label for="name">Enter your name: </label>
                <input type="text" placeholder="Name" name="name" id="name" required />
            </div>
            <div>
                <label for="pass">Enter your password: </label>
                <input type="password" placeholder="Password" name="pass" id="pass" required />
            </div>
            <div>
                <label for="confirm_pass">Confirm your password: </label>
                <input type="password" placeholder="Confirm Password" name="confirm_pass" id="confirm_pass" required />
            </div>
            <div>
                <label for="mail">Enter your email: </label>
                <input type="email" placeholder="Email" name="mail" id="mail" required />
            </div>
            <input type="submit" value="Register Now !">
        </form>
    </div>
</template>
<script setup>
</script>