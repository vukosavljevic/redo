<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="header-container">
      <a href="/" class="logo" @click.prevent="goHome">redo.</a>

      <!-- Desktop navigation -->
      <nav class="nav nav-desktop">
        <a href="#projekti" @click.prevent="scrollTo('projekti')">Projekti</a>
        <a href="#o-nama" @click.prevent="scrollTo('o-nama')">O nama</a>
        <a href="/kontakt" @click.prevent="goContact">Kontakt</a>
      </nav>

      <!-- Desktop CTA aligned right -->
      <a href="/kontakt" @click.prevent="goContact" class="cta-button cta-desktop">
        Započni projekt
      </a>

      <!-- Mobile hamburger -->
      <button
        class="nav-toggle"
        type="button"
        @click="toggleMenu"
        aria-label="Otvori navigaciju"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
      >
        <span :class="['burger-line', { open: isMenuOpen }]"></span>
      </button>
    </div>

    <!-- Mobile overlay -->
    <div
      class="nav-overlay"
      v-if="isMenuOpen"
      @click="closeMenu"
    ></div>

    <!-- Mobile menu -->
    <nav class="nav-mobile" :class="{ open: isMenuOpen }">
      <a href="#projekti" @click.prevent="handleMobileNavigate('projekti')">Projekti</a>
      <a href="#o-nama" @click.prevent="handleMobileNavigate('o-nama')">O nama</a>
      <a href="/kontakt" @click.prevent="handleMobileContact">Kontakt</a>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const goHome = () => {
  closeMenu()
  router.push('/')
}

const goContact = () => {
  closeMenu()
  router.push('/kontakt')
}

const scrollTo = (section) => {
  const performScroll = () => {
    const element = document.getElementById(section)
    if (!element) return

    const headerOffset = 100
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  // Ako smo već na home stranici, samo skrolaj bez vraćanja na sam vrh
  if (route.name === 'home' || route.path === '/') {
    performScroll()
    return
  }

  // Ako smo na nekoj drugoj ruti (npr. /kontakt), prvo odi na home pa skrolaj
  router.push({ name: 'home' }).then(() => {
    setTimeout(performScroll, 100)
  })
}

const handleMobileNavigate = (section) => {
  closeMenu()
  scrollTo(section)
}

const handleMobileContact = () => {
  closeMenu()
  goContact()
}

const handleScroll = () => {
  const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
  isScrolled.value = scrollY > 50
}

onMounted(() => {
  // Use both window and document scroll events for better compatibility
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem var(--page-horizontal-padding);
  z-index: 9999 !important;
  transition: all 0.3s ease;
  will-change: transform;
}

.header.scrolled {
  padding: 1rem var(--page-horizontal-padding);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: rgba(30, 30, 30, 0.6);
  border-radius: 50px;
  padding: 1rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 9999;
}

.header.scrolled .header-container {
  padding: 0.875rem 2rem;
  background-color: rgba(30, 30, 30, 0.7);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.logo {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-desktop {
  flex: 1;
  justify-content: center;
}

.nav a:not(.cta-button) {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 400;
  white-space: nowrap;
}

.cta-button {
  font-family: 'Monument Extended', sans-serif;
  background-color: #ffffff;
  color: #1a1a1a;
  padding: 0.75rem 1.75rem;
  border-radius: 30px;
  font-weight: 400;
  font-size: 0.95rem;
  white-space: nowrap;
}

.cta-button:hover {
  opacity: 1;
  background-color: #f5f5f5;
  transform: translateY(-1px);
}

.cta-desktop {
  margin-left: 1.5rem;
}

/* Mobile toggle button */
.nav-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  align-items: center;
  justify-content: center;
  padding: 0;
}

.burger-line {
  position: relative;
  width: 18px;
  height: 2px;
  background: #ffffff;
  border-radius: 999px;
  transition: background 0.2s ease;
}

.burger-line::before,
.burger-line::after {
  content: '';
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  background: #ffffff;
  border-radius: 999px;
  transition: transform 0.2s ease, top 0.2s ease, bottom 0.2s ease;
}

.burger-line::before {
  top: -6px;
}

.burger-line::after {
  bottom: -6px;
}

.burger-line.open {
  background: transparent;
}

.burger-line.open::before {
  top: 0;
  transform: rotate(45deg);
}

.burger-line.open::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Mobile nav container */
.nav-mobile {
  display: none;
}

.nav-mobile.open {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem var(--page-horizontal-padding) 1.25rem;
}

.nav-mobile a {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 400;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  display: block;
  text-align: center;
  transition: all 0.2s ease;
}

.nav-mobile a:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Mobile full-screen overlay when menu is open */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  z-index: 9998;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem var(--page-horizontal-padding);
  }
  
  .header-container {
    padding: 0.75rem 1.25rem;
    border-radius: 40px;
  }
  
  .logo {
    font-size: 1.25rem;
  }

  /* Hide desktop nav and CTA button, show burger */
  .nav-desktop {
    display: none;
  }

  .cta-desktop {
    display: none;
  }

  .nav-toggle {
    display: flex;
  }

  /* Mobile menu positioning */
  .nav-mobile {
    position: fixed;
    top: 80px;
    left: var(--page-horizontal-padding);
    right: var(--page-horizontal-padding);
    background-color: rgba(30, 30, 30, 0.95);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 9999;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  }

  .nav-mobile.open {
    display: flex;
  }
}
</style>
