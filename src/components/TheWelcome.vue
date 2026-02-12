<template>
  <!-- HOME -->
  <div v-if="currentPage === 'home'">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-video">
        <iframe
          src="https://www.youtube.com/embed/owYJntMLh50?autoplay=1&mute=1&controls=0&loop=1&playlist=owYJntMLh50&modestbranding=1&rel=0&playsinline=1"
          title="redo. hero background video"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          playsinline
          @load="handleHeroVideoLoad"
          :class="{ 'video-loaded': isHeroVideoLoaded }"
        ></iframe>
      </div>

      <div class="hero-overlay"></div>

      <div class="hero-content">
        <h1 class="title">MULTIMEDIA AGENCY</h1>
        <p class="hero-subtitle">From Osijek, Croatia</p>
      </div>

      <a href="#projekti" class="scroll-indicator" @click.prevent="scrollToProjects">
        <div class="scroll-circle">
          <svg class="scroll-text" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text font-size="11.5" fill="white" letter-spacing="2.5">
              <textPath href="#circlePath">
                REDO MULTIMEDIA AGENCY • REDO MULTIMEDIA AGENCY •
              </textPath>
            </text>
          </svg>
          <div class="scroll-arrow">↓</div>
        </div>
      </a>
    </section>

    <!-- Projekti Section (izdvojeno u komponentu) -->
    <ProjectsGrid
      id="projekti"
      :projects="projects"
      @open="openProject"
    />

    <!-- O nama Section -->
    <section id="o-nama" class="section about">
      <div class="section-content">
        <p class="section-label">O NAMA</p>
        <h2 class="section-title">Tko smo mi?</h2>
        <p class="section-description">
          Multimedijska agencija sa strašću za kreativnost i inovacijama. Specijalizirani smo za marketing, web razvoj,
          mobilne aplikacije, video i foto produkciju.
        </p>
        <div class="about-stats">
          <div class="stat-item">
            <div class="stat-number">10+</div>
            <div class="stat-label">Uspješnih projekata</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5+</div>
            <div class="stat-label">Godina iskustva</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Zadovoljnih klijenata</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section na homeu (bez kontakt forme, samo poziv na akciju) -->
    <section class="section contact-home">
      <div class="contact-content">
        <h2 class="contact-title">
          <span>Imate ideju?</span>
          <span>Razgovajmo.</span>
        </h2>
        <p class="contact-description">
          Spremni smo pretvoriti vašu viziju u stvarnost. Javite nam se i započnimo suradnju.
        </p>

        <a href="/kontakt" @click.prevent="goToContact" class="contact-button">
          Pošalji upit →
        </a>
      </div>
    </section>
  </div>

  <!-- SINGLE PROJECT PAGE -->
  <section v-else-if="currentPage === 'project'" class="section">
    <ProjectDetail
      v-if="selectedProject"
      :project="selectedProject"
      @back="backToProjects"
    />
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectsGrid from './projects/ProjectsGrid.vue'
import ProjectDetail from './projects/ProjectDetail.vue'
import enPrimeurImg from '@/assets/en-primeur.png'
import vargaImg from '@/assets/varga.png'
import futuraImg from '@/assets/futura.png'
import wineosImg from '@/assets/wineos.png'
import lamedusaImg from '@/assets/lamedusa.png'
import brokoImg from '@/assets/broko.png'

const route = useRoute()
const router = useRouter()

// Hero video loading state
const isHeroVideoLoaded = ref(false)

const handleHeroVideoLoad = () => {
  isHeroVideoLoaded.value = true
}

