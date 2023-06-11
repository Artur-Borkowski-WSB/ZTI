import { createRouter, createWebHistory } from 'vue-router'

import StartView from '@/views/StartView.vue'
import NotesView from '@/views/NotesView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView,
    },
    {
      path: '/notatki',
      name: 'Notes',
      component: NotesView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
  ],
})

export default router
