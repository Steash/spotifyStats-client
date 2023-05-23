<template>
    <div class="home">
      <button v-if="!showConfirmation" @click="showConfirmation = true" >Unfriend</button>
      <button v-if="showConfirmation" @click="showConfirmation = false">Confirm</button>
      <FriendsList/>
      <ButtonComponent/>
    </div>
  </template>
  
  <script>
import FriendsList from '@/components/friends/friendsList.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';


  
  export default {
    name: 'HomeView',
    components: {
      FriendsList, 
      ButtonComponent
    },
    data() {
      return {
        showConfirmation: false,
      }
    }
  }
  </script>
  