import axios from 'axios'
import store from '@/store'

const topItems = {
    async getTopItems(token, type) {
        const timeRange = 'medium_term';
        const limit = 50;
        const offset = 0;
    
        try {
            const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    time_range: timeRange,
                    limit,
                    offset,
                },
            });
            // console.log(response.data.items);
            return response.data.items;
        } catch (error) {
            console.error(error);
        }
    },
    postTopArtist(topArtist) {
        const url = 'http://localhost:8080/topArtist/create'

        const body = {
            artistSpotifyId: topArtist.id,
            rank: topArtist.popularity,
            userId: store.getters.userId,
            accessToken: store.getters.accessToken
        }

        console.log('topartist: ', topArtist)
        console.log('body: ', body)

        axios.post(url, body)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error)
            });
    },
    postAllTopArtists(topArtists) {
        const url = 'http://localhost:8080/topArtist/create/multiple'

        const topArtistDtos = topArtists.map((topArtist, index) => {
            return {
                artistSpotifyId: topArtist.id, 
                artistName: topArtist.name,
                rank: index + 1,
                userSpotifyId: store.getters.userSpotifyId,
                avatar: topArtist.images[2].url
            }
        });

        axios.post(url, topArtistDtos)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error)
            });
    }
}


export default topItems;