const projects = [
  {
    id: 'en-primeur',
    title: 'En Primeur',
    year: 2026,
    image: enPrimeurImg,
    layout: 'default',
    client: 'En Primeur 2026',
    services: 'Event film, social media cutovi, foto',
    location: 'Osijek, Hrvatska',
    tagline: 'Premium vinska priča ispričana kroz snažan vizualni identitet.',
    story:
      'En Primeur je jedan od najznačajnijih vinskih događaja u regiji. Naš je zadatak bio prenijeti atmosferu elegancije, druženja i strasti prema vinu na način koji će jednako snažno djelovati i online.',
    approach:
      'Koristili smo kombinaciju dinamičnih kadrova, detaljnih close-upova i pažljivo tempiranog montažnog ritma. Fokus je stavljen na emociju – reakcije ljudi, teksturu vina, ambijent prostora – kako bi gledatelj imao dojam da je dio događaja.',
    tags: ['Event', 'Video produkcija', 'Social kampanja']
  },
  {
    id: 'postolar-varga',
    title: 'Postolar Varga',
    year: 2025,
    image: vargaImg,
    layout: 'default',
    client: 'Postolar Varga',
    services: 'Brand video, storytelling, foto',
    location: 'Osijek, Hrvatska',
    tagline: 'Priča o zanatu, karakteru i vremenu koje ostavlja trag.',
    story:
      'Za Postolara Vargu kreirali smo vizualnu priču koja kombinira tradiciju ručnog rada i suvremeni pristup brendiranju. Fokus je bio na teksturi materijala, detaljima procesa i osobnosti brenda.',
    approach:
      'Snimali smo u prirodnom okruženju radionice, koristeći kontrast svjetla i sjene kako bismo naglasili autentičnost i toplinu prostora. Narativ gradimo kroz detalje – ruke u radu, alate, izraze lica – uz pažljivu zvučnu kulisu.',
    tags: ['Brending', 'Storytelling', 'Craft']
  },
  {
    id: 'futurra',
    title: 'Promo video FUTURRA',
    year: 2025,
    image: futuraImg,
    layout: 'wide',
    client: 'FUTURRA',
    services: 'Promo video, motion, digital kampanja',
    location: 'Hrvatska',
    tagline: 'Futurističan pogled na brand u pokretu.',
    story:
      'FUTURRA je brand koji diše inovaciju. Cilj je bio isporučiti sadržaj koji izgleda moderno, brzo i digitalno – ali i dalje ostaje razumljiv široj publici.',
    approach:
      'Kombinirali smo snimljeni materijal s motion grafikom i tipografskim animacijama. Sve je podređeno ritmu glazbe, kako bi video imao snažan, almost „music video” karakter.',
    tags: ['Promo', 'Motion design', 'Digital']
  },
  {
    id: 'wineos',
    title: 'Wineos',
    year: 2026,
    image: wineosImg,
    layout: 'default',
    client: 'Wineos Festival',
    services: 'Aftermovie, foto, social sadržaj',
    location: 'Osijek, Hrvatska',
    tagline: 'Festival vina, ljudi i posebne atmosfere.',
    story:
      'Wineos je festival koji spaja vinoljupce, izlagače i kreativce. Željeli smo uhvatiti energiju događaja i isporučiti sadržaj koji će zvati publiku da dođe i iduće godine.',
    approach:
      'Dinamična kamera, handheld kadrovi i fokus na emociju publike. Kroz montažu pratimo „putovanje” posjetitelja kroz festival – od prvog gutljaja do zadnjeg kadra večeri.',
    tags: ['Event', 'Aftermovie']
  },
  {
    id: 'la-medussa',
    title: 'La Medussa',
    year: 2025,
    image: lamedusaImg,
    layout: 'default',
    client: 'La Medussa',
    services: 'Brand video, foto, social',
    location: 'Jadran, Hrvatska',
    tagline: 'Mediterranean vibe pretočen u vizualni identitet.',
    story:
      'La Medussa je brand koji živi na moru – opušteno, elegantno i s dozom luksuza. Kroz vizuale ističemo sunce, teksture kamena, more i detalje interijera.',
    approach:
      'Koristili smo tople tonove, spore pokrete kamere i naglasak na detaljima. Cilj je bio stvoriti osjećaj ljetne večeri uz more, koji gledatelj „osjeti” već nakon nekoliko sekundi.',
    tags: ['Hospitality', 'Lifestyle']
  },
  {
    id: 'broko',
    title: 'Pivnica Broko',
    year: 2025,
    image: brokoImg,
    layout: 'wide',
    client: 'Pivnica Broko',
    services: 'Promo video, foto, social',
    location: 'Osijek, Hrvatska',
    tagline: 'Mjesto za ekipu, priču i dobru pivu.',
    story:
      'Za Pivnicu Broko gradili smo vizualnu priču oko atmosfere – društvo, smijeh, glazba i piva u fokusu. Nije riječ samo o lokalu, nego o mjestu na koje se ljudi vraćaju.',
    approach:
      'Brži rezovi, energična glazba i fokus na izrazima lica te detaljima interijera. Kroz kadar približavamo gledatelju osjećaj večeri provedene u Broku.',
    tags: ['HoReCa', 'Promo']
  }
]

