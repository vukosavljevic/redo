<template>
  <section class="project-detail">
    <button class="back-button" type="button" @click="$emit('back')">
      ← Back to projects
    </button>

    <div class="detail-header">
      <p class="kicker">CASE STUDY</p>
      <h1 class="title">
        {{ project.title }}
        <span class="year">{{ project.year }}</span>
      </h1>
      <p class="subtitle">
        {{ project.tagline }}
      </p>

      <div class="meta">
        <div class="meta-block">
          <span class="meta-label">Klijent</span>
          <span class="meta-value">{{ project.client }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Usluga</span>
          <span class="meta-value">{{ project.services }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Lokacija</span>
          <span class="meta-value">{{ project.location }}</span>
        </div>
      </div>
    </div>

    <div class="hero-media">
      <img :src="project.image" :alt="project.title" />
    </div>

    <div class="content-grid">
      <article class="content-block">
        <h2>Vizija</h2>
        <p>{{ project.story }}</p>
      </article>

      <article class="content-block">
        <h2>Naš pristup</h2>
        <p>{{ project.approach }}</p>
      </article>
    </div>

    <div class="tags" v-if="project.tags?.length">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="tag"
      >
        {{ tag }}
      </span>
    </div>
  </section>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['back'])
</script>

<style scoped>
.project-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 7rem var(--page-horizontal-padding) 6rem;
}

.back-button {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  padding: 0.6rem 1.6rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.detail-header {
  margin-bottom: 3rem;
}

.kicker {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.title {
  font-family: 'Monument Extended', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -2px;
  margin-bottom: 1.25rem;
}

.year {
  color: #ee0606;
  margin-left: 0.5rem;
}

.subtitle {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 560px;
  line-height: 1.6;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-top: 2.5rem;
}

.meta-block {
  min-width: 150px;
}

.meta-label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.4rem;
}

.meta-value {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.95rem;
  color: #ffffff;
}

.hero-media {
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 3.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.hero-media img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 3rem;
  margin-bottom: 3rem;
}

.content-block h2 {
  font-family: 'Monument Extended', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.content-block p {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 768px) {
  .project-detail {
    padding: 6.5rem var(--page-horizontal-padding) 4.5rem;
  }

  .title {
    font-size: 2.4rem;
    letter-spacing: -1.4px;
  }

  .subtitle {
    font-size: 1rem;
    line-height: 1.6;
  }

  .meta {
    flex-direction: column;
    gap: 1.25rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .content-block p {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .tags {
    margin-top: 2rem;
    gap: 0.5rem;
  }

  .tag {
    font-size: 0.7rem;
    padding: 0.3rem 0.8rem;
  }
}
</style>

