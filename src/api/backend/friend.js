import axios from 'axios';
import store from '@/store'

const friend = {

    async sendFriendRequest(receiverId) {
        const senderId = store.getters.userSpotifyId

        const url = `http://localhost:8080/user/${senderId}/addFriend/${receiverId}`

        try {
            const response = await axios.post(url);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            // console.error(error.response.data);
            // if (error.response.data)
            return error.response.data
        }
    },
    async acceptFriendRequest(senderId) {
        const receiverId = store.getters.userSpotifyId

        const url = `http://localhost:8080/user/${receiverId}/accept-friend-request/${senderId}`

        try {
            const response = await axios.post(url);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response.data
        }
    },
    async rejectFriendRequest(senderId) {
        const receiverId = store.getters.userSpotifyId

        const url = `http://localhost:8080/user/${receiverId}/reject-friend-request/${senderId}`

        try {
            const response = await axios.put(url);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async receivedFriendRequests() {
        const spotifyId = store.getters.userSpotifyId

        const url = `http://localhost:8080/user/get/${spotifyId}/received-friend-requests`

        try {
            const response = await axios.get(url);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async sentFriendRequests() {
        const spotifyId = store.getters.userSpotifyId

        const url = `http://localhost:8080/user/get/${spotifyId}/sent-friend-requests`

        try {
            const response = await axios.get(url);
            console.log("sent requests: ", response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getFriendList() {
        const spotifyId = store.getters.userSpotifyId

        const url = `http://localhost:8080/user/get/${spotifyId}/friends`

        try {
            const response = await axios.get(url);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async deleteFriend(friendId) {
        const currentUserId = store.getters.userSpotifyId
        const url = `http://localhost:8080/user/${currentUserId}/delete-friend/${friendId}`

        try {
            const response = await axios.delete(url);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async isFriend(friendId) {
        const mySpotifyId = store.getters.userSpotifyId
        const url = `http://localhost:8080/user/get/${mySpotifyId}/isFriend/${friendId}`

        try {
            const response = await axios.get(url);
            console.log("is frienDDDDDD: ", response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async retractFriendRequest(friendId) {
        const mySpotifyId = store.getters.userSpotifyId
        const url = `http://localhost:8080/user/${mySpotifyId}/retract-friend-request/${friendId}`

        try {
            const response = await axios.delete(url);
            console.log("retracted: ", response.data)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default friend;