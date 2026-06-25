<template>
  <section>
    <div class="container">
      <h2 id="contact">
        Reach Out
      </h2>
      <div class="contact-content">
        <div class="relative w-full h-full grid overflow-hidden items-end">
          <div class="absolute w-full h-full">
            <skill-orbital :orbits="orbitsData" />
          </div>
          <ImageContent
            :src="contact.picture"
            :alt="contact.pictureAlt"
            class-name="h-auto w-3/4 relative mx-auto my-0 bottom-0 pointer-events-none drop-shadow-bloom"
          />
        </div>
        <form
          class="py-gutter-large px-gutter-small bg-secondary flex flex-col"
          @submit.prevent="sendEmail"
        >
          <div>
            <label
              for="name"
              class="w-full text-text-small my-gutter-nano text-important"
            >Name</label>
            <input
              id="name"
              class="mb-gutter-small p-gutter-nano w-full text-text-small text-important outline-none border-b-border border-b bg-transparent focus:border-[#888]"
              type="text"
              name="name"
              required=""
            >
          </div>
          <div>
            <label
              for="message"
              class="w-full text-text-small my-gutter-nano text-important"
            >How can I help you?</label>
            <textarea
              id="message"
              class="pb-gutter-large mb-gutter-small p-gutter-nano w-full text-text-small text-important outline-none border-b-border border-b bg-transparent focus:border-[#888]"
              name="message"
              required=""
            />
          </div>
          <button
            type="submit"
            class="btn-primary mt-auto w-fit"
          >
            Send via Email
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import contactInfo from '@/data/contactInfo.json';
import SkillOrbital from './media/SkillOrbital.vue';
import ImageContent from './media/ImageContent.vue';

export default {
  name: 'ContactForm',
  components: { SkillOrbital, ImageContent },
  data() {
    return {
      contact: contactInfo,
      orbitsData: [
        {
          ringClass: 'ring-0',
          icons: [],
        },
        {
          ringClass: 'ring-1',
          icons: ['shell', 'wordpress', 'googlecloud'],
        },
        {
          ringClass: 'ring-2',
          icons: [
            'sql',
            'git',
            'css',
            '🥾',
            'javascript',
            'vuejs',
            '🤝',
            'kubernetes',
          ],
        },
        {
          ringClass: 'ring-3',
          icons: ['python', 'django', '🎸'],
        },
      ],
    };
  },
  methods: {
    sendEmail() {
      var name = document.getElementById('name').value;
      var message = document.getElementById('message').value;
      var subject = encodeURIComponent(name + ' Reaching Out');
      var emailBody = message;
      var emailEndpoint = atob(this.contact.b64EmailEndpoint);

      fetch(emailEndpoint)
        .then(response => response.json())
        .then(data => {
          const email = data.email ? data.email : this.contact.email;
          window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(emailBody)}`;
        })
        .catch(error => {
          console.error('Error fetching email:', error);
          window.location.href = `mailto:${this.contact.email}?subject=${subject}&body=${encodeURIComponent(emailBody)}`;
        });
    }
  },
};
</script>

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
