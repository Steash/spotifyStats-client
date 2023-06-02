<template>
    <div class="FriendListView">
      <FriendList/>
    </div>
  </template>
  
  <script>

  import FriendList from '@/components/friends/friendsList.vue';
  
  export default {
    name: 'FriendListView',
    components: {

        FriendList
    }
  }
  </script>
  