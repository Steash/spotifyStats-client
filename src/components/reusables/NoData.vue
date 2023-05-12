<template>
    <div class="py-8 px-10 pb-20 flex mx-auto flex-col items-center">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" class="w-3/12 py-10">
        <h4 class="text-gray-600 pl-1 text-lg py-3">Due to your limited listen history, Spotify was</h4>
        <h4 class="text-gray-600 pl-1 text-lg py-3"> unable to determine your favorite artists and songs</h4>

        <a :href="spotifyUrl" class="text-lg hover:text-gray-200">
            <p class="text-green-500 pt-20 hover:text-green-400 text-sm">Visit Spotify account</p>
        </a>
    </div>
</template>

<script>
import store from '@/store'

export default {
    computed: {
        spotifyUrl() {
            return `https://open.spotify.com/user/${store.getters.userSpotifyId}`
        }
    },
}

</script>