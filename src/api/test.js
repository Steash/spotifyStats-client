import axios from 'axios';
// import login from './login';

const artist = {
    async getArtist(token) {

        const accessToken = token
        const artistId = '4Z8W4fKeB5YxbusRsdQVPb' // radiohead
        // let artist = null

        const url = `https://api.spotify.com/v1/artists/${artistId}`;
        const config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        };

        try {
            const response = await axios.get(url, config);
            // console.log('9 :' + response.data.name);
            return response.data;
          } catch (error) {
            console.log(error);
            return error
          }
    },
};


export default artist;
