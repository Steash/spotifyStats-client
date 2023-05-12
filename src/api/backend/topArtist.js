import axios from 'axios';
import store from '@/store'

const topArtist = {
    async getMutualFans(artistId) {
        // getMutualTopArtists("0du5cEVh5yTK9QJze8zA0C")
        const userId = "1125139604"; 

        const url = `http://localhost:8080/topArtist/get/mutual-fans?artistSpotifyId=${artistId}&userSpotifyId=${userId}`;
        
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getMutualTopArtists(userId) {
        // getMutualTopArtists("g324534wtgv")
        const currentUserId = store.getters.userSpotifyId; 

        const url = `http://localhost:8080/topArtist/get/mutual-topArtists?userSpotifyId1=${userId}&userSpotifyId2=${currentUserId}`;
        
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    } 
}

export default topArtist;