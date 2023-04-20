import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArtistDetailView from '../views/detail-pages/ArtistDetailView.vue'
import UserDetailView from '../views/detail-pages/UserDetailView.vue'

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
    path: '/artist/:id',
    name: 'ArtistDetail',
    component: ArtistDetailView
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: UserDetailView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
