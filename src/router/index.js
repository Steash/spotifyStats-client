import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArtistDetailView from '../views/ArtistDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/artists/:id',
    name: 'ArtistDetail',
    component: ArtistDetailView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
