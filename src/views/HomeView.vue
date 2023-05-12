<template>
  <div class="home">
    <InfoPage v-if="!store.getters.userSpotifyId"></InfoPage>
    <SpotifyStats v-if="store.getters.userSpotifyId"></SpotifyStats>
  </div>
</template>
  
<script>
import InfoPage from '@/components/home/InfoPage.vue';
import SpotifyStats from '@/components/home/SpotifyStats.vue';
import store from '@/store'

export default {
  name: 'HomeView',
  data() {
    return {
      store
    }
  },
  components: {
    InfoPage,
    SpotifyStats
  }
}
</script>

