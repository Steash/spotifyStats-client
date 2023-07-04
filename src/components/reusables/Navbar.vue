<!-- <template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/user/1">User</router-link> |
    </nav>
</template> -->

<template>
    <div class="">
        <section class="relative mx-auto my-auto">
            <!-- navbar -->
            <nav class="bg-zinc-900  w-full">
                <div class="px-4 flex w-full items-center justify-between text-white">
                    <div id="left">
                        <router-link to="/" class="text-3xl font-bold font-heading">
                            <h1 class="text-white">ConcertBuddies</h1>
                            <!-- <img
                                    src="https://www.workingtalent.nl/_nuxt/img/wt-logo-white.8cc9feb.svg" title="Logo"
                                    alt="Logo"> -->
                        </router-link>
                    </div>

                    <!-- Nav Links -->
                    <div id="middle">
                        <!-- <SearchBar/> -->

                        <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 text-white">
                            <!-- <li><router-link to="/test" class="hover:text-gray-200 text-white">Test</router-link></li> -->
                        </ul>
                    </div>


                    
                    <div class="relative">
                        <div v-if="!store.getters.isAuthenticated">
                            <!-- <SpotifyLogin></SpotifyLogin> -->
                            <button
                                class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 px-4 my-2"
                                @click="onLogin">
                                Log In with Spotify
                            </button>
                            <button class="border border-gray-800 rounded-lg py-2 px-4 my-2" @click="authorize">
                                Authorize
                            </button>
                        </div>

                        <div v-if="store.getters.isAuthenticated">
                            <!-- Menu Button -->
                            <button @click="toggleDropdown" class="text-white  px-2 transition transform"
                                :class="{ 'rotate-90': showDropdown }">
                                <span class="material-symbols-outlined">menu</span>
                            </button>

                            <!-- Dropdown Menu -->
                            <div v-if="showDropdown" ref="dropdown"
                                class="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-50 ">

                                <!-- <div v-if="showDropdown" ref="dropdown" class="absolute top-0 right-14  bg-white rounded-lg shadow-lg z-50"> -->
                                <ul class="py-2 px-2">
                                    <li>
                                        <router-link @click="closeDropdown" :to="{ name: 'UserDetail', params: { id: store.state.userSpotifyId } }">
                                            <div class="py-2 px-5 text-left text-gray-800 hover:bg-gray-200 rounded-lg font-normal flex flex-row">
                                                <span class="material-symbols-outlined">
                                                    account_circle
                                                </span>
                                                <span class="px-3">
                                                    Profile
                                                </span>
                                            </div>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="/friends">
                                            <div class="py-2 px-5 text-left text-gray-800 hover:bg-gray-200 rounded-lg font-normal flex flex-row">
                                                <span class="material-symbols-outlined">
                                                    group
                                                </span>
                                                <span class="px-3">
                                                    Friends
                                                </span>
                                            </div>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link @click="closeDropdown" to="/search">
                                            <div class="py-2 px-5 text-left text-gray-800 hover:bg-gray-200 rounded-lg font-normal flex flex-row">
                                                <span class="material-symbols-outlined">
                                                    search
                                                </span>
                                                <span class="px-3">
                                                    Search
                                                </span>
                                            </div>
                                        </router-link>
                                    </li>
                                    <li>
                                        <div class="py-2 px-5 text-left text-gray-800 hover:bg-gray-200 rounded-lg font-normal flex flex-row">
                                                <span class="material-symbols-outlined">
                                                    logout
                                                </span>
                                                <button class="px-3"
                                                    @click="logout()">
                                                    Logout
                                                </button>
                                            </div>
                                        
                                    </li>
                                    
                                    
                                </ul>
                            </div>
                        </div>
                    </div>





                    
                </div>
            </nav>

        </section>

    </div>
</template>

<script>
import authentication from '@/api/backend/authentication.js'
import register from '@/api/spotify/authentication.js'
import store from '@/store'
import SpotifyLogin from '@/components/SpotifyLogin.vue'
// import SearchBar from '@/components/reusables/SearchBar.vue'

export default {
    name: 'HelloWorld',
    components: { 
        // SearchBar, 
    },
    data() {
        return {
            store,
            SpotifyLogin,
            showDropdown: false
        }
    },
    methods: {
        logout() {
            authentication.logout();
        },
        toggleDropdown() {
            if (!this.showDropdown) {
                this.showDropdown = true;
                setTimeout(() => {
                    document.addEventListener('click', this.closeDropdown);
                }, 0);
            } else {
                this.showDropdown = false;
                document.removeEventListener('click', this.closeDropdown);
            }
        },
        closeDropdown() {
            setTimeout(() => {
                this.showDropdown = false;
                document.removeEventListener('click', this.closeDropdown);
            }, 0);
        },
        async onLogin() {
            register.loginSpotify() // .then(authentication.authorize())

        },
        async authorize() {
            await register.authorize();
            // console.log('logged in token: ' + token);
        }

    }
}

</script>

<style scoped>
/* Add any additional styles or customizations here */
button {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
}

.rotate-90 {
  transform: rotate(-90deg);
}
</style>