import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '@/views/Start'
import Notes from '@/views/Notes'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  },
  {
    path: '/notatki',
    name: 'Notes',
    component: Notes,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
