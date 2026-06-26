<script setup>
import { reactive, ref } from 'vue';
import {
  BaseButton,
  BaseImage,
  BaseInput,
  BaseTextarea,
  BaseSpinner,
  FormField,
} from '@/components/base';
import SkillOrbital from '@/components/media/SkillOrbital.vue';
import contactInfo from '@/data/contactInfo.json';

const contact = contactInfo;

const orbitsData = [
  { ringClass: 'ring-0', icons: [] },
  { ringClass: 'ring-1', icons: ['shell', 'wordpress', 'googlecloud'] },
  {
    ringClass: 'ring-2',
    icons: ['sql', 'git', 'css', '🥾', 'javascript', 'vuejs', '🤝', 'kubernetes'],
  },
  { ringClass: 'ring-3', icons: ['python', 'django', '🎸'] },
];

const form = reactive({ name: '', message: '' });
const sending = ref(false);
const error = ref('');

async function resolveEmail() {
  try {
    const endpoint = atob(contact.b64EmailEndpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.email || contact.email;
  } catch {
    return contact.email;
  }
}

async function sendEmail() {
  error.value = '';
  sending.value = true;
  try {
    const email = await resolveEmail();
    const subject = encodeURIComponent(`${form.name} Reaching Out`);
    const body = encodeURIComponent(form.message);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  } catch {
    error.value = 'Something went wrong opening your email client. Please try again.';
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <section>
    <div class="container">
      <h2 id="contact">
        Reach Out
      </h2>
      <div class="contact-content">
        <div class="relative w-full h-full grid overflow-hidden items-end">
          <div class="absolute w-full h-full">
            <SkillOrbital :orbits="orbitsData" />
          </div>
          <BaseImage
            :src="contact.picture"
            :alt="contact.pictureAlt"
            img-class="h-auto w-3/4 relative mx-auto my-0 bottom-0 pointer-events-none drop-shadow-bloom"
          />
        </div>
        <form
          class="py-gutter-large px-gutter-small bg-secondary flex flex-col"
          @submit.prevent="sendEmail"
        >
          <FormField
            v-slot="{ id }"
            label="Name"
          >
            <BaseInput
              :id="id"
              v-model="form.name"
              name="name"
              type="text"
              required
            />
          </FormField>
          <FormField
            v-slot="{ id }"
            label="How can I help you?"
          >
            <BaseTextarea
              :id="id"
              v-model="form.message"
              name="message"
              required
            />
          </FormField>
          <p
            v-if="error"
            class="text-[#ff6b6b] text-text-small mb-gutter-small"
            role="alert"
          >
            {{ error }}
          </p>
          <BaseButton
            type="submit"
            variant="primary"
            class="mt-auto w-fit"
            :disabled="sending"
          >
            <BaseSpinner v-if="sending" />
            <span v-else>Send via Email</span>
          </BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: minmax(245px, 35%) 1fr;
  margin-block: var(--gutter-x-large);
  border: 1px solid var(--border);
  border-radius: var(--gutter-nano);
}

@media (max-width: 1032px) {
  .contact-content {
    display: flex;
    flex-direction: column-reverse;
    max-inline-size: 845px;
    margin-inline: auto;
  }
}
</style>
