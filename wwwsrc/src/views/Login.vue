<template>
    <!-- I added the autocomplete="off" so passwords won't keep showing up -->
    <!-- ...But it doesn't do anything -->
    <div class="login">
        <form v-if="loginForm" @submit.prevent="loginUser" autocomplete="off">
            <input type="email" v-model="creds.user_email" placeholder="email">
            <input type="password" v-model="creds.user_password" placeholder="password">
            <button type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="register" autocomplete="off">
            <input v-model="user.user_username" placeholder="name" autocomplete="off">
            <input type="email" v-model="user.user_email" placeholder="email">
            <input type="password" v-model="user.user_password" placeholder="password">
            <button type="submit">Create Account</button>
        </form>
        <div @click="loginForm = !loginForm">
            <p v-if="loginForm">No account Click to Register</p>
            <p v-else>Already have an account click to Login</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm: true,
                creds: {
                    user_email: "",
                    user_password: ""
                },
                user: {
                    user_email: "",
                    user_password: "",
                    user_username: ""
                }
            };
        },
        beforeCreate() {
            if (this.$store.state.Auth.user.user_id) {
                this.$router.push({ name: "Home" })
            }
        },
        methods: {
            register() {
                this.$store.dispatch("register", this.user);
            },
            loginUser() {
                this.$store.dispatch("login", this.creds);
            }
        }
    };
</script>

<style scoped>

</style>