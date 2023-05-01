<template>
    <!-- <div class="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-lime-300 to-green-500 p-6 sm:py-12">
        <div class="relative rounded-2xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10">
            <div class="mx-auto max-w-md">
            </div>
        </div>
    </div> -->

    <form action="" class="relative mx-auto w-max">
        <input type="search"
            class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-green-700 focus:pl-16 focus:pr-4" />

        <svg xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-green-700 peer-focus:stroke-green-700"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </form>


    <div>
        <input v-model="searchTerm" placeholder="Search...">
        <button @click="search(searchTerm)">Search</button>
    </div>
    <div class="my-4">
        <div v-if="users.length > 0" class="bg-gray-100 p-2 rounded-md">
            <!-- <p class="font-bold">Search results:</p> -->
            <!-- <ul>
            <li v-for="user in users" :key="user.spotifyId">{{ user.displayName }}</li>
            </ul> -->
            <div v-for="user in users" :key="user.spotifyId">
                <router-link :to="'/user/' + user.spotifyId">
                    <div class="hover:bg-gray-100 p-2 cursor-pointer">{{ user.displayName }}</div>
                </router-link>
            </div>
        </div>
        <div v-else>No results found.</div>
    </div>
</template>

<script>
import user from "@/api/backend/user"

export default {
    data() {
        return {
            users: [],
            currentPage: 0,
        }
    },
    mounted() {
    },
    methods: {
        async search(searchTerm) {
            console.log(`Searching`, searchTerm)
            const rsp = await user.searchUser(searchTerm)

            this.users = rsp.content;
            // this.currentPage = pageNumber
            this.totalPages = rsp.totalPages
        }
    }
}
</script>