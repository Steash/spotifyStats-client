import axios from 'axios';

const token = {
  async getToken() {
    return new Promise((resolve, reject) => {
      axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id: '8c92a572d46545d8bba7bb2ad6d182a6',
        client_secret: '74f45fda80ab4b1c846ff984996ce94c'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => {
          console.log(response.data); // Do something with the response data
          resolve(response.data.access_token);
        })
        .catch((error) => {
          console.error(error); // Handle the error
          reject(error);
        });
    });
  },

  // async startTimer() {
  //   const intervalId = setInterval(async () => {
  //     try {
  //       const token = await getToken();
  //       console.log('New access token:', token); // Or do something else with the token
  //     } catch (error) {
  //       console.error(error); // Handle the error
  //     }
  //   }, 59 * 60 * 1000); // 59 minutes in milliseconds
  
  //   return intervalId; // Return the interval ID so we can stop the timer later if needed
  // }


};


export default token;
