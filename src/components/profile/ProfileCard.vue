<template>
    <!-- Outer div -->
    <div class="mx-auto max-w-5xl py-10">
        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-lg max-w-full">
            <!-- Title box -->
            <div class="flex flex-row rounded-xl bg-zinc-800 p-10 ">
                <div class="w-28 h-28 rounded-full overflow-hidden my-auto mr-6">
                    <img class="w-full h-auto my-auto" :src="user.avatar" alt="cover art">
                </div>
                <div class="flex-col flex items-start my-auto justify-center ">
                    <div class="flex flex-row items-center">
                        <h1 class="text-6xl text-white font-semibold pt- pb-4"> {{ user.displayName }}</h1>
                        <div v-if="!ownProfile">
                            <button v-if="!friends" @click="sendFriendRequest(user.spotifyId)">
                                <span class="material-symbols-outlined p-4 text-white hover:text-green-400">person_add</span>
                            </button>
                            <button v-if="friends" @click="sendFriendRequest(user.spotifyId)">
                                <span class="material-symbols-outlined p-4 text-white hover:text-green-400">person_remove</span>
                            </button>
                            <!-- {{  friends }} -->
                            <!-- <button @click="print">print </button> -->
                        </div>
                    </div>
                    <!-- <h4 v-if="!ownProfile" class="text-white pl-1">{{ mutualTopArtists.length }} mutual favorite artists</h4> -->
                    <button v-if="!ownProfile" @click="scrollToTarget('mutual-topartist-box')" class="text-white pl-1">{{ mutualTopArtists.length }} mutual favorite artists</button>
                    <h4 v-if="ownProfile" class="text-white pl-1">Your profile</h4>
                </div>
            </div>
             <!-- No data box -->
             <div v-if="topArtists.length == 0" >
                <NoData/>
            </div>

            <!-- Top Artist box -->
            <div v-if="topArtists.length > 0">
                <div class="flex-col items-start p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2" id="topArtists-box">
                    <h1 class="text-2xl font-bold pb-4">Top Artists</h1>

                    
                    <div v-if="!expandedArtists">
                        <div v-for="(artist, index) in this.topFiveArtists" :key="index" class="flex flex-row items-center py-2">

                            <h4 class="w-14 px-6 my-auto text-center">{{ artist.rank }}</h4>
                            <img class="w-12 h-12 my-auto" :src="artist.avatar" alt="cover art">
                            <div class="flex flex-row items-start justify-between flex-1 pl-4">
                                <router-link :to="{ name: 'ArtistDetail', params: { id: artist.artistSpotifyId } }" class="text-lg hover:text-gray-200">
                                <!-- <p class="w-full md:w-96 px-2">{{ artist.name }}</p> -->
                                {{ artist.artistName }}
                                </router-link>
                            </div>
                            <!-- <h4 class="w-14 px-6 my-auto text-center">{{ artist.popularity }}</h4> -->
                            <!-- <h4 v-for="(genre, index) in artist.genres" :key="index" >{{ genre }}</h4> -->
                        </div>
                        <button @click="toggleExpandedArtists" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View all</button>
                    </div>
                    
                    <div v-if="expandedArtists">
                        <div v-for="(artist, index) in this.topArtists" :key="index" class="flex flex-row items-center py-2">
                            <h4 class="w-14 px-6 my-auto text-center">{{ artist.rank }}</h4>
                            <img class="w-12 h-12 my-auto" :src="artist.avatar" alt="cover art">
                            <div class="flex flex-row items-start justify-between flex-1 pl-4">
                                <router-link :to="{ name: 'ArtistDetail', params: { id: artist.artistSpotifyId } }" class="text-lg hover:text-gray-200">
                                {{ artist.artistName }}
                                </router-link>
                            </div>
                        </div>
                        <button @click="toggleExpandedArtists" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View less</button>
                    </div>
                    
                </div>

                <!-- Mutual Top Artist box -->
                <div v-if="!ownProfile" class="flex-col flex items-start  border-gray-900 p-8 px-10" id="mutual-topartist-box">
                    <h1 class="text-2xl font-bold pb-4">Mutual Top Artists</h1>

                    <div v-if="mutualTopArtists.length > 0">
                        <div v-for="(artist, index) in this.mutualTopArtists" :key="index" 
                        class="flex flex-row justify-center align-middle py-2">

                            <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
                            <img class="w-12 h-12 my-auto" :src="artist.artistAvatar" alt="cover art">
                            <div class="flex flex-row items-start justify-between flex-1 pl-4">
                                <router-link :to="{ name: 'ArtistDetail', params: { id: artist.artistSpotifyId } }" class="text-lg hover:text-gray-200">
                                <!-- <p class="w-full md:w-96 px-2">{{ artist.name }}</p> -->
                                {{ artist.artistName }}
                                </router-link>
                            </div>
                            <!-- <p class="w-54 px-8 my-auto">{{ artist.topArtistRank }}</p> -->
                        </div>
        
                        <button class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View all</button>
                    </div>
                    <div v-if="mutualTopArtists.length == 0">
                        <p class="text-gray-500">You have no mutual top artists with {{  user.displayName }}</p>
                    </div>
                </div>
            </div>

    </div>
    </div>
    
</template>

<script>
import user from "@/api/backend/user.js"
import topArtist from "@/api/backend/topArtist.js"
import store from "@/store/"
import NoData from "@/components/reusables/NoData.vue";
import friend from "@/api/backend/friend"

export default {
    data() {
        return {
            artist: [],
            topTracks: [],
            userImage: '',
            user: '',
            topArtists: '',
            expandedArtists: false,
            mutualTopArtists: '',
            ownProfile: false,
            friends: false,
        }
    },
    components: {
        NoData
    },
    computed: {
        topFiveArtists() {
            return this.topArtists.slice(0, 5)
        },
        spotifyUrl() {
            return `https://open.spotify.com/user/${store.getters.userSpotifyId}`
        }
    },
    async mounted() {

        await this.getUserProfile()
        await this.getUserTopArtists()
        await this.getMutualTopArtists()
        if (this.$route.params.id == store.getters.userSpotifyId) {
            this.ownProfile = true
        }
        await this.isFriend(this.user.spotifyId)
        
    },
    methods: {
        async getUserProfile() {
            this.user = await user.getUser(this.$route.params.id)
        },
        async getUserTopArtists() {
            this.topArtists = await user.getTopArtists(this.$route.params.id)
        },
        toggleExpandedArtists() {
            this.expandedArtists = !this.expandedArtists
            this.scrollToTarget('topArtists-box')
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
        async getMutualTopArtists() {  
            this.mutualTopArtists = await topArtist.getMutualTopArtists(this.$route.params.id)
        },
        async sendFriendRequest(receiverId) {
            const rsp = await friend.sendFriendRequest(receiverId)
            alert(rsp)
        },
        async isFriend(friendId) {
            this.friends = await friend.isFriend(friendId)
            console.log("isFriend: " + this.friends)
        },
        print() {
            console.log("print: " + this.friends)
        }

    }

};


</script>