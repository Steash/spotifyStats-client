<template>
    <div class="container mx-auto px-4 py-8">

        <!-- Music buddies -->

        <div class="flex-col items-center p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2">
            <h1 class="text-2xl font-bold pb-4" id="topArtists-box">Your Music Buddies</h1>
            
            <div v-if="musicBuddies">
                <h3 class="font-bold text-base pl-96">Mutual Top Artists</h3> 
                
                <div v-for="(musicBuddy, index) in musicBuddies" :key="index" class="flex flex-row items-center py-2">
                    <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
                    <img class="w-12 h-12 my-auto" :src="musicBuddy.avatar" alt="cover art">
                    
                    <div class="flex flex-row items-start justify-between flex-1 pl-4">
                        <router-link :to="{ name: 'UserDetail', params: { id: musicBuddy.spotifyId } }"
                            class="text-lg hover:text-gray-200">
                            <!-- <p class="w-full md:w-96 px-2">{{ artist.name }}</p> -->
                            {{ musicBuddy.displayName }}
                        </router-link>
                    </div>
                    <h4 class="w-14 px-6 my-auto text-center">{{ musicBuddy.mutualTopArtists.length }}</h4>
                </div>
                <!-- <button @click="toggleExpandedArtists" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View less</button> -->
            </div>
            <div v-if="!musicBuddies">
                <p class="text-gray-500 py-2">There are no common mutual top artists found between you and your friends. </p>
                <p class="text-gray-500 py-2">Consider adding more friends to discover who your music buddies are!</p>
            </div>
            
        </div>



        <!-- artist box -->
        <div class="flex-col items-start p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2">
            

            <div v-if="topArtists.length > 0">
                <h1 class="text-2xl font-bold pb-4" id="topArtists-box">My Top Artists</h1>

                <div v-if="!expandedArtists">
                    <div v-for="(artist, index) in topFiveArtists" :key="index" class="flex flex-row items-center py-2">
                        <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
                        <img class="w-12 h-12 my-auto" :src="artist.images[2].url" alt="cover art">
                        <div class="flex flex-row items-start justify-between flex-1 pl-4">
                            <router-link :to="{ name: 'ArtistDetail', params: { id: artist.id } }"
                                class="text-lg hover:text-gray-200">
                                <!-- <p class="w-full md:w-96 px-2">{{ artist.name }}</p> -->
                                {{ artist.name }}
                            </router-link>
                        </div>
                        <!-- <h4 class="w-14 px-6 my-auto text-center">{{ artist.popularity }}</h4> -->
                        <!-- <h4 v-for="(genre, index) in artist.genres" :key="index" >{{ genre }}</h4> -->
                        
                    </div>
                    <button @click="toggleExpandedArtists" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View all</button>
                </div>

                <div v-if="expandedArtists">
                    <div v-for="(artist, index) in topArtists" :key="index" class="flex flex-row items-center py-2">
                        <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
                        <img class="w-12 h-12 my-auto" :src="artist.images[2].url" alt="cover art">
                        <div class="flex flex-row items-start justify-between flex-1 pl-4">
                            <router-link :to="{ name: 'ArtistDetail', params: { id: artist.id } }"
                                class="text-lg hover:text-gray-200">
                                <!-- <p class="w-full md:w-96 px-2">{{ artist.name }}</p> -->
                                {{ artist.name }}
                            </router-link>
                        </div>
                    </div>
                    <button @click="toggleExpandedArtists" class="px-5 py-4 text-gray-500 hover:text-green-600 hover:font-medium">View less</button>
                </div>
            </div>
            
            
        </div>
        <div v-if="topArtists.length == 0">
            <NoData/>
        </div>

    </div>
</template>
    
    
<script>
import topItems from '@/api/spotify/topItems'
import user from '@/api/spotify/user'
import store from '@/store'
import NoData from "@/components/reusables/NoData.vue";
import backendUser from '@/api/backend/user'

export default {
    name: "spotifyStats",
    data() {
        return {
            topArtists: '',
            myProfile: '',
            expandedArtists: false,
            musicBuddies: '',
        }
    },
    components: {
        NoData
    },
    async mounted() {
        await this.getTopArtists();
        await this.getMyProfile();
        await this.getMusicBuddies()
    },
    computed: {
        topFiveArtists() {
            return this.topArtists.slice(0, 5)
        },
    },
    methods: {
        async getTopArtists() {
            topItems.getTopItems(store.getters.accessToken, "artists")
                .then((data) => {
                    this.topArtists = data;
                    // console.log("top artists" + data);
                });
        },
        async getUserTopArtists() {
            this.topArtists = await user.getTopArtists(store.getters.userSpotifyId)
        },
        async getMyProfile() {
            user.getSpotifyUser(store.getters.accessToken)
                .then((data) => {
                    this.myProfile = data;
                });
        },
        toggleExpandedArtists() {
            this.expandedArtists = !this.expandedArtists
            this.scrollToTarget('topArtists-box')
        },
        scrollToTarget(id) {
            const targetElement = document.getElementById(id)
            targetElement.scrollIntoView({ behavior: 'smooth'})
        },
        async getMusicBuddies() {
            this.musicBuddies = await backendUser.getMusicBuddies()
            console.log('My MusicBuddies: ', this.musicBuddies)
        }
    },
}
</script>
    

    