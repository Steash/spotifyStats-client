<template>
    <!-- Outer div -->
    <div class="mx-auto max-w-5xl py-10">
        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-lg max-w-full ">
            <!-- Title box -->
            <div class="flex flex-row rounded-xl bg-zinc-800 p-10 ">
                <div class="w-28 h-28 rounded-full overflow-hidden my-auto mr-6">
                    <img class="w-full h-auto my-auto" :src="this.artistImage" alt="cover art">
                    
                </div>
                <div class="flex-col flex items-start my-auto justify-center ">
                    <h1 class="text-6xl text-white font-semibold pt- pb-4"> {{ this.artist.name }}</h1>
                    <button @click="scrollToTarget('mutual-fan-box')" class="text-white pl-1">{{ mutualFans.length }} friends also listen to {{ this.artist.name }}</button>
                </div>
            </div>

            
            
            <!-- Song box -->
            
                <div class="flex-col items-start p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2" id="popular-songs-box">
                    <h1 class="text-2xl font-bold pb-4">Popular</h1>
                    
                    <div v-if="!expandedSongs">
                        <div v-for="(track, index) in this.topFiveTracks" :key="index" class="flex flex-row items-center py-2">
                            <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
                            <img class="w-12 h-12 my-auto" :src="track.album.images[2].url" alt="cover art">
                            <div class="flex flex-row items-start justify-between flex-1 pl-4">
                                <p class="w-full md:w-96 px-2">{{ track.name }}</p>
                                <p class="text-right md:w-96 sm:w-48 px-6">{{ convertMsToMins(track.duration_ms) }}</p>
                            </div>
                        </div>
                        <button @click="toggleExpandedSongs" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View more</button>
                    </div>

                    <div v-if="expandedSongs">
                        <div v-for="(track, index) in this.topTracks" :key="index" class="flex flex-row items-center py-2">
                            <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
                            <img class="w-12 h-12 my-auto" :src="track.album.images[2].url" alt="cover art">
                            <div class="flex flex-row items-start justify-between flex-1 pl-4">
                                <p class="w-full md:w-96 px-2">{{ track.name }}</p>
                                <p class="text-right md:w-96 sm:w-48 px-6">{{ convertMsToMins(track.duration_ms) }}</p>
                            </div>
                        </div>
                        <button @click="toggleExpandedSongs" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View less</button>
                    </div>
                
            </div>

           <!-- Mutual fan box -->
            
            <div class="flex-col items-start p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2" id="mutual-fan-box">
                    <h1 class="text-2xl font-bold pb-4">Friends who also listen to {{ this.artist.name }}</h1>
                    
                    <div>
                        <div v-for="(user, index) in this.mutualFans" :key="index" class="flex flex-row items-center py-2">
                            <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
                            <img class="w-12 h-12 my-auto" :src="user.avatar" alt="user">
                            <div class="flex flex-row items-start justify-between flex-1 pl-4">
                                <p class="w-full md:w-96 px-2">{{ user.displayName }}</p>
                            </div>
                        </div>
                        <!-- <button @click="toggleExpandedSongs" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View more</button> -->
                    </div>



                
                
            </div>


    </div>
    </div>
    
</template>

<script>
import artist from "@/api/spotify/artist"
import store from "@/store/"
import topArtist from "@/api/backend/topArtist"

export default {
    data() {
        return {
            artist: [],
            topTracks: [],
            artistImage: '',
            expandedSongs: false,
            mutualFans : '',
        }
    },
    computed: {
        topFiveTracks() {
            return this.topTracks.slice(0, 5)
        }
    },
    mounted() {
        this.scrollToTop();
        // console.log("artist Id: " + this.$route.params.id + "token: " + store.getters.accessToken)
        this.getArtistDetail()
        this.getArtistTopTracks()
        // console.log("CONSOLE LOGGINGGGG: ", this.artist.images[0].url)
        // console.log("CONSOLE LOGGINGGGG: ", this.artist[0].name)
        this.getMutuals()
        
    },
    // props: ['id'],
    methods: {
        async getArtistDetail() {
            const retrievedArtist = await artist.getArtist(store.getters.accessToken, this.$route.params.id)
            // console.log("retrieved artist: ", retrievedArtist)
            this.artist = retrievedArtist
            this.artistImage = this.artist.images[2].url
            // console.log("CONSOLE LOGGING2131231GG: ", this.artist.images[0].url)
        },
        async getArtistTopTracks() {
            this.topTracks = await artist.getTopTracks(store.getters.accessToken, this.$route.params.id)
        },
        async getMutuals() {
            this.mutualFans = await topArtist.getMutualFans("0du5cEVh5yTK9QJze8zA0C") // this.artist.name
        },
        toggleExpandedSongs() {
            this.expandedSongs = !this.expandedSongs
            this.scrollToTarget('popular-songs-box')
        },
        convertMsToMins(ms) {
            const mins = Math.floor(ms / 60000)
            const secs = ((ms % 60000) / 1000).toFixed(0)
            return `${mins}:${(secs < 10 ? "0" : "")}${secs}`
        },
        scrollToTarget(id) {
            const targetElement = document.getElementById(id)
            targetElement.scrollIntoView({ behavior: 'smooth'})
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }

};


</script>