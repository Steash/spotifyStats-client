import axios from 'axios';
import store from '@/store';
import user from './user';

const authorization = {
    clientId: '8c92a572d46545d8bba7bb2ad6d182a6',
    clientSecret: '74f45fda80ab4b1c846ff984996ce94c',
    redirectUri: 'http://localhost:8081/',
    scopes: ['user-top-read', 'user-read-private', 'user-read-email'],
    state: this.generateRandomString(16),

    /**
     * Logs the user in and obtains an access token and refresh token.
     * @returns {Promise<{accessToken: string, refreshToken: string, expiresIn: number}>}
     */

    loginWithSpotify() {
        // const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}&state=${state}`;
        const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=${encodeURIComponent(this.scopes.join(' '))}&redirect_uri=${encodeURIComponent(this.redirectUri)}&state=${this.state}`;

        window.open(authorizeUrl, '_blank', 'width=600,height=800');
    },
    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    },
    getToken(code) {
        const tokenUrl = 'https://accounts.spotify.com/api/token';
        const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;

        return fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
            },
            body,
        })
            .then((response) => response.json())
            .then((data) => data.access_token);
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
    handleRedirect() {
        const code = this.getCode()

        getToken(code).then((accessToken) => {
            // do something with the access token
        });
    }
}