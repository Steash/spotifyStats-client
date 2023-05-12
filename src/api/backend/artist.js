import axios from 'axios';

const spotifyArtist = {
    async searchArtist(query) {
        const url = "http://localhost:8080/artist/search"
        const requestBody = {
            searchTerm: query,
            propertyToSortBy: "name",
            directionOfSort: "asc",
            pageNumber: 0,
            numberPerPage: 16
        }

        try {
            const response = await axios.post(url, requestBody);
            // console.log("search result: ", response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

}

export default spotifyArtist;
