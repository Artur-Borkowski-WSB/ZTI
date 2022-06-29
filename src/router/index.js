import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '@/views/Start'
import Notes from '@/views/Notes'

Vue.use(VueRouter)

const routes = [
  {
    // path: '/',
    path: '/todo',
    name: 'Start',
    component: Start,
  },
  {
    // path: '/notatki',
    path: '/',
    name: 'Notes',
    component: Notes,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
