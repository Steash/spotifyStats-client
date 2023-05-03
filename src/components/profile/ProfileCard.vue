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
                    <h1 class="text-6xl text-white font-semibold pt- pb-4"> {{ user.displayName }}</h1>
                    <!-- <h4 v-if="!ownProfile" class="text-white pl-1">{{ mutualTopArtists.length }} mutual favorite artists</h4> -->
                    <button v-if="!ownProfile" @click="scrollToTarget('mutual-topartist-box')" class="text-white pl-1">{{ mutualTopArtists.length }} mutual favorite artists</button>
                    <h4 v-if="ownProfile" class="text-white pl-1">Your profile</h4>
                </div>
            </div>
            <!-- Song box -->
            <!-- <div class="flex-col flex items-start  border-gray-900 p-8 px-10">
                <h1 class="text-2xl font-bold pb-4">Top Songs</h1>
                <div class="flex flex-row justify-center align-middle py-2">
                    <h4 class="w-14 px-4  my-auto">1</h4>
                    <img class="w-12 h-12 my-auto" src="https://i1.sndcdn.com/artworks-NpNe0awEZAz9Ol0t-CoGXIA-t500x500.jpg" alt="cover art"> 
                    <p class="w-7/12 px-8 pr-72 my-auto">Cherry Wine</p>
                    <p class="w-54 px-8 my-auto">91,535,385</p>
                    <p class="w-54 px-8 my-auto">2:53</p>
                </div>
                <div class="flex flex-row justify-center align-middle py-2">
                    <h4 class="w-14 px-4  my-auto">2</h4>
                    <img class="w-12 h-12 my-auto" src="https://i1.sndcdn.com/artworks-NpNe0awEZAz9Ol0t-CoGXIA-t500x500.jpg" alt="cover art"> 
                    <p class="w-7/12 px-8 pr-72 my-auto">Cherry Wine</p>
                    <p class="w-54 px-8 my-auto">91,535,385</p>
                    <p class="w-54 px-8 my-auto">2:53</p>
                </div>
                <div class="flex flex-row justify-center align-middle py-2">
                    <h4 class="w-14 px-4  my-auto">3</h4>
                    <img class="w-12 h-12 my-auto" src="https://i1.sndcdn.com/artworks-NpNe0awEZAz9Ol0t-CoGXIA-t500x500.jpg" alt="cover art"> 
                    <p class="w-7/12 px-8 pr-72 my-auto">Cherry Wine</p>
                    <p class="w-54 px-8 my-auto">91,535,385</p>
                    <p class="w-54 px-8 my-auto">2:53</p>
                </div>
                <div class="flex flex-row justify-center align-middle py-2">
                    <h4 class="w-14 px-4  my-auto">4</h4>
                    <img class="w-12 h-12 my-auto" src="https://i1.sndcdn.com/artworks-NpNe0awEZAz9Ol0t-CoGXIA-t500x500.jpg" alt="cover art"> 
                    <p class="w-7/12 px-8 pr-72 my-auto">Cherry Wine</p>
                    <p class="w-54 px-8 my-auto">91,535,385</p>
                    <p class="w-54 px-8 my-auto">2:53</p>
                </div>
                <div class="flex flex-row justify-center align-middle py-2">
                    <h4 class="w-14 px-4  my-auto">5</h4>
                    <img class="w-12 h-12 my-auto" src="https://i1.sndcdn.com/artworks-NpNe0awEZAz9Ol0t-CoGXIA-t500x500.jpg" alt="cover art"> 
                    <p class="w-7/12 px-8 pr-72 my-auto">Cherry Wine</p>
                    <p class="w-54 px-8 my-auto">91,535,385</p>
                    <p class="w-54 px-8 my-auto">2:53</p>
                </div>
                <button class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View all</button>
            </div> -->
             <!-- artist box -->
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

            <!-- Top Artist box -->
                <!-- <div class="flex-col flex items-start  border-gray-900 p-8 px-10">
                    <h1 class="text-2xl font-bold pb-4">Top Artists</h1>

                    <div class="flex flex-row justify-center align-middle py-2">
                        <h4 class="w-14 px-4  my-auto">1</h4>
                        <img class="w-12 h-12 my-auto" src="https://i1.sndcdn.com/artworks-NpNe0awEZAz9Ol0t-CoGXIA-t500x500.jpg" alt="cover art"> 
                        <p class="w-82 px-8 pr-72 my-auto">Grentperez</p>
                        <p class="w-54 px-8 my-auto">57</p>
                    </div>
    
                    <button class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View all</button>
                </div> -->
                <!-- Top Artist box -->
                <div v-if="!ownProfile" class="flex-col flex items-start  border-gray-900 p-8 px-10" id="mutual-topartist-box">
                    <h1 class="text-2xl font-bold pb-4">Mutual Top Artists</h1>

                    <div v-for="(artist, index) in this.mutualTopArtists" :key="index" 
                    class="flex flex-row justify-center align-middle py-2">
                        <h4 class="w-14 px-4  my-auto">{{ index + 1 }}</h4>
                        <img class="w-12 h-12 my-auto" :src="artist.artistAvatar" alt="artist"> 
                        <p class="w-82 px-8 pr-72 my-auto">{{ artist.artistName }}</p>
                        <p class="w-54 px-8 my-auto">{{ artist.topArtistRank }}</p>
                    </div>
    
                    <button class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View all</button>
                </div>

                <!-- Top Artist box -->
                <!-- <div class="flex-col flex items-start  border-gray-900 p-8 px-10">
                    <h1 class="text-2xl font-bold pb-4">Mutual Top Songs</h1>

                    <div class="flex flex-row justify-center align-middle py-2">
                        <h4 class="w-14 px-4  my-auto">1</h4>
                        <img class="w-12 h-12 my-auto" src="https://i1.sndcdn.com/artworks-NpNe0awEZAz9Ol0t-CoGXIA-t500x500.jpg" alt="cover art"> 
                        <p class="w-82 px-8 pr-72 my-auto">Grentperez</p>
                        <p class="w-54 px-8 my-auto">57</p>
                    </div>
    
                    <button class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View all</button>
                </div> -->

    </div>
    </div>
    
</template>

<script>
import user from "@/api/backend/user.js"
import topArtist from "@/api/backend/topArtist.js"
import store from "@/store/"

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
            ownProfile: false
        }
    },
    computed: {
        topFiveArtists() {
            return this.topArtists.slice(0, 5)
        }
    },
    mounted() {
        this.getUserProfile()
        this.getUserTopArtists()
        this.getMutualTopArtists()
        if (this.$route.params.id == store.getters.userSpotifyId) {
            this.ownProfile = true
        }
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
    }

};


</script>