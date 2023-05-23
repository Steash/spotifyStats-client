<template class="">
    <div class="pb-10">
        <button v-if="!test" @click="test = true" class="bg-gray-400" >Unfriend</button>
      <button v-if="test" @click="test = false">Confirm</button>
      {{ test }}
      <button @click="printTest" class="bg-gray-300">print test</button>

        <h1 class="text-2xl font-bold pb-4">Friend list</h1>
        <div v-for="(friend, index) in friendList" :key="index" class="flex flex-row p-3">
            <router-link :to="{ name: 'UserDetail', params: { id: friend.spotifyId } }" class="flex flex-row items-center">
                <img class="w-12 h-12 my-auto" :src="friend.avatar" alt="cover art">
                <p class="px-3">{{ friend.displayName }}</p> 
            </router-link>
            <button v-if="!confirmationVisible" @click="confirmationVisible = true" class="bg-red-500 hover:bg-red-400 text-white rounded-2xl px-3 py-1 m-1">
                hi</button> 
            {{ confirmationVisible }}
            <!-- <div v-if="confirmationVisible">
                <p>Are you sure you want to remove {{ friend.displayName }} from your friends list?</p>
                <button @click="removeFriend(friend.spotifyId)" class="bg-red-500 hover:bg-red-400 text-white rounded-2xl px-3 py-1 m-1">Unfriend</button> 
                <button @click="cancelUnfriend" class="bg-gray-500 hover:bg-gray-400 text-white rounded-2xl px-3 py-1 m-1">Cancel</button> 
            </div> -->
            
        </div>
        <div v-if="friendList.length == 0">
            <p>You have no friends added yet</p>
        </div>
    </div>

    <div class="pb-10">
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
    </div>

    <div class="pb-10">
        <h1 class="text-2xl font-bold pb-4">Sent friend requests</h1>
        <div v-for="(friend, index) in sentFriendRequests" :key="index">
            <router-link :to="{ name: 'UserDetail', params: { id: friend.spotifyId } }" class="flex flex-row p-3 items-center">
                <img class="w-12 h-12 my-auto" :src="friend.avatar" alt="cover art" > 
                <p class="px-3">{{ friend.displayName }}</p>
            </router-link>
        </div>
        <div v-if="sentFriendRequests.length == 0">
            <p>There are no sent friend requests</p>
        </div>
    </div>

</template>

<script>
import friend from '@/api/backend/friend'

export default {
    name: "HelloWorld",
    data() {
        return {
            receivedFriendRequests: "",
            sentFriendRequests: "",
            accepted: "",
            friendList: "",
            removed: "",
            confirmationVisible: false,
            test: false,
        };
    },
    // computed: {

    // }
    async mounted() {
        await this.friend()
    },
    methods: {
        async friend() {
            this.sentFriendRequests = await friend.sentFriendRequests() 
            // console.log("sent ", this.sentFriendRequests)
            this.friendList = await friend.getFriendList()
            this.receivedFriendRequests = await friend.receivedFriendRequest() 
            // console.log("received: ", this.receivedFriendRequests)
            
        
        },
        async acceptFriendRequest(senderId) {
            this.accepted = await friend.acceptFriendRequest(senderId)
            console.log(this.accepted)
        },
        async declineFriendRequest(senderId) {
            this.rejected = await friend.rejectFriendRequest(senderId)
            console.log(this.rejected)
        },
        async removeFriend(friendId) {
            this.removed = await friend.removeFriend(friendId)
            console.log(this.removed)
            this.confirmationVisible = false;
        },
        // confirmUnfriend() {
        //     this.unfriendConfirmation = !this.unfriendConfirmation
        // },
        showConfirmation() {
            this.confirmationVisible = true;
            console.log(this.confirmationVisible);
        },
        cancelUnfriend() {
            this.confirmationVisible = false;
        },
        printTest() {
            console.log("test: ", this.test)
        }
 
    },
}
</script>
