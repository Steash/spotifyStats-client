<template class="">
    <div class="pb-10">
        <h1 class="text-2xl font-bold pb-4">Friend list</h1>
        <div v-for="(friend, index) in friendList" :key="index" class="flex flex-row p-3">
            <router-link :to="{ name: 'UserDetail', params: { id: friend.spotifyId } }" class="flex flex-row items-center">
                <img class="w-12 h-12 my-auto" :src="friend.avatar" alt="cover art">
                <p class="px-3">{{ friend.displayName }}</p> 
            </router-link>

            <!-- Unfriend -->
            <button v-if="!confirmationVisibility[friend.spotifyId]" @click="toggleConfirmation(friend.spotifyId)" class="bg-red-500 hover:bg-red-400 text-white rounded-2xl px-3 py-1 m-1">
                Unfriend</button> 
            <div v-if="confirmationVisibility[friend.spotifyId]">
                <p>Are you sure you want to remove {{ friend.displayName }} from your friends list?</p>
                <button @click="removeFriend(friend.spotifyId)" class="bg-red-500 hover:bg-red-400 text-white rounded-2xl px-3 py-1 m-1">Unfriend</button> 
                <button @click="toggleConfirmation(friend.spotifyId)" class="bg-gray-500 hover:bg-gray-400 text-white rounded-2xl px-3 py-1 m-1">Cancel</button> 
            </div>
            
        </div>
        

        <div v-if="friendList.length == 0">
            <p>You have no friends added yet</p>
        </div>
    </div>

    <!-- <div class="pb-10">
        <h1 class="text-2xl font-bold pb-4">Friend requests</h1>
        <div v-for="(friend, index) in receivedFriendRequests" :key="index" class="flex flex-row p-3 items-center">
            <router-link :to="{ name: 'UserDetail', params: { id: friend.spotifyId } }" class="flex flex-row p-3 items-center">
                <img class="w-12 h-12 my-auto" :src="friend.avatar" alt="cover art">
                <p class="px-3">{{ friend.displayName }}</p> 
            </router-link>
            <button @click="acceptFriendRequest(friend.spotifyId)" class="bg-green-500 hover:bg-green-400 text-white rounded-2xl px-3 py-1 m-1">Accept</button> 
            <button @click="declineFriendRequest(friend.spotifyId)" class="bg-gray-500 hover:bg-gray-400 text-white rounded-2xl px-3 py-1 m-1">Decline</button>
        </div>
        <div v-if="receivedFriendRequests.length == 0">
            <p>There are no incoming friend requests</p>
        </div>
    </div> -->

    <div class="pb-10">
        <h1 class="text-2xl font-bold pb-4">Sent friend requests</h1>
        <div v-for="(friend, index) in sentFriendRequests" :key="index">
            <div class="flex flex-row p-3 items-center">
                <router-link :to="{ name: 'UserDetail', params: { id: friend.spotifyId } }" class="flex flex-row items-center">
                    <img class="w-12 h-12 my-auto" :src="friend.avatar" alt="cover art" > 
                    <p class="px-3">{{ friend.displayName }}</p>
                </router-link>

                <!-- Retract friend request -->
                <!-- <button v-if="!retractConfirmationVisibility[friend.spotifyId]" 
                @click="toggleRetractConfirmation(friend.spotifyId)"
                class="text-red-300 ">Retract friend request</button> -->

                <button v-if="!retractConfirmationVisibility[friend.spotifyId]" 
                @click="toggleRetractConfirmation(friend.spotifyId)" 
                class="bg-red-500 hover:bg-red-400 text-white rounded-2xl px-3 py-1 m-1">
                Retract friend request</button> 
                

                <div v-if="retractConfirmationVisibility[friend.spotifyId]">
                    <p>Are you sure you want to retract your friend request to {{ friend.displayName }}?</p>
                    <button @click="retractFriendRequest(friend.spotifyId)" class="bg-red-500 hover:bg-red-400 text-white rounded-2xl px-3 py-1 m-1">Retract friend request</button> 
                    <button @click="toggleRetractConfirmation(friend.spotifyId)" class="bg-gray-500 hover:bg-gray-400 text-white rounded-2xl px-3 py-1 m-1">Cancel</button> 
                </div>


            </div>
        </div>
        <div v-if="sentFriendRequests.length == 0">
            <p>You have not sent any friend requests</p>
        </div>
    </div>

</template>

<script>
import friend from '@/api/backend/friend'

export default {
    name: "HelloWorld",
    data() {
        return {
            receivedFriendRequests: [],
            sentFriendRequests: [],
            friendList: [],
            accepted: "",
            rejected: "",
            removed: "",
            retracted: "",
            confirmationVisibility: {},
            retractConfirmationVisibility: {},
        };
    },
    async mounted() {
        this.friendList = await friend.getFriendList()

            this.sentFriendRequests = await friend.sentFriendRequests() 
            this.receivedFriendRequests = await friend.receivedFriendRequests() 
            console.log("received: ", this.receivedFriendRequests)
    },
    methods: {
        // async friend() {



        // },
        async acceptFriendRequest(senderId) {
            this.accepted = await friend.acceptFriendRequest(senderId)
            console.log(this.accepted)
        },
        async declineFriendRequest(senderId) {
            this.rejected = await friend.rejectFriendRequest(senderId)
            console.log(this.rejected)
        },
        toggleConfirmation(spotifyId) {
            if (this.confirmationVisibility[spotifyId]) {
                delete this.confirmationVisibility[spotifyId];
            } else {
                this.confirmationVisibility[spotifyId] = true;
            }
        },
        toggleRetractConfirmation(spotifyId) {
            if (this.retractConfirmationVisibility[spotifyId]) {
                delete this.retractConfirmationVisibility[spotifyId];
            } else {
                this.retractConfirmationVisibility[spotifyId] = true;
            }
        },
        async removeFriend(friendId) {
            this.removed = await friend.deleteFriend(friendId)
            console.log(this.removed)
            // this.confirmationVisible = false;
            delete this.confirmationVisibility[friendId];
        },
        async retractFriendRequest(friendId) {
            this.retracted = await friend.retractFriendRequest(friendId)
        }
    },
}
</script>
