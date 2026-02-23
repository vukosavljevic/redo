<template>
  <section class="contact contact-full">
    <div class="contact-grid">
      <!-- Lijeva strana: tekst + slika -->
      <div class="contact-left">
        <p class="section-label">KONTAKT</p>
        <h1 class="contact-title">
          <span>Imate ideju?</span>
          <span>Razgovajmo.</span>
        </h1>
        <div class="contact-visual"></div>
      </div>

      <!-- Desna strana: forma -->
      <div class="contact-right">
        <p v-if="submitStatus === 'success'" class="form-status form-status-success">
          Hvala! Poruka je poslana. Javit ćemo vam se uskoro.
          <button type="button" class="form-status-link" @click="submitStatus = null">
            Pošalji novi upit
          </button>
        </p>
        <p v-else-if="submitStatus === 'error'" class="form-status form-status-error">
          Došlo je do greške. Pokušajte ponovno ili nam se javite na os.agency.redo@gmail.com.
        </p>
        <form
          v-show="submitStatus !== 'success'"
          class="contact-form"
          action="#"
          method="post"
          @submit.prevent="submitContact"
        >
          <div class="form-row">
            <label for="name">Ime i prezime</label>
            <input
              id="name"
              v-model="formName"
              type="text"
              placeholder="Vaše ime"
              required
              :disabled="isSending"
            />
          </div>

          <div class="form-row">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="formEmail"
              type="email"
              placeholder="vas@email.com"
              required
              :disabled="isSending"
            />
          </div>

          <div class="form-row">
            <label for="service">Usluga</label>
            <select
              id="service"
              v-model="formService"
              required
              :disabled="isSending"
            >
              <option disabled value="">Odaberite uslugu</option>
              <option value="Snimanje">Snimanje</option>
              <option value="Fotografiranje">Slikanje / fotografija</option>
              <option value="Web razvoj">Web</option>
              <option value="Mobilna aplikacija">Mobilna aplikacija</option>
              <option value="Vođenje društvenih mreža">Vođenje društvenih mreža</option>
              <option value="Ostalo">Nešto drugo</option>
            </select>
          </div>

          <div class="form-row">
            <label for="message">Poruka</label>
            <textarea
              id="message"
              v-model="formMessage"
              rows="6"
              placeholder="Napišite nam što trebate..."
              required
              :disabled="isSending"
            ></textarea>
          </div>

          <button
            type="submit"
            class="contact-button contact-button-full"
            :disabled="isSending"
          >
            {{ isSending ? 'Šaljem...' : 'Pošalji upit →' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const formName = ref('')
const formEmail = ref('')
const formService = ref('')
const formMessage = ref('')
const isSending = ref(false)
const submitStatus = ref(null) // null | 'success' | 'error'

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

const resetForm = () => {
  formName.value = ''
  formEmail.value = ''
  formService.value = ''
  formMessage.value = ''
}

const submitContact = async (e) => {
  e.preventDefault()
  if (!publicKey || !serviceId || !templateId) {
    submitStatus.value = 'error'
    return
  }

  isSending.value = true
  submitStatus.value = null

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: formName.value,
        title: formService.value,
        message: formMessage.value,
        from_email: formEmail.value,
      },
      publicKey
    )
    submitStatus.value = 'success'
    resetForm()
  } catch (err) {
    console.error('EmailJS error:', err)
    submitStatus.value = 'error'
  } finally {
    isSending.value = false
  }
}
</script>

<style scoped>
.contact {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6.5rem var(--page-horizontal-padding);
  position: relative;
  z-index: 2;
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
  letter-spacing: -0.1px;
  margin-left: auto;
  margin-right: auto;
}

.contact-full {
  text-align: left;
}

.contact-grid {
  margin-top: 2rem;
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
  align-items: center;
  text-align: center;
}

.contact-visual {
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

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form-status {
  font-family: 'Monument Extended', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  padding: 1rem 0;
  margin: 0;
}

.form-status-success {
  color: #86efac;
}

.form-status-error {
  color: #fca5a5;
}

.form-status-link {
  display: block;
  margin-top: 0.75rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  letter-spacing: 1px;
}

.form-status-link:hover {
  opacity: 0.9;
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
  .contact {
    padding: 6rem var(--page-horizontal-padding) 5rem;
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
    font-size: 2.2rem;
    letter-spacing: -1.3px;
    margin-bottom: 1.75rem;
  }

  .contact-description {
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }
}
</style>

