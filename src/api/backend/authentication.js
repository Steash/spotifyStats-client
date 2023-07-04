import axios from 'axios';
import store from '@/store';

const authentication = {

    async login(myProfile, accessToken, refreshToken) {
        console.log(myProfile)

        const url = 'http://localhost:8080/user/login'

        const loginDto = {
            "spotifyId": myProfile.id,
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }

        try {
            const response = await axios.post(url, loginDto)

            if (response.data) {
                console.log('login response: ', response.data.userSpotifyId);
                store.commit('SET_USER_SPOTIFY_ID', response.data.userSpotifyId);
                // push to home?
                return
            } 
        } catch (error) {
            console.log(error);
            throw new Error('Failed to retrieve access token');
        }

        console.log('Setting user');
        await this.setUser(myProfile)
        await this.login(myProfile, accessToken, refreshToken)

        
    },
    logout() {
        
        const url = 'http://localhost:8080/user/logout'

        const logoutDto = {
            "userSpotifyId": store.getters.userSpotifyId
        }

        axios.put(url, logoutDto)
            .then(response => {
                console.log('Token deleted: ', response.data);
                // Clear State & LocalStorage
                store.commit('CLEAR_ALL');
            }).catch(error => {
                console.log(error)
            });
    },
};

export default authentication;