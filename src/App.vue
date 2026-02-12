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
    <!-- Main content area with textured background -->
    <div class="footer-main">
      <div class="footer-content">
        <!-- Logo Section -->
        <img src="../src/logo.png" alt="">
        <!-- Three Columns -->
        <div class="footer-columns">
          <!-- Pages Column -->
          <div class="footer-column">
            <div class="column-header">Pages</div>
            <ul class="column-links">
              <li><a href="/" @click.prevent="$router.push('/')">Home</a></li>
              <li><a href="/#projekti">Works</a></li>
              <li><a href="/#o-nama">About</a></li>
              <li><a href="/kontakt" @click.prevent="$router.push('/kontakt')">Contact</a></li>
            </ul>
          </div>

          <!-- Based Column -->
          <div class="footer-column">
            <div class="column-header">Based</div>
            <ul class="column-links">
              <li>31 000, Osijek</li>
              <li>Croatia</li>
              <li>Working worldwide</li>
            </ul>
          </div>

          <!-- Contact Us Column -->
          <div class="footer-column">
            <div class="column-header">Contact Us</div>
            <ul class="column-links">
              <li>Email: os.agency.redo@gmail.com</li>
              <li>Phone 1: +385 (0) 99 8459 320</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">© 2026 Agency Redo. All Rights Reserved.</p>
        <div class="social-icons">
          <a href="#" class="social-icon" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" class="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  position: relative;
  z-index: 2;
}

.footer-main {
  position: relative;
  width: 100%;
  background-image: url('@/assets/footer.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 4rem var(--page-horizontal-padding) 3rem;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  max-width: 1400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-logo {
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.logo-image {
  height: 80px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.logo-subtitle {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  width: 100%;
  max-width: 1000px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.column-header {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
  margin-bottom: 1rem;
}

.column-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.column-links li {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 3px;
  line-height: 1.6;
}

.column-links a {
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.column-links a:hover {
  opacity: 0.7;
}

.footer-bottom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1a1a1a;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: min(80%, 100% - 2rem);
  box-sizing: border-box;
  z-index: 3;
  border-radius: 12px 12px 0 0;
}

.footer-bottom-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 3px;
  margin: 0;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.social-icon {
  color: #ffffff;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.social-icon:hover {
  opacity: 0.7;
  transform: translateY(-2px);
}

.social-icon svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 1024px) {
  .footer-columns {
    gap: 3rem;
  }
  
  .logo-image {
    height: 60px;
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: 3rem var(--page-horizontal-padding) 2rem;
    min-height: auto;
  }
  
  .footer-content {
    gap: 2rem;
  }
  
  .logo-image {
    height: 50px;
  }
  
  .logo-subtitle {
    font-size: 0.875rem;
  }
  
  .footer-columns {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  /* Hide bottom bar on mobile */
  .footer-bottom {
    display: none;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}
</style>
