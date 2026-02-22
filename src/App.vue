<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- Header / navbar -->
  <HelloWorld />

  <!-- Page content from router -->
  <router-view />

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-content">
        <div class="footer-top">
          <div class="footer-contact-block">
            <p class="footer-heading">/CONTACT</p>
            <a href="mailto:os.agency.redo@gmail.com" class="footer-line">os.agency.redo@gmail.com</a>
            <a href="tel:+3850998459320" class="footer-line">+385 (0) 99 8459 320</a>
            <a href="tel:+3850923762612" class="footer-line">+385 (0) 92 376 2612</a>
          </div>
          <div class="social-icons">
            <a href="https://www.instagram.com/agencyredo/" class="social-icon-circle" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.behance.net/redoagency" class="social-icon-circle" aria-label="Behance">
              <i class="fa-brands fa-behance"></i>
            </a>
          </div>
        </div>
        <div class="footer-location-block">
          <p class="footer-heading">/LOCATION</p>
          <p class="footer-line">Osijek, Croatia</p>
        </div>
        <p class="copyright">© 2026 Agency Redo. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  position: relative;
  z-index: 2;
  font-family: 'Monument Extended', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.footer-main {
  position: relative;
  width: 100%;
  background-image: url('@/assets/footer.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 4rem var(--page-horizontal-padding) 3rem;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  max-width: 1000px;
  width: 100%;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-contact-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-heading {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 800;
  color: #ee0606;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0 0 0.25rem 0;
}

.footer-line {
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 3px;
  line-height: 1.5;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-line:hover {
  opacity: 0.85;
}

a.footer-line:hover {
  text-decoration: underline;
}

.footer-location-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #ee0606;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.social-icon-circle:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.social-icon-circle svg {
  width: 20px;
  height: 20px;
}

.copyright {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 3px;
  margin: 2rem 0 0 0;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-main {
    padding: 3rem var(--page-horizontal-padding) 2rem;
    min-height: auto;
  }

  .footer-top {
    flex-direction: column;
  }

  .social-icons {
    align-self: flex-start;
  }

  .copyright {
    margin-top: 1.5rem;
  }
}
</style>
