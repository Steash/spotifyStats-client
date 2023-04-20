<template>
    <div>
        <button class="border bg-green-600 text-white font-semibold rounded-lg p-2 m-2" @click="onLogin">Log In with Spotify</button>
    </div>
    <button class="border border-gray-800 rounded-lg p-2 m-2" @click="authorize">Authorize</button>
</template>

<script>
import login from '../api/login';

export default {
    // mounted() {
    //     login
    // },
    methods: {
        async onLogin() {
            login.loginSpotify()
        },
        async authorize() {
            const token = await login.authorize();
            console.log('logged in token: ' + token);
        }
    }

};
</script>
