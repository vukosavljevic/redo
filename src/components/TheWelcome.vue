<template>
  <!-- HOME -->
  <div v-if="currentPage === 'home'">
    <!-- Loading overlay: full screen, no scroll, bar 0→100% until video ready -->
    <div
      v-if="showHeroLoader"
      class="hero-loader"
      :class="{ 'hero-loader-leaving': loaderLeaving }"
      aria-live="polite"
      aria-label="Loading"
      @transitionend="onLoaderTransitionEnd"
    >
      <div class="hero-loader-bar-wrap">
        <div class="hero-loader-bar" :style="{ width: displayProgress + '%' }"></div>
      </div>
      <p class="hero-loader-label">{{ Math.round(displayProgress) }}%</p>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-video">
        <video
          ref="heroVideoRef"
          src="/hero-video.mp4"
          autoplay
          muted
          loop
          playsinline
          title="redo. hero background video"
          :class="{ 'video-loaded': isHeroVideoLoaded }"
          @loadeddata="handleHeroVideoLoad"
          @progress="onHeroVideoProgress"
          @canplaythrough="onHeroVideoCanPlayThrough"
        />
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
    <div class="projects-section">
      <ProjectsGrid
        :projects="displayedProjects"
        @open="openProject"
      />
      <div v-if="hasMoreProjects" class="projects-show-more">
        <button
          type="button"
          class="btn-show-more"
          @click="showAllProjects = true"
          v-if="!showAllProjects"
        >
          Prikaži više
        </button>
        <button
          type="button"
          class="btn-show-more"
          @click="showAllProjects = false"
          v-else
        >
          Prikaži manje
        </button>
      </div>
    </div>

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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectsGrid from './projects/ProjectsGrid.vue'
import ProjectDetail from './projects/ProjectDetail.vue'
import enPrimeurImg from '@/assets/en-primeur.png'
import vargaImg from '@/assets/varga.png'
import futuraImg from '@/assets/futura.png'
import wineosImg from '@/assets/wineos.png'
import lamedusaImg from '@/assets/lamedusa.png'
import brokoImg from '@/assets/broko.png'
import dubiozaImg from '@/assets/Dubioza.png'
import kameleonImg from '@/assets/Kameleon.png'
import lirosImg from '@/assets/Liros.png'
import mixAutoImg from '@/assets/MixAuto.png'
import omegaImg from '@/assets/Omega.png'
import soba23Img from '@/assets/Soba23.png'
import theraImg from '@/assets/Thera.png'
import koncertImg from '@/assets/Koncert.png'
import enpr1 from '@/assets/EnPrimeur/enpr1.jpeg'
import enpr2 from '@/assets/EnPrimeur/enpr2.jpeg'
import enpr3 from '@/assets/EnPrimeur/enpr3.jpeg'
import enpr4 from '@/assets/EnPrimeur/enpr4.jpeg'
import pv87 from '@/assets/PostolarVarga/87.png'
import pv106 from '@/assets/PostolarVarga/106.png'
import pv109 from '@/assets/PostolarVarga/109.png'
import pv114 from '@/assets/PostolarVarga/114.png'
import fut1 from '@/assets/Futurra/IMG-20251020-WA0020(3).jpg'
import fut2 from '@/assets/Futurra/IMG-20251021-WA0045(1) (1).jpg'
import fut3 from '@/assets/Futurra/IMG-20251022-WA0024.jpg'
import fut4 from '@/assets/Futurra/IMG-20251022-WA0030.jpg'
import wo1 from '@/assets/WineOs/wineos1.jpeg'
import wo2 from '@/assets/WineOs/wineos2.jpeg'
import wo3 from '@/assets/WineOs/wineos3.jpeg'
import wo4 from '@/assets/WineOs/wineos4.jpeg'
import lm2 from '@/assets/LaMedussa/la_medussa_final2.png'
import lm3 from '@/assets/LaMedussa/la_medussa_final3.png'
import lm4 from '@/assets/LaMedussa/la_medussa_final4.png'
import lm6 from '@/assets/LaMedussa/la_medussa_final6.png'
import pb1 from '@/assets/PivnicaBroko/broko1.jpeg'
import pb2 from '@/assets/PivnicaBroko/broko4.jpeg'
import pb3 from '@/assets/PivnicaBroko/1.png'
import pb4 from '@/assets/PivnicaBroko/3.png'
import sb1 from '@/assets/Soba23/Meni Ponedjeljak (3).png'
import sb2 from '@/assets/Soba23/Meni Ponedjeljak (7).png'
import sb3 from '@/assets/Soba23/Meni Ponedjeljak (8).png'
import sb4 from '@/assets/Soba23/tradicija.png'
import th1 from '@/assets/Thera/thera1.jpeg'
import th2 from '@/assets/Thera/thera2.jpeg'
import th3 from '@/assets/Thera/thera3.jpeg'
import om1 from '@/assets/OmegaConceptBar/omega1.png'
import om2 from '@/assets/OmegaConceptBar/omega2.png'
import om3 from '@/assets/OmegaConceptBar/omega3.png'
import rr1 from '@/assets/RingRoom/rr1.png'
import rr2 from '@/assets/RingRoom/rr2.png'
import lr1 from '@/assets/Liros/1.png'
import lr2 from '@/assets/Liros/2.png'
import lr3 from '@/assets/Liros/6.png'
import lr4 from '@/assets/Liros/8.png'

