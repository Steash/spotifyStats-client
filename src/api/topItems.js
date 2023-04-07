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

    }
}


export default topItems;
