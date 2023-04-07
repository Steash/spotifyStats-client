<template>
  <h1>Hello world</h1>

  <!-- <ul>
    <li v-for="(artist, index) in topArtists.items" :key="index">
      {{ artist.name }}
    </li>
  </ul> -->
</template>

<script>
// import axios from 'axios';
// import artist from '../api/test';

export default {
  name: 'HelloWorld',
  data() {
    return {
      type: 'artists',
      timeRange: 'medium_term',
      limit: 10,
      offset: 0,
      accessToken: 'BQDCnKV8U4AEY9DyZWDMugwhbectPCIhhNd3wGWLKz6_SVbmgZDR5UCANoMnE_C9OOz7TFy3r4XCewqbYhlHNEKAGG_Z7wcPHyHaff4Uusf7jPIaQYuj',
      topItems: null,
      artist: null
    }
  },
  mounted() {
    // this.getTopItems();
    // this.artist = artist.getArtist();
    // console.log('1' + this.artist);
  },
  // methods: {
  //   async getTopItems() {
  //     const url = `https://api.spotify.com/v1/me/top/${this.type}?time_range=${this.timeRange}&limit=${this.limit}&offset=${this.offset}`;

  //     const config = {
  //       headers: {
  //         'Authorization': 'Bearer ' + this.accessToken
  //       }
  //     };

  //     // const response = await axios.get(url, config);
  //     // this.topItems = response.data;
  //     // // console.log(this.topItems);

  //     return axios.get(url, config)
  //       .then(response => {
  //         this.topItems = response.data;
  //         console.log(this.topItems);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         // handle the error here, e.g. show an error message to the user
  //       });
    // }
  // }
}
</script>

<style scoped>

</style>
