import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/deck/:id',
      name: 'deck',
      component: () => import('@/views/deck.vue'),
    },
  ],
})

export default router
