import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import TheWelcome from './components/TheWelcome.vue'
import ContactPage from './components/contact/ContactPage.vue'

// Cursor spotlight effect
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100
  const y = (e.clientY / window.innerHeight) * 100
  document.documentElement.style.setProperty('--mouse-x', `${x}%`)
  document.documentElement.style.setProperty('--mouse-y', `${y}%`)
})

// Simple router setup
const routes = [
  {
    path: '/',
    name: 'home',
    component: TheWelcome
  },
  {
    path: '/kontakt',
    name: 'kontakt',
    component: ContactPage
  },
  {
    path: '/project/:id',
    name: 'project',
    component: TheWelcome
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // uvijek na vrh kod promjene stranice
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
