<template>
    <!-- <div class="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-lime-300 to-green-500 p-6 sm:py-12">
        <div class="relative rounded-2xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10">
            <div class="mx-auto max-w-md">
            </div>
        </div>
    </div> -->
    <div class="max-w-lg mx-auto">
        <!-- Search Bar -->
        <form class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>

            <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>

                <input v-model="searchTerm" type="text" id="simple-search" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                placeholder="Search" required>

                <!-- Add a clear button to clear the search input -->
                <button type="button" class="absolute inset-y-0 right-0 px-3 py-2.5 text-gray-500 hover:text-gray-700" 
                    v-if="searching" @click="clearSearch" aria-label="Clear search input">
                    X
                </button>
                    
            </div>

            <button @click="search(searchTerm)" type="submit"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "><svg
                    class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </form>

        <!-- items -->
        <div v-if="searching" class="bg-white w-full rounded-xl shadow-xl overflow-hidden p-1 ">
            <div v-if="users.length> 0" class="flex flex-col items-start">

                <div v-for="user in users" :key="user.spotifyId" class="w-full">
                    <router-link :to="'/user/' + user.spotifyId" class="flex flex-row w-full p-3 pl-4 hover:bg-gray-300 rounded-lg cursor-pointer" >
                        <div class="mr-4">
                            <div class="h-9 w-9 rounded-sm flex items-center justify-center text-3xl">
                                <img class="w-full h-auto my-auto" :src="user.avatar" alt="cover art">
                            </div>
                        </div>
                    
                        <div>
                            <div class="font-bold text-lg">{{ user.displayName }}</div>
                            <!-- <div class="text-xs text-gray-500">
                                <span class="mr-2">No: 007886</span>
                                <span class="mr-2">gender: man</span>
                                <span class="mr-2">hobby: skiing</span>
                            </div> -->
                        </div>
                    </router-link>

                </div>
            </div>
            <div v-else class="w-full flex p-3 pl-4 items-center rounded-lg ">No results found.</div>
        </div>

        
    </div>







    <!-- <form action="" class="relative mx-auto w-max">
        <input type="search" v-model="searchTerm" class="peer cursor-pointer relative z-10 h-12 w-12 
                    rounded-full border bg-transparent pl-12 outline-none 
                    focus:w-full focus:cursor-text focus:border-gray-700 focus:pl-16 focus:pr-4" />

        <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-y-0 my-auto h-8 w-12 
                        border-r border-transparent stroke-gray-500 px-3.5 
                        peer-focus:border-gray-700 peer-focus:stroke-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            @click="search(searchTerm)"
        </svg>
    </form>

    <form action="" class="relative mx-auto w-max">
        <input type="search" v-model="searchTerm"
            class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-green-700 focus:pl-16 focus:pr-4" />

        <svg xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-green-700 peer-focus:stroke-green-700"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            @click="search(searchTerm)"
        </svg>
    </form> -->


    <!-- <div>
        <input v-model="searchTerm" placeholder="Search...">
        <button @click="search(searchTerm)">Search</button>
    </div> -->

    <!-- <form action="" class="relative mx-auto w-max">
        <input type="search" v-model="searchTerm"
            class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-green-700 focus:pl-16 focus:pr-4" />

        <button @click="search(searchTerm)"
            class="absolute inset-y-0 right-0 my-auto h-8 w-12 border-l border-transparent stroke-gray-500 px-3.5 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd"
                    d="M15.707 14.293a1 1 0 0 1-1.414 1.414l-3.142-3.142a5 5 0 1 1 .708-.708l3.142 3.142zM6 10a4 4 0 1 1 8 0a4 4 0 0 1-8 0z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </form>

    <div class="my-4">
        <div v-if="users.length > 0" class="bg-gray-100 p-2 rounded-md">
            <div v-for="user in users" :key="user.spotifyId">
                <router-link :to="'/user/' + user.spotifyId">
                    <div class="hover:bg-gray-100 p-2 cursor-pointer">
                        <img class="w-full h-auto my-auto" :src="user.avatar" alt="cover art">
                        {{ user.displayName }}</div>
                    
                </router-link>
            </div>
        </div>
        <div v-else>No results found.</div>
    </div> -->

   
</template>

<script>
import user from "@/api/backend/user"

export default {
    data() {
        return {
            users: [],
            currentPage: 0,
            searching: false,
        }
    },
    mounted() {
    },
    methods: {
        async search(searchTerm) {
            console.log(`Searching`, searchTerm)
            this.searching = true;
            const rsp = await user.searchUser(searchTerm)

            this.users = rsp.content;
            // this.currentPage = pageNumber
            this.totalPages = rsp.totalPages
        },
        clearSearch() {
            this.searching = false;
            this.searchTerm = ''
        }
    }
}
</script>