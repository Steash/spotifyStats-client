<template>
    <div class="container mx-auto px-4 py-8">

        <!-- artist box -->
        <div class="flex-col items-start p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2">

            <div v-if="topArtists.length > 0">
                <h1 class="text-2xl font-bold pb-4">My Top Artists</h1>
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
                    <!-- <h4 class="w-14 px-6 my-auto text-center">{{ artist.popularity }}</h4> -->
                    <!-- <h4 v-for="(genre, index) in artist.genres" :key="index" >{{ genre }}</h4> -->
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

export default {
    name: "spotifyStats",
    data() {
        return {
            topArtists: "",
            myProfile: "",
        }
    },
    components: {
        NoData
    },
    mounted() {
        this.getTopArtists();
        this.getMyProfile();
    },
    methods: {
        async getTopArtists() {
            topItems.getTopItems(store.getters.accessToken, "artists")
                .then((data) => {
                    this.topArtists = data;
                    // console.log("top artists" + data);
                });
        },
        async getMyProfile() {
            user.getSpotifyUser(store.getters.accessToken)
                .then((data) => {
                    this.myProfile = data;
                });
        },
    },
}
</script>
    

    