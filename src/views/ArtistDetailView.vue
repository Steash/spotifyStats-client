<template>
    <div class="ArtistDetailView">
        <ArtistTitleCard/>
    </div>
  </template>
  
  <script>
    import ArtistTitleCard from '@/components/artist/ArtistTitleCard.vue';
  
  export default {
    name: 'ArtistDetailView',
    components: {
    ArtistTitleCard
    }   
  }
  </script>
  