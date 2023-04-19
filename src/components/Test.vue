<template>
    <h1>My top artists</h1>

    <ol>
        <li v-for="item in topArtists" :key="item.id">
            
            <router-link :to="{name: 'ArtistDetail', params:{id: item.id }}" class="hover:text-gray-200">{{ item.name }}</router-link>
            <!-- - {{ item.genres }} 
        - {{ item.popularity }} -->
            <!-- {{ item.artists.map(artist => artist.name).join(', ') }} -->
        </li>
    </ol>

    <h1>My profile</h1>
    {{ this.user.displayName }}: {{ this.user.email }} - id: {{ this.user.spotifyId }} - country: {{ this.user.country }} - product: {{ this.user.product }} 
    <img :src="this.user.avatar" />
    <button @click="setUser()">Register this user</button>
    <button @click="postMyProfile()">post profile</button>
    <button @click="postMyTopArtists()">postTopArtist</button>
    <button @click="logout()">Logout</button>
    <button @click="postAllTopArtists()">Post all Top Artists</button>
</template>
  
<script>
import artist from '../api/artist'
import gettoken from '../api/token'
import topItems from '../api/topItems'
import user from '../api/user'
import login from '../api/login'
import store from '../store'
// import { getTopItems } from '../api/topItems';


export default {
    name: 'HelloWorld',
    data() {
        return {
            newArtist: '',
            token: '',
            topArtists: '',
            myProfile: '',
            user: {
                displayName: '',
                spotifyId: '',
                email: '',
                country: '',
                avatar: '',
                product: '',
                accessToken: '',
                refreshToken: ''
            }
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
            });
        },
        async getToken() {
            try {
                const token = await gettoken.getToken();
                this.token = token;
            } catch (error) {
                console.error(error);
            }
        },
        async getTopArtists() {
            topItems.getTopItems(store.getters.accessToken, 'artists')
                .then((data) => {
                    this.topArtists = data;
                    console.log("top artist" + this.topArtists[0]);
                });
        },
        async getMyProfile() {
            user.getSpotifyUser(store.getters.accessToken)
                .then((data) => {
                    this.myProfile = data;
                });
        },
        setUser() {
            if (this.myProfile != '') {
                this.user.displayName = this.myProfile.display_name;
                this.user.spotifyId = this.myProfile.id;
                this.user.email = this.myProfile.email;
                this.user.country = this.myProfile.country;
                this.user.avatar = this.myProfile.images[0].url;
                this.user.product = this.myProfile.product;
                this.user.accessToken = store.getters.accessToken; // remove later
                this.user.refreshToken = store.getters.refreshToken;
                user.postSpotifyUser(this.user)
            } else {
                alert('no profile');
            }
        },
        postMyTopArtists() {
            if(this.topArtists.length > 0) {
                topItems.postTopArtist(this.topArtists[0])
            } else {
                alert("No top artists found")
            }
        },
        logout() {
            login.logout();
        }
    }
}
</script>
  
<style scoped></style>
  