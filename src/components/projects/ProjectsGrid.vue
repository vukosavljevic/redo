<template>
  <section id="projekti" class="projects">
    <div class="projects-wrapper">
      <div class="projects-header">
        <h2 class="projects-title">
          <span class="title-slash">/</span>
          <span class="title-text">OUR WORK</span>
        </h2>
        <p class="projects-description">
          Kreativni projekti koji prelaze granice i ostavljaju trajan utisak.
        </p>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          :class="{ 'project-card-wide': project.layout === 'wide' }"
          @click="$emit('open', project)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <div class="project-name">
                {{ project.title }}
                <span class="project-year">{{ project.year }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    default: () => []
  }
})

defineEmits(['open'])
</script>

<style scoped>
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
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-overlay {
  position: absolute;
  inset: auto 0 0 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    transparent 100%
  );
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  z-index: 2;
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
  margin-left: 0.35rem;
}

@media (max-width: 768px) {
  .projects {
    padding: 5rem var(--page-horizontal-padding);
  }

  .projects-title {
    font-size: 2.1rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }

  .title-slash,
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
}
</style>

