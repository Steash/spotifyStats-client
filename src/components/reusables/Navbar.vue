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
                <div class="px-4   flex w-full items-center justify-between text-white">
                    <div id="left">
                        <router-link to="/" class="text-3xl font-bold font-heading">
                            <h1 class="text-white">SpotifyStats</h1>
                            <!-- <img
                                    src="https://www.workingtalent.nl/_nuxt/img/wt-logo-white.8cc9feb.svg" title="Logo"
                                    alt="Logo"> -->
                        </router-link>
                    </div>

                    <!-- Nav Links -->
                    <div id="middle">
                    <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 text-white">
                        <li><router-link to="/test" class="hover:text-gray-200 text-white">Test</router-link></li>
                        </ul>
                    </div>

                    <div id="right" class="flex-nowrap">
                        <!-- <router-link to="/" class="mx-2 align-middle hover:text-gray-200 text-white">
                                Uitloggen
                            </router-link> -->
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
                            
                            <button class="mx-2 align-middle hover:text-gray-200 text-white font-semibold font-heading"
                                @click="logout()">
                                Logout
                            </button>

                            <span>|</span>
                            <!-- Sign In -->
                            <router-link :to="{ name: 'UserDetail', params: { id: store.state.userSpotifyId } }"
                                class=" hover:text-gray-200 mx-2 text-white">
                                <span class="material-symbols-outlined align-middle">account_circle</span>
                            </router-link>
                        </div>

                    </div>
                </div>
            </nav>

        </section>
    </div>
</template>

<script>
import authentication from '@/api/spotify/authentication.js'
import store from '@/store'
import SpotifyLogin from '@/components/SpotifyLogin.vue'

export default {
    name: 'HelloWorld',
    data() {
        return {
            store,
            SpotifyLogin
        }
    },
    methods: {
        logout() {
            authentication.logout();
        },
        async onLogin() {
            authentication.loginSpotify() // .then(authentication.authorize())

        },
        async authorize() {
            await authentication.authorize();
            // console.log('logged in token: ' + token);
        }
    }
}

</script>