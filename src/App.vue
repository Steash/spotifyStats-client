<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"/>
  <NavBar/>
  <router-view/>
  <Footer></Footer>
</template>

<style>

nav {
  text-align: center;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
// import login from './api/login';

import NavBar from '@/components/reusables/NavBar.vue';
import Footer from '@/components/reusables/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  // mounted() {
  //   this.scrollToTop();
  // },
  // methods: {
  //   scrollToTop() {
  //     window.scrollTo(0, 0);
  //   }
  // }
}

</script>