const selectedProject = ref(null)

// derived "current page" from route
const currentPage = computed(() => {
  if (route.name === 'project') return 'project'
  return 'home'
})

const goToContact = () => {
  router.push({ name: 'kontakt' })
}

const findProjectByRoute = () => {
  if (route.name !== 'project') {
    selectedProject.value = null
    return
  }
  const id = route.params.id
  selectedProject.value =
    projects.find((p) => String(p.id) === String(id)) ?? projects[0] ?? null
}

const openProject = (project) => {
  router.push({ name: 'project', params: { id: project.id } })
}

const backToProjects = () => {
  router.push({ name: 'home' })
}

const scrollToProjects = () => {
  const el = document.getElementById('projekti')
  if (!el) return
  const headerOffset = 100
  const elementPosition = el.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

onMounted(() => {
  findProjectByRoute()
})

watch(
  () => route.fullPath,
  () => {
    findProjectByRoute()
  }
)
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8rem var(--page-horizontal-padding) 3rem;
  overflow: hidden;
  background-color: #000;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 135vh;
  width: 240vh; /* a bit wider to ensure full horizontal cover */
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.hero-video iframe {
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.hero-video iframe.video-loaded {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.85));
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  max-width: 1000px;
  text-align: center;
  z-index: 2;
  margin: 0 auto;
  width: 100%;
}

.subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.title {
  font-family: 'Monument Extended', sans-serif;
  font-size: 5.5rem;
  font-weight: 800;
  line-height: 1.05;
  color: #ffffff;
  letter-spacing: -3px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  text-align: center;
  display: block;
  width: 100%;
}

.hero-subtitle {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.05em;
}

.description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin-bottom: 3.5rem;
  font-weight: 400;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: -0.2px;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  z-index: 2;
  animation: bounce 2s infinite;
}

.scroll-circle {
  width: 100px;
  height: 100px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.scroll-text {
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: absolute;
  width: 100%;
  text-align: center;
  animation: rotate 10s linear infinite;
}

.scroll-arrow {
  font-size: 20px;
  color: #ffffff;
  line-height: 1;
  position: absolute;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.btn {
  padding: 1rem 2.5rem;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: 500;
  display: inline-block;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #ffffff;
  color: #1a1a1a;
}

.btn-primary:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  opacity: 1;
}

.btn-secondary {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.05);
}

/* Section Styles */
.section {
  padding: 6rem var(--page-horizontal-padding);
  max-width: 1400px;
  margin: 0 auto;
}

.section-content {
  text-align: center;
}

.section-label {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 2.5rem;
  font-weight: 400;
}

.section-title {
  font-family: 'Monument Extended', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 2.5rem;
  color: #ffffff;
  letter-spacing: -2.5px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

.section-description {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin-bottom: 4rem;
  font-weight: 400;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: -0.1px;
}

/* Services Section */
.services {
  position: relative;
  z-index: 2;
}

.services .section-content {
  position: relative;
  z-index: 2;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  position: relative;
  z-index: 2;
}

.service-item {
  text-align: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.service-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
}

.service-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
  line-height: 1.6;
}

/* Projects Section */
.projects {
  padding: 6rem var(--page-horizontal-padding);
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.projects-wrapper {
  width: 100%;
  position: relative;
  z-index: 2;
}

.projects-header {
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
}

.projects-title {
  font-family: 'Monument Extended', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -2px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
}

.title-slash {
  color: #ff0000;
  font-size: 4rem;
  font-weight: 800;
}

.title-text {
  font-family: 'Monument Extended', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -2px;
}

.projects-description {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 600px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  grid-auto-flow: row;
  position: relative;
  z-index: 2;
}

.project-card {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-card-wide {
  grid-column: 1 / -1;
  aspect-ratio: 16 / 9;
}

.project-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.project-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
}

.project-card:hover .project-image::before {
  opacity: 0;
  transform: translateY(-100%);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.08);
}

