<template>
  <div class="container mx-auto px-4 py-8">
    <!-- <friendsList/> -->

    <SearchBar/>

    <!-- artist box -->
    <div class="flex-col items-start p-8 px-10 border-gray-900 md:w-2/3 lg:w-1/2">
        <h1 class="text-2xl font-bold pb-4">My Top Artists</h1>
        
        <div v-for="(artist, index) in topArtists" :key="index" class="flex flex-row items-center py-2">
            <h4 class="w-14 px-6 my-auto text-center">{{ index + 1 }}</h4>
            <img class="w-12 h-12 my-auto" :src="artist.images[2].url" alt="cover art">
            <div class="flex flex-row items-start justify-between flex-1 pl-4">
                <router-link :to="{ name: 'ArtistDetail', params: { id: artist.id } }" class="text-lg hover:text-gray-200">
                  <!-- <p class="w-full md:w-96 px-2">{{ artist.name }}</p> -->
                  {{ artist.name }}
                </router-link>
            </div>
            <!-- <h4 class="w-14 px-6 my-auto text-center">{{ artist.popularity }}</h4> -->
            <!-- <h4 v-for="(genre, index) in artist.genres" :key="index" >{{ genre }}</h4> -->
        </div>
    </div>


    <!-- <div class="my-8">
      <h1 class="text-3xl font-bold mb-4">My Profile</h1>
      <p class="text-lg mb-4">
        {{ this.user.displayName }} - {{ this.user.email }} - id:
        {{ this.user.spotifyId }} - country: {{ this.user.country }} - product:
        {{ this.user.product }}
      </p>
      <img :src="this.user.avatar" class="w-32 h-32 rounded-full mb-4" />
      <div class="flex justify-center">
        <button class="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 mr-4" @click="setUser()">
          Register this user
        </button>
        <button class="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 mr-4" @click="postMyProfile()">
          Post Profile
        </button>
        <button class="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 mr-4" @click="postMyTopArtists()">
          Post Top Artist
        </button>
        <button class="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 mr-4" @click="logout()">
          Logout
        </button>
        <button class="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2" @click="postAllMyTopArtists()">
          Post all Top Artists
        </button>
      </div>
    </div> -->
  </div>
</template>
  
  
<script>
import artist from '../api/spotify/artist'
import gettoken from '../api/spotify/token'
import topItems from '../api/spotify/topItems'
import user from '../api/spotify/user'
// import authentication from '../api/spotify/authentication'
import store from '../store'
import SearchBar from './reusables/SearchBar.vue'
// import { getTopItems } from '../api/topItems';
// import friendsList from '@/components/friends/friendsList.vue'


export default {
    name: "HelloWorld",
    data() {
        return {
            newArtist: "",
            token: "",
            topArtists: "",
            myProfile: "",
            user: {
                displayName: "",
                spotifyId: "",
                email: "",
                country: "",
                avatar: "",
                product: "",
                accessToken: "",
                refreshToken: ""
            },
        }
    },
    mounted() {
        this.getTopArtists()
        this.getMyProfile()

    },
    methods: {
        async showArtist() {
            artist.getArtist(this.token).then((data) => {
                this.newArtist = data;
            })
        },
        async getToken() {
            try {
                const token = await gettoken.getToken();
                this.token = token;
            }
            catch (error) {
                console.error(error);
            }
        },
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
                console.log("my profile" + data);
                this.myProfile = data;
            });
        },
        setUser() {
            if (this.myProfile != "") {
                this.user.displayName = this.myProfile.display_name;
                this.user.spotifyId = this.myProfile.id;
                this.user.email = this.myProfile.email;
                this.user.country = this.myProfile.country;
                this.user.avatar = this.myProfile.images[0].url;
                this.user.product = this.myProfile.product;
                this.user.accessToken = store.getters.accessToken; // remove later
                this.user.refreshToken = store.getters.refreshToken;
                user.postSpotifyUser(this.user);
            }
            else {
                alert("no profile");
            }
        },
        postMyTopArtists() {
            if (this.topArtists.length > 0) {
                topItems.postTopArtist(this.topArtists[0]);
            }
            else {
                alert("No top artists found");
            }
        },
        postAllMyTopArtists() {
            if (this.topArtists.length > 0) {
                topItems.postAllTopArtists(this.topArtists);
            }
            else {
                alert("No top artists found");
            }
        },
        // logout() {
        //     authentication.logout();
        // }
    },
    components: { 
        SearchBar, 
        // friendsList 
    }
}
</script>
  
<style scoped></style>
  