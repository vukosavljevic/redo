<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="header-container">
      <a href="/" class="logo" @click.prevent="goHome">
      <img src="@/assets/logo.png" height="50px" alt=""></a>

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
        :aria-label="isMenuOpen ? 'Zatvori navigaciju' : 'Otvori navigaciju'"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
      >
        <span :class="['burger-line', { open: isMenuOpen }]"></span>
      </button>
    </div>

    <!-- Mobile overlay (backdrop) -->
    <div
      class="nav-overlay"
      v-if="isMenuOpen"
      @click="closeMenu"
    ></div>

    <!-- Mobile menu – full-screen kao na slici -->
    <div class="nav-mobile" :class="{ open: isMenuOpen }">
      <div class="nav-mobile-header">
        <a href="/" class="logo" @click.prevent="goHome">
          <img src="@/assets/logo.png" alt="REDO" />
        </a>
        <button
          type="button"
          class="nav-mobile-close"
          aria-label="Zatvori izbornik"
          @click="closeMenu"
        >
          <span class="nav-mobile-close-x"></span>
        </button>
      </div>
      <nav class="nav-mobile-links">
        <a href="/" @click.prevent="goHome">Početna</a>
        <a href="#o-nama" @click.prevent="handleMobileNavigate('o-nama')">O nama</a>
        <a href="#projekti" @click.prevent="handleMobileNavigate('projekti')">Projekti</a>
        <a href="/kontakt" @click.prevent="handleMobileContact">Kontakt</a>
      </nav>
      <div class="nav-mobile-social">
        <a href="https://www.instagram.com/agencyredo/" class="nav-mobile-social-icon" aria-label="Instagram" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://www.behance.net/redoagency" class="nav-mobile-social-icon" aria-label="Behance" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M22 7h-9v2h3.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H13v2h6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-7.5V7H22zm-13 4.5c0-.8-.7-1.5-1.5-1.5H6v3h1.5c.8 0 1.5-.7 1.5-1.5v0zm1.5 4.5H6v3h4.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5zm-6-9H2v9h2.5c.8 0 1.5-.7 1.5-1.5v-6c0-.8-.7-1.5-1.5-1.5z"/>
          </svg>
        </a>
      </div>
    </div>
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
  font-weight: 800;
  height: 50px;
  color: #ffffff;
  letter-spacing: -0.5px;
}
.logo img{
  height: 100%;
  width: auto;
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

/* Mobile menu – cijeli ekran, tamni overlay ispod linkova */
.nav-mobile {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  height: 100%;
  z-index: 9999;
  background-color: rgba(5, 5, 5, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  flex-direction: column;
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.nav-mobile.open {
  display: flex;
  opacity: 1;
  visibility: visible;
}

.nav-mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem var(--page-horizontal-padding);
  flex-shrink: 0;
}

.nav-mobile-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  text-decoration: none;
  color: inherit;
}

.nav-mobile-logo img {
  height: 36px;
  width: auto;
  display: block;
}

.nav-mobile-logo-text {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.nav-mobile-close {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s ease;
}

.nav-mobile-close:hover {
  background: rgba(255, 255, 255, 0.12);
}

.nav-mobile-close-x {
  position: relative;
  width: 18px;
  height: 18px;
}

.nav-mobile-close-x::before,
.nav-mobile-close-x::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 2px;
  background: #ffffff;
  border-radius: 999px;
  transform: translate(-50%, -50%) rotate(45deg);
}

.nav-mobile-close-x::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.nav-mobile-links {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.5rem var(--page-horizontal-padding) 0;
  gap: 0.75rem;
}

.nav-mobile-links a {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: #ee0606;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: opacity 0.2s ease;
}

.nav-mobile-links a:hover {
  opacity: 0.85;
}

.nav-mobile-social {
  margin-top: auto;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem var(--page-horizontal-padding) 3rem;
}

.nav-mobile-social-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ee0606;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.nav-mobile-social-icon:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.nav-mobile-social-icon svg {
  width: 20px;
  height: 20px;
}

/* Tamni overlay ispod cijelog menija – cijeli ekran */
.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9998;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem var(--page-horizontal-padding);
  }
  
  .header-container {
    padding: 0.75rem 1.25rem;
    border-radius: 40px;
    justify-content: space-between;
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
}
</style>