const route = useRoute()
const router = useRouter()

// Hero video loading state
const isHeroVideoLoaded = ref(false)
const heroVideoRef = ref(null)
const showHeroLoader = ref(true)
const loadProgress = ref(0)
const displayProgress = ref(0)
const loaderShownAt = ref(Date.now())
const loaderLeaving = ref(false)
let displayProgressRaf = null
let maxLoaderTimeoutId = null

/** Max time to show loader (e.g. on slow mobile). After this, we show hero and let video play when ready. */
const MAX_LOADER_MS = 5000

function finishLoaderWithShortDelay() {
  loadProgress.value = 100
  if (!displayProgressRaf) displayProgressRaf = requestAnimationFrame(updateDisplayProgress)
  const elapsed = Date.now() - loaderShownAt.value
  const minDisplayMs = 2000
  const holdAt100Ms = 500
  const wait = Math.max(600, minDisplayMs - elapsed) + holdAt100Ms
  setTimeout(() => {
    loaderLeaving.value = true
  }, wait)
}

const handleHeroVideoLoad = () => {
  isHeroVideoLoaded.value = true
}

function updateDisplayProgress() {
  const target = loadProgress.value
  if (displayProgress.value < target) {
    const step = Math.min(2, (target - displayProgress.value) * 0.12)
    displayProgress.value = Math.min(target, displayProgress.value + step)
    displayProgressRaf = requestAnimationFrame(updateDisplayProgress)
  } else {
    displayProgress.value = target
  }
}

function onHeroVideoProgress(e) {
  const v = e.target
  if (!v || loadProgress.value >= 100) return
  if (v.duration > 0 && v.buffered.length > 0) {
    const p = Math.min(99, (v.buffered.end(0) / v.duration) * 100)
    if (p > loadProgress.value) {
      loadProgress.value = p
      if (!displayProgressRaf) displayProgressRaf = requestAnimationFrame(updateDisplayProgress)
    }
  }
}

function onHeroVideoCanPlayThrough() {
  if (maxLoaderTimeoutId) {
    clearTimeout(maxLoaderTimeoutId)
    maxLoaderTimeoutId = null
  }
  finishLoaderWithShortDelay()
}

function onLoaderTransitionEnd(e) {
  if (e.target.classList.contains('hero-loader') && loaderLeaving.value) {
    showHeroLoader.value = false
    loaderLeaving.value = false
  }
}

