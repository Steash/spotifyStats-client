import { createRouter, createWebHashHistory } from 'vue-router'
import TestView from '../views/TestView.vue'
import AboutView from '../views/AboutView.vue'
import ArtistDetailView from '../views/detail-pages/ArtistDetailView.vue'
import UserDetailView from '../views/detail-pages/UserDetailView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ButtonTestView from '../views/ButtonTestView.vue'

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
  },
  {
    path: '/test',
    name: 'TestView',
    component: TestView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/button',
    name: 'ButtonTestView',
    component: ButtonTestView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
