import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    component: () => import('../views/Index.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
