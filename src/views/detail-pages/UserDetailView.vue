<template>
    <div class="UserDetailView">
        <ProfileCard/>
    </div>
  </template>
  
  <script>
    import ProfileCard from '@/components/profile/ProfileCard.vue';
  
  export default {
    name: 'UserDetailView',
    components: {
        ProfileCard
    }   
  }
  </script>
  