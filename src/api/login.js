import axios from 'axios';
import store from '../store';

const login = {
    clientId: '8c92a572d46545d8bba7bb2ad6d182a6',
    clientSecret: '74f45fda80ab4b1c846ff984996ce94c',
    redirectUri: 'http://localhost:8081/',
    scopes: ['user-top-read', 'user-read-private', 'user-read-email'], 

    /**
     * Logs the user in and obtains an access token and refresh token.
     * @returns {Promise<{accessToken: string, refreshToken: string, expiresIn: number}>}
     */
    async authorize() {
        const code = await this.getCode();
        const tokens = await this.getTokens(code);
        return tokens;
    },

    /**
     * Redirects the user to the Spotify authorization page.
     */
    login() {
        const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=${encodeURIComponent(this.scopes.join(' '))}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
        
        window.location = url;
    },

    /**
     * Retrieves the authorization code from the URL query parameters.
     * @returns {Promise<string>}
     */
    getCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            return code;
        } else {
            throw new Error('Authorization code not found in URL');
        }
    },
    /**
     * Exchanges the authorization code for an access token and refresh token.
     * @param {string} code - The authorization code obtained from the Spotify authorization page.
     * @returns {Promise<{accessToken: string, refreshToken: string, expiresIn: number}>}
     */
    async getTokens(code) {
        const url = `https://accounts.spotify.com/api/token`;
        const data = new URLSearchParams();
        data.append('grant_type', 'authorization_code');
        data.append('code', code);
        data.append('redirect_uri', this.redirectUri);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
            }
        };
        try {
            const response = await axios.post(url, data, config);

            console.log(response);

            const tokens = {
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
                expiresIn: response.data.expires_in
            };

            // Save tokens to Vuex store
            store.commit('SET_ACCESS_TOKEN', tokens.accessToken);
            store.commit('SET_REFRESH_TOKEN', tokens.refreshToken);
            store.commit('SET_EXPIRES_IN', tokens.expiresIn);

            return tokens;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to retrieve access token');
        }
    }
};

export default login;