const projects = [
  {
    id: 'en-primeur',
    title: 'En Primeur 26',
    year: 2026,
    kicker: 'EVENT AFTERMOVIE',
    image: enPrimeurImg,
    images: [enpr1, enpr2, enpr3, enpr4],
    layout: 'default',
    client: 'Graševina Croatica',
    services: 'Event film, social media cutovi, foto',
    location: 'Hotel Esplanade, Zagreb, Hrvatska',
    tagline: 'Premium vinska priča ispričana kroz kratki aftermovie video',
    story:
      'Prenijeti atmosferu elegancije, druženja i strasti prema vinu na način koji će jednako snažno djelovati i online.',
    approach:
      'Koristili smo kombinaciju dinamičnih kadrova, detaljnih close-upova i pažljivo tempiranog montažnog ritma. Fokus je stavljen na emociju - reakcije ljudi i ambijent prostora - kako bi gledatelj imao dojam da je dio događaja.',
    tags: ['Event', 'Video produkcija'],
    promoVideoUrl: 'https://www.youtube.com/embed/mkUFXPsoJTM?si=MYjZ5WhpAOkLM8q2',
    promoVideoTitle: 'AFTERMOVIE',
    sections: [
      { title: 'Zadatak', content: 'Prenijeti atmosferu elegancije, druženja i strasti prema vinu na način koji će jednako snažno djelovati i online.' },
      { title: 'Naš pristup', content: 'Koristili smo kombinaciju dinamičnih kadrova, detaljnih close-upova i pažljivo tempiranog montažnog ritma. Fokus je stavljen na emociju - reakcije ljudi i ambijent prostora - kako bi gledatelj imao dojam da je dio događaja.' }
    ]
  },
  {
    id: 'postolar-varga',
    title: 'Postolar Varga',
    year: 2025,
    kicker: 'SOCIAL MEDIA CONTENT',
    image: vargaImg,
    images: [pv87, pv106, pv109, pv114],
    layout: 'default',
    client: 'Postolar Varga',
    services: 'Vođenje društvenih mreža, foto i video',
    location: 'Osijek, Hrvatska',
    tagline: 'Priča o zanatu, karakteru i vremenu koje ostavlja trag.',
    story:
      'Dugoročna suradnja kroz redovitu foto i video produkciju te razvoj vizualnog sadržaja za Postolar Varga.',
    approach:
      'Snimanje u prirodnom okruženju radionice, koristeći kontrast svjetla i sjene kako bismo naglasili autentičnost i toplinu prostora. Narativ gradimo kroz detalje - ruke u radu, alate, izraze lica - uz pažljivu zvučnu kulisu.',
    tags: ['Social media managment', 'Storytelling', 'Craft'],
    sections: [
      { title: 'O suradnji', content: 'Dugoročna suradnja kroz redovitu foto i video produkciju te razvoj vizualnog sadržaja za Postolar Varga.' },
      { title: 'Naš pristup', content: 'Snimanje u prirodnom okruženju radionice, koristeći kontrast svjetla i sjene kako bismo naglasili autentičnost i toplinu prostora. Narativ gradimo kroz detalje - ruke u radu, alate, izraze lica - uz pažljivu zvučnu kulisu.' }
    ]
  },
  {
    id: 'futurra',
    title: 'Promo video FUTURRA',
    year: 2025,
    kicker: 'FACULTY PROMO VIDEO',
    image: futuraImg,
    images: [fut1, fut2, fut3, fut4],
    layout: 'wide',
    client: 'Fakultet turizma i ruralnog razvoja u Požegi',
    services: 'Promo video, foto produkcija, digital kampanja',
    location: 'Požega, Hrvatska',
    tagline: 'Prikaz predavanja na fakultetu i studentskog života',
    story:
      'Izraditi promo video za promociju novog identiteta Fakulteta turizma i ruralnog razvoja u Požegi te realizirati prateću foto produkciju.',
    tags: ['Promo', 'Education', 'Future'],
    sections: [
      { title: 'Zadatak', content: 'Izraditi promo video za promociju novog identiteta Fakulteta turizma i ruralnog razvoja u Požegi te realizirat prateću foto produkciju.' }
    ]
  },
  {
    id: 'wineos',
    title: 'Wineos',
    year: 2026,
    kicker: 'PHOTO PRODUCTION',
    image: wineosImg,
    images: [wo1, wo2, wo3, wo4],
    layout: 'default',
    client: 'Wineos by Graševina Croatica',
    services: 'Foto, social sadržaj',
    location: 'Osijek, Hrvatska',
    tagline: 'Festival vina, ljudi i posebne atmosfere.',
    story:
      'Wineos je festival koji spaja vinoljupce i izlagače. Željeli smo uhvatiti energiju događaja i isporučiti sadržaj koji će zvati publiku da dođe i iduće godine.',
    approach:
      'Fokus na emociju publike. Kroz fotografiju pratimo „putovanje" posjetitelja kroz festival - od prvog gutljaja do zadnjeg kadra večeri.',
    tags: ['Event', 'Emotion'],
    sections: [
      { title: 'Vizija', content: 'Wineos je festival koji spaja vinoljupce i izlagače. Željeli smo uhvatiti energiju događaja i isporučiti sadržaj koji će zvati publiku da dođe i iduće godine.' },
      { title: 'Naš pristup', content: 'Fokus na emociju publike. Kroz fotografiju pratimo „putovanje" posjetitelja kroz festival - od prvog gutljaja do zadnjeg kadra večeri.' }
    ]
  },
  {
    id: 'la-medussa',
    title: 'La Medussa',
    year: 2025,
    kicker: 'SOCIAL MEDIA CONTENT',
    image: lamedusaImg,
    images: [lm2, lm3, lm4, lm6],
    layout: 'default',
    client: 'La Medussa',
    services: 'Brand video, foto, social',
    location: 'Osijek, Hrvatska',
    tagline: 'Kreiranje sadržaja za društvene mreže: foto produkcija i izrada dva Reels videa za spa centar.',
    story:
      'La Medussa je spa centar sa raznovrsnom ponudom opušteno, elegantno i s dozom luksuza.',
    approach:
      'Koristili smo tople tonove, spore pokrete kamere i naglasak na detaljima. Cilj je bio stvoriti osjećaj opuštanja koji gledatelj „osjeti" u prvih par sekundi videa.',
    tags: ['Spa center', 'Headspa'],
    sections: [
      { title: 'Vizija', content: 'La Medussa je spa centar sa raznovrsnom ponudom opušteno, elegantno i s dozom luksuza.' },
      { title: 'Naš pristup', content: 'Koristili smo tople tonove, spore pokrete kamere i naglasak na detaljima. Cilj je bio stvoriti osjećaj opuštanja koji gledatelj „osjeti" u prvih par sekundi videa.' }
    ]
  },
  {
    id: 'broko',
    title: 'Pivnica Broko',
    year: 2025,
    kicker: 'SOCIAL MEDIA MANAGEMENT',
    image: brokoImg,
    images: [pb1, pb2, pb3, pb4],
    layout: 'wide',
    client: 'Pivnica Broko',
    services: 'Sadržaj za društvene mreže',
    location: 'Osijek, Hrvatska',
    tagline: 'Mjesto za ekipu, priču i dobru hranu.',
    story:
      'Za Pivnicu Broko gradimo vizualnu priču oko atmosfere – društvo, smijeh, glazba i hrana/piće u fokusu. Nije riječ samo o lokalu, nego o mjestu na koje se ljudi vraćaju.',
    approach:
      'Kroz kadrove približavamo gledatelju osjećaj koji može imati u Broku.',
    tags: ['BBQ', 'Social media', 'PUB', 'Hospitality'],
    sections: [
      { title: 'Vizija', content: 'Za Pivnicu Broko gradimo vizualnu priču oko atmosfere – društvo, smijeh, glazba i hrana/piće u fokusu. Nije riječ samo o lokalu, nego o mjestu na koje se ljudi vraćaju.' },
      { title: 'Naš pristup', content: 'Kroz kadrove približavamo gledatelju osjećaj koji može imati u Broku.' }
    ]
  },
  {
    id: 'soba-23',
    title: 'Soba 23 street food',
    year: 2025,
    kicker: 'SOCIAL MEDIA MANAGEMENT',
    image: soba23Img,
    images: [sb1, sb2, sb3, sb4],
    layout: 'default',
    client: 'Soba 23 street food',
    services: 'Sadržaj za društvene mreže',
    location: 'Osijek, Hrvatska',
    tagline: 'Street food s karakterom.',
    story: 'Soba 23 donosi autentičan street food doživljaj. Kreiramo vizualnu priču koja ističe hranu i ekipu.',
    approach: 'Dinamični kadrovi i fokus na detaljima hrane i ambijenta. Također kreiranjem objava svakodnevnih dnevnih menija također potiče se interakcija sa publikom.',
    tags: ['Daily menu', 'Hospitality', 'Social'],
    sections: [
      { title: 'Vizija', content: 'Soba 23 donosi autentičan street food doživljaj. Kreiramo vizualnu priču koja ističe hranu i ekipu.' },
      { title: 'Naš pristup', content: 'Dinamični kadrovi i fokus na detaljima hrane i ambijenta. Također kreiranjem objava svakodnevnih dnevnih menija također potiče se interakcija sa publikom.' }
    ]
  },
  {
    id: 'thera',
    title: 'Thera fireplaces',
    year: 2024,
    kicker: 'BRANDING & SOCIAL MEDIA MANAGEMENT',
    image: theraImg,
    images: [th1, th2, th3, th1],
    layout: 'default',
    client: 'Thera Hrvatska',
    services: 'Branding, sadržaj za društvene mreže',
    location: 'Osijek, Hrvatska',
    tagline: 'Vatra i dizajn u jednom.',
    story: 'Thera fireplaces kombinira kvalitetnu proizvodnju prodaju kamina s modernim dizajnom. Vizualna priča naglašava materijal i toplinu.',
    approach: 'Elegantni kadrovi, naglasak na detaljima i ambijentu.',
    tags: ['Social', 'Branding'],
    sections: [
      { title: 'Vizija', content: 'Thera fireplaces kombinira kvalitetnu proizvodnju prodaju kamina s modernim dizajnom. Vizualna priča naglašava materijal i toplinu.' },
      { title: 'Naš pristup', content: 'Elegantni kadrovi, naglasak na detaljima i ambijentu.' }
    ]
  },
  {
    id: 'dubioza',
    title: 'Dubioza rent-a-bar',
    year: 2025,
    kicker: 'BRANDING, WEB, SOCIAL MEDIA',
    image: dubiozaImg,
    layout: 'default',
    client: 'Dubioza rent-a-bar',
    services: 'Web stranica za rezervacije, Branding, Foto',
    location: 'Osijek, Hrvatska',
    tagline: 'Rent-a-bar u srcu osječke Tvrđe',
    story: 'Dubioza Rent a Bar je prostor za najam namijenjen privatnim proslavama, rođendanima i manjim eventima. Cilj je bio stvoriti identitet koji je drugačiji, provokativan i odmah prepoznatljiv na tržištu — prostor koji komunicira karakter, stav i dozu ironije. Brend je zamišljen kao mjesto gdje se pravila svakodnevice ostavljaju vani, a zabava "izlazi na slobodu".',
    approach: 'Vizualni identitet temeljen je na tipografiji inspiriranoj zatvorskim oznakama i službenim tipografskim stilovima koji asociraju na zakon, red i autoritet. Ovaj koncept nije slučajan — referira se na osobnu priču vlasnika i daje brendu autentičnost te snažan karakter. Kontrast između "strogog" vizualnog identiteta i opuštene party atmosfere prostora stvara zanimljivu napetost i diferencijaciju na tržištu.',
    tags: ['Web development', 'Payment system integration', 'Branding']
  },
  {
    id: 'omega-concept-bar',
    title: 'Omega Concept Bar',
    year: 2025,
    kicker: 'SOCIAL MEDIA MANAGEMENT',
    image: omegaImg,
    images: [om1, om2, om3, om1],
    layout: 'default',
    client: 'Omega Concept Bar',
    services: 'Brand video, foto, social',
    location: 'Hrvatska',
    tagline: 'Concept & lounge bar, mjesto gdje atmosfera ima karakter.',
    story: 'Cilj je bio pozicionirati bar kao premium, ali pristupačno mjesto za večernja druženja, izlaske i koktel iskustva — s fokusom na atmosferu, detalje i estetiku prostora.',
    approach: 'Stilska kamera, topli tonovi i naglasak na detaljima.',
    tags: ['HoReCa', 'Lifestyle']
  },
  {
    id: 'boom-burgers',
    title: 'Boom burgers & bbq',
    year: 2025,
    kicker: 'SOCIAL MEDIA CONTENT',
    image: brokoImg,
    layout: 'default',
    client: 'Boom burgers & bbq',
    services: 'Promo video, foto, social',
    location: 'Hrvatska',
    tagline: 'Burgeri i roštilj koji rade boom.',
    story: 'Povodom rebrandinga, cilj je bio predstaviti novu vizualnu eru Boom Burgers & BBQ na drugačiji, kreativniji način. Umjesto klasičnog prikaza hrane, odlučili smo ispričati priču kroz koncept "breaking news" — kao da je rebranding vijest dana.',
    approach: 'Inspiraciju smo pronašli u estetici starih novina i editorial dizajnu. Korišten je newspaper stil s tipografijom koja podsjeća na tiskane naslove, kolumne i vizualnu strukturu naslovnice.',
    tags: ['Social', 'Promo']
  },
  {
    id: 'ring-room',
    title: 'Ring Room',
    year: 2025,
    kicker: 'BRANDING',
    image: futuraImg,
    images: [rr1, rr2, rr1, rr2],
    layout: 'default',
    client: 'Ring Room',
    services: 'Branding, social media posts',
    location: 'Hrvatska',
    tagline: 'Prostor s karakterom.',
    story: 'Ring Room je samoposložni multifunkcionalni prostor sa ringom te fitness spravama. Vizualna priča naglašava arhitekturu i mogućnosti korištenja.',
    tags: ['Branding', 'Prostor']
  },
  {
    id: 'liros',
    title: 'Liros rent-a-boat',
    year: 2025,
    kicker: 'SOCIAL MEDIA MANAGMENT',
    image: lirosImg,
    images: [lr1, lr2, lr3, lr4],
    layout: 'default',
    client: 'Liros',
    services: 'Vođenje društvenih mreža',
    location: 'Pula, Hrvatska',
    tagline: 'Brodovi i more na dohvat ruke.',
    story: 'Liros nudi najam brodova. Kreirali smo promo koji predstavlja flotu, more i slobodu putovanja.',
    approach: 'More i brodovi u fokusu.',
    tags: ['Promo', 'Lifestyle', 'Rent']
  },
  {
    id: 'kameleon-security',
    title: 'Kameleon Security',
    year: 2025,
    kicker: 'WEBSITE',
    image: kameleonImg,
    layout: 'default',
    client: 'Kameleon Security',
    services: 'Web',
    location: 'Osijek, Hrvatska',
    tagline: 'Sigurnost i pouzdanost u prvom planu.',
    story: 'Kameleon Security pruža usluge osiguranja. Vizualna priča naglašava profesionalnost i povjerenje.',
    tags: ['Corporate', 'Web']
  },
  {
    id: 'koncert-produkcija',
    title: 'Koncert produkcija',
    year: 2024,
    kicker: 'WEBSITE',
    image: koncertImg,
    layout: 'default',
    client: 'Koncert produkcija',
    services: 'Web',
    location: 'Osijek, Hrvatska',
    tagline: 'Event produkcija na jednom mjestu',
    story: 'Izrada web sjedišta za Koncert Produkciju, tvrtka specijalizirana za tehničko praćenje evenata, koncerta i dr. Najam razglasa, rasvijete, konstrukcija itd.',
    approach: 'Tamno, žive boje, dinamičan izgled',
    tags: ['Event', 'Produkcija']
  },
  {
    id: 'mix-auto',
    title: 'Mix auto',
    year: 2025,
    kicker: 'WEBSITE',
    image: mixAutoImg,
    layout: 'default',
    client: 'Mix auto',
    services: 'Web',
    location: 'Hrvatska',
    tagline: 'Automobili i usluge u fokusu.',
    story: 'Mix auto nudi usluge iz područja automobila (prodaja, otkup). Kreirali smo vizualnu prezentaciju brenda i ponude.',
    approach: 'Jednostavna web stranica prilagođena svim uređajima',
    tags: ['Car dealership', 'Web']
  },
  {
    id: 'vinum-academicum',
    title: 'Vinum Academicum',
    year: 2025,
    kicker: 'Photo production & social',
    image: enPrimeurImg,
    layout: 'default',
    client: 'Vinum Academicum',
    services: 'Foto, social, promo',
    location: 'Hrvatska',
    tagline: 'Akademska vina zlatne doline.',
    story: 'Vinum Academicum povezuje edukaciju i vino. Vinarija smještena na obroncima Papuka u Požeško-slavonskoj županiji, prostire se na 2 vinograda od ukupne površine 8 ha te proizvodi više sorti vina.',
    approach: 'Ozbiljnost i personaliziranost',
    tags: ['Winery', 'Photo', 'Social']
  }
]

