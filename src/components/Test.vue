<template>
    <h1>My top artists</h1>

    <ol>
        <li v-for="item in topArtists" :key="item.id">
            {{ item.name }}
            <!-- - {{ item.genres }} 
        - {{ item.popularity }} -->
            <!-- {{ item.artists.map(artist => artist.name).join(', ') }} -->
        </li>
    </ol>

    <h1>My profile</h1>
    {{ this.user.displayName }}: {{ this.user.email }} - id: {{ this.user.spotifyId }} - country: {{ this.user.country }} - product: {{ this.user.product }} 
    <img :src="this.user.avatar" />
    <button @click="setUser()">set user</button>
    <button @click="postMyProfile()">post profile</button>
    <button @click="postMyTopArtists()">postTopArtist</button>
</template>
  
<script>
import artist from '../api/artist';
import gettoken from '../api/token';
import topItems from '../api/topItems';
import user from '../api/user';
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
                token: ''
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
            topItems.getTopItems(this.$store.getters.accessToken, 'artists')
                .then((data) => {
                    this.topArtists = data;
                    console.log("top artist" + this.topArtists[0]);
                });
        },
        async getMyProfile() {
            user.getSpotifyUser(this.$store.getters.accessToken)
                .then((data) => {
                    this.myProfile = data;
                });
        },
        setUser() {
            this.user.displayName = this.myProfile.display_name;
            this.user.spotifyId = this.myProfile.id;
            this.user.email = this.myProfile.email;
            this.user.country = this.myProfile.country;
            this.user.avatar = this.myProfile.images[0].url;
            this.user.product = this.myProfile.product;
            this.user.token = this.$store.getters.accessToken; // remove later

            user.postSpotifyUser(this.user)

        },
        postMyTopArtists() {
            topItems.postTopArtist(this.topArtists[0])
        }
    }
}
</script>
  
<style scoped></style>
  