.project-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  z-index: 2;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
}

.project-card:hover .project-overlay {
  transform: translateY(20px);
  opacity: 0.3;
}

.project-name {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
}

.project-year {
  color: #ff0000;
  font-weight: 600;
}

/* About Section */
.about {
  position: relative;
  z-index: 2;
}

.about .section-content {
  position: relative;
  z-index: 2;
}

.about-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.stat-item {
  text-align: center;
  position: relative;
  z-index: 2;
}

.stat-number {
  font-family: 'Monument Extended', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.contact-content {
  max-width: 800px;
  width: 100%;
  margin-top: 0;
  position: relative;
  z-index: 2;
}

/* Home CTA section styling */
.contact-home {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem var(--page-horizontal-padding);
  text-align: center;
  position: relative;
  z-index: 2;
}

/* Full contact page (grid 50/50) */
.contact-full {
  text-align: left;
}

.contact-grid {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.contact-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-visual {
  margin-top: 2rem;
  width: 100%;
  height: 260px;
  border-radius: 16px;
  background: radial-gradient(circle at 10% 20%, rgba(255, 0, 0, 0.35), transparent 55%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15), transparent 55%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.7);
}

.contact-right {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 2rem 2.25rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6);
}

.section-label {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  font-weight: 400;
}

.contact-title {
  font-family: 'Monument Extended', sans-serif;
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 2.5rem;
  color: #ffffff;
  letter-spacing: -3px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

.contact-description {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin-bottom: 3.5rem;
  font-weight: 400;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: -0.1px;
}

.contact-button {
  font-family: 'Monument Extended', sans-serif;
  background-color: #ffffff;
  color: #1a1a1a;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: 400;
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-button-full {
  width: 100%;
  margin-top: 1rem;
}

.contact-button:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  opacity: 1;
}

/* Form fields */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-row label {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.form-row input,
.form-row textarea,
.form-row select {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 0.95rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.form-row input::placeholder,
.form-row textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-row input:focus,
.form-row textarea:focus {
  border-color: #ffffff;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
}

.form-row textarea {
  resize: vertical;
  min-height: 140px;
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem var(--page-horizontal-padding) 2rem;
  }
  
  .hero-content {
    max-width: 100%;
  }
  
  .subtitle {
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }
  
  .title {
    font-size: 2.5rem;
    letter-spacing: -1.5px;
    margin-bottom: 2rem;
  }
  
  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }
  
  .btn {
    padding: 0.875rem 2rem;
    font-size: 0.95rem;
  }
  
  .buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .section {
    padding: 5rem var(--page-horizontal-padding);
  }
  
  .section-label {
    font-size: 0.7rem;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 2.75rem;
    letter-spacing: -1.5px;
    margin-bottom: 2rem;
  }
  
  .section-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-item {
    padding: 1.5rem;
  }
  
  .projects-title {
    font-size: 2.1rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
  
  .title-slash {
    font-size: 2.1rem;
  }
  
  .title-text {
    font-size: 2.1rem;
  }
  
  .projects-description {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-card-wide {
    grid-column: 1;
  }
  
  .project-name {
    font-size: 1.25rem;
  }
  
  .project-overlay {
    padding: 1.5rem;
  }
  
  .about-stats {
    flex-direction: column;
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .contact {
    padding: 5rem var(--page-horizontal-padding);
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-right {
    padding: 1.5rem 1.75rem;
  }

  .contact-button-full {
    margin-top: 0.5rem;
  }
  
  .contact-title {
    font-size: 3rem;
    letter-spacing: -1.5px;
    margin-bottom: 2rem;
  }
  
  .contact-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }

  .contact-title {
    font-size: 2.4rem;
    letter-spacing: -1.5px;
    margin-bottom: 2rem;
  }
}
</style>
