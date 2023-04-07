import axios from 'axios';

const spotifyUser = {
    async getSpotifyUser(token) {   
        const url = `https://api.spotify.com/v1/me/`;
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        try {
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    postSpotifyUser(user) {
        const url = 'http://localhost:8080/user/create'

        console.log(user)

        axios.post(url, user)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error)
            });
    }
}

export default spotifyUser;



