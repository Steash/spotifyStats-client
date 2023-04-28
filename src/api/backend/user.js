import axios from 'axios';

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
    async getMutualTopArtists(artistId) {
        // getMutualTopArtists("0du5cEVh5yTK9QJze8zA0C")
        const userId = "1125139604"; 

        const url = `http://localhost:8080/topArtist/get/mutual-fans?artistSpotifyId=${artistId}&userSpotifyId=${userId}`;
        
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    } 
}

export default spotifyUser;
