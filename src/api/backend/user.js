import axios from 'axios';
import store from '@/store'

const spotifyUser = {
    async getUser(id) {   
        const url = `http://localhost:8080/user/get/${id}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getTopArtists(id) {   
        const url = `http://localhost:8080/topArtist/get/user/${id}`;

        try {
            const response = await axios.get(url);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getMusicBuddies() {   
        const id = store.getters.userSpotifyId
        const url = `http://localhost:8080/user/get/music-buddies/${id}`;

        try {
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async searchUser(query) {
        const url = "http://localhost:8080/user/search"
        const requestBody = {
            searchTerm: query,
            propertyToSortBy: "displayName",
            directionOfSort: "asc",
            pageNumber: 0,
            numberPerPage: 16
        }

        try {
            const response = await axios.post(url, requestBody);
            console.log("search result: ", response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    
}

export default spotifyUser;
