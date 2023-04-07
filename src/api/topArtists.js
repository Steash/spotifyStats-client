import axios from 'axios';

const topArtists = {
  async getTopArtists() {
    const type = 'artists'
    const timeRange = 'medium_term'
    const limit = 10
    const offset = 0
    const accessToken = 'BQDCnKV8U4AEY9DyZWDMugwhbectPCIhhNd3wGWLKz6_SVbmgZDR5UCANoMnE_C9OOz7TFy3r4XCewqbYhlHNEKAGG_Z7wcPHyHaff4Uusf7jPIaQYuj'
    // const topItems = null

    const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`;
    const config = {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      }
    };

    return axios.get(url, config)
        .then(response => {
          // this.topItems = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } 
};


export default topArtists;
