import axios from 'axios';

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
            return response.data.items;
        } catch (error) {
            console.error(error);
        }
    },
    postTopArtist(topArtist) {
        const url = 'http://localhost:8080/topArtist/create'

        const body = {
            artistSpotifyId: topArtist.artistSpotifyId
            rank: topArtist.rank,
            userId: $store.get
        }

        console.log(topArtist)
        console.log(body)

        axios.post(url, body)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error)
            });
    }

    // For artist in topartist
	// Artist id
	
	// Finnd artist in own DB
	// 	If successful
	// 		Post topartist
	// 	If not successful
	// 		Post artist
	// 			Post topartist

}


export default topItems;
