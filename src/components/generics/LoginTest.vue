<template>

    <div class="flex">
        <div class="mx-auto">
            <button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 px-4 my-2" @click="loginWithSpotify()">
                Login with Spotify
            </button>

            <!-- <button class="border border-gray-800 rounded-lg py-2 px-4 my-2" @click="authorize">
                Authorize
            </button> -->
        </div>
        
    </div>
    
</template>

<script>

export default {

    methods: {
        loginWithSpotify() {
            const clientId = '8c92a572d46545d8bba7bb2ad6d182a6';
            // const clientSecret = '74f45fda80ab4b1c846ff984996ce94c'
            const redirectUri = 'http://localhost:8081/';
            const scopes = 'user-top-read user-read-private user-read-email';
            const state = this.generateRandomString(16);
            const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}&state=${state}`;

            window.open(authorizeUrl, '_blank', 'width=600,height=800');
        },
        generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';

            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            return result;
        },
        getToken(code) {
            const clientId = '<YOUR_CLIENT_ID>';
            const clientSecret = '<YOUR_CLIENT_SECRET>';
            const redirectUri = '<YOUR_REDIRECT_URI>';
            const tokenUrl = 'https://accounts.spotify.com/api/token';
            const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;

            return fetch(tokenUrl, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                },
                body,
            })
                .then((response) => response.json())
                .then((data) => data.access_token);
            }
    }

};
</script>
