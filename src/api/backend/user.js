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
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
}

export default spotifyUser;
