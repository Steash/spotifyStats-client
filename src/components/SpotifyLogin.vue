<template>
    <div>
        <button @click="onLogin">Log In with Spotify</button>
    </div>
    <button @click="authorize">Authorize</button>
</template>

<script>
import login from '../api/login';

export default {
    // mounted() {
    //     login
    // },
    methods: {
        async onLogin() {
            login.login();
        },
        async authorize() {
            const token = await login.authorize();
            console.log('logged in token: ' + token);
        }
    }

};
</script>
