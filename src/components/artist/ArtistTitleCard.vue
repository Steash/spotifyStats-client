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
                    <h4 class="text-white pl-1">13 friends also listen to {{ this.artist.name }}</h4>
                </div>
            </div>

            
            
            <!-- Song box -->
            
                <div class="flex-col items-start p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2">
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
            

            <!-- Mutual friend box -->
            <div class="flex-col flex items-start  border-gray-900 p-10">
                <h1 class="text-2xl font-bold pb-4">Friends who also listen to {{ this.artist.name }}</h1>
                <ol class="flex flex-col items-start p-2 pl-4">
                    <li>1. Jim Li</li>
                    <li>2. Willem van den Hout</li>
                    <li>3. Marcio Wood</li>
                    <li>4. Kim van </li>
                    <li>5. Jim Li</li>
                    <li>6. Jim Li</li>
                </ol>
                <h4 class=""></h4>
            </div>


    </div>
    </div>
    
</template>

<script>
import artist from "@/api/spotify/artist"
import store from "@/store/"

export default {
    data() {
        return {
            artist: [],
            topTracks: [],
            artistImage: '',
            expandedSongs: false,
        }
    },
    computed: {
        topFiveTracks() {
            return this.topTracks.slice(0, 5)
        }
    },
    mounted() {
        // console.log("artist Id: " + this.$route.params.id + "token: " + store.getters.accessToken)
        this.getArtistDetail()
        this.getArtistTopTracks()
        // console.log("CONSOLE LOGGINGGGG: ", this.artist.images[0].url)
    },
    // props: ['id'],
    methods: {
        async getArtistDetail() {
            let retrievedArtist = await artist.getArtist(store.getters.accessToken, this.$route.params.id)
            console.log(retrievedArtist)
            this.artist = retrievedArtist
            this.artistImage = this.artist.images[2].url
            // console.log("CONSOLE LOGGING2131231GG: ", this.artist.images[0].url)
        },
        async getArtistTopTracks() {
            let topTracks = await artist.getTopTracks(store.getters.accessToken, this.$route.params.id)
            console.log(topTracks)
            this.topTracks = topTracks

            for(let track in topTracks) {
                let count = 0
                console.log("track: ", track)
                console.log("track: ", topTracks[count])
                count++
            }
        },
        toggleExpandedSongs() {
            this.expandedSongs = !this.expandedSongs
        },
        convertMsToMins(ms) {
            const mins = Math.floor(ms / 60000)
            const secs = ((ms % 60000) / 1000).toFixed(0)
            return `${mins}:${(secs < 10 ? "0" : "")}${secs}`
        }
    }

};


</script>