const selectedProject = ref(null)

const INITIAL_PROJECTS_COUNT = 6
const showAllProjects = ref(false)
const displayedProjects = computed(() =>
  showAllProjects.value ? projects : projects.slice(0, INITIAL_PROJECTS_COUNT)
)
const hasMoreProjects = computed(() => projects.length > INITIAL_PROJECTS_COUNT)

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

// Lock scroll while hero loader is visible
watch(showHeroLoader, (visible) => {
  document.body.style.overflow = visible ? 'hidden' : ''
})

// When entering home, show loader and reset progress
watch(
  () => currentPage.value,
  (page) => {
    if (page === 'home') {
      showHeroLoader.value = true
      loadProgress.value = 0
      displayProgress.value = 0
      loaderLeaving.value = false
      loaderShownAt.value = Date.now()
      if (displayProgressRaf) cancelAnimationFrame(displayProgressRaf)
      displayProgressRaf = null
      // Cap loader time: on slow connections (e.g. mobile), show hero after MAX_LOADER_MS
      if (maxLoaderTimeoutId) clearTimeout(maxLoaderTimeoutId)
      maxLoaderTimeoutId = setTimeout(() => {
        maxLoaderTimeoutId = null
        if (showHeroLoader.value && !loaderLeaving.value) {
          finishLoaderWithShortDelay()
        }
      }, MAX_LOADER_MS)
    } else {
      if (maxLoaderTimeoutId) {
        clearTimeout(maxLoaderTimeoutId)
        maxLoaderTimeoutId = null
      }
    }
  }
)

