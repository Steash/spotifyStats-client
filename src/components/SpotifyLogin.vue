<template>
    <!-- <div>
        <button class="border bg-green-600 text-white font-semibold rounded-lg p-2 m-2" @click="onLogin">Log In with Spotify</button>
    </div>
    <button class="border border-gray-800 rounded-lg p-2 m-2" @click="authorize">Authorize</button> -->

    <div class="flex">
        <div class="mx-auto">
            <button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 px-4 my-2" @click="onLogin">
                Log In with Spotify
            </button>
            <button class="border border-gray-800 rounded-lg py-2 px-4 my-2" @click="authorize">
                Authorize
            </button>
        </div>
        
    </div>
    
</template>

<script>
import authentication from '../api/spotify/authentication';

export default {
    // mounted() {
    //     login
    // },
    methods: {
        async onLogin() {
            authentication.loginSpotify() // .then(authentication.authorize())
            
        },
        async authorize() {
            const token = await authentication.authorize();
            console.log('logged in token: ' + token);
        }
    }

};
</script>