onMounted(() => {
  findProjectByRoute()
  if (currentPage.value === 'home') {
    loaderShownAt.value = Date.now()
    displayProgress.value = 0
    document.body.style.overflow = showHeroLoader.value ? 'hidden' : ''
    if (maxLoaderTimeoutId) clearTimeout(maxLoaderTimeoutId)
    maxLoaderTimeoutId = setTimeout(() => {
      maxLoaderTimeoutId = null
      if (showHeroLoader.value && !loaderLeaving.value) {
        finishLoaderWithShortDelay()
      }
    }, MAX_LOADER_MS)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

watch(
  () => route.fullPath,
  () => {
    findProjectByRoute()
  }
)
</script>

<style scoped>
/* Full-screen loading overlay until hero video is ready */
.hero-loader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: #0a0a0a;
  padding: 2rem;
  opacity: 1;
  transition: opacity 0.5s ease-out;
}

.hero-loader.hero-loader-leaving {
  opacity: 0;
}

.hero-loader-bar-wrap {
  width: 100%;
  max-width: 280px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  overflow: hidden;
}

.hero-loader-bar {
  height: 100%;
  background: #ee0606;
  border-radius: 999px;
  transition: width 0.45s ease-out;
}

.hero-loader-label {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  margin: 0;
}

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

.hero-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.8s ease;
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
  letter-spacing: 3px;
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

.projects-section {
  position: relative;
  z-index: 2;
}

.projects-show-more {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  padding: 0 var(--page-horizontal-padding);
}

.btn-show-more {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.95rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-show-more:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.6);
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
  color: #ee0606;
  font-size: 4rem;
  font-weight: 800;
}

.title-text {
  font-family: 'Monument Extended', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: 3px;
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
  color: #ee0606;
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
  color: #ee0606;
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
    letter-spacing:3px;
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

/* Very small phones: prevent hero text overlap/overflow */
@media (max-width: 400px) {
  .hero {
    padding: 5rem 1rem 2rem;
  }

  .title {
    font-size: 1.5rem;
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }
}
</style>
