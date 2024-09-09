<template>
  <section class="contact">
    <div class="container">
      <h2 class="h2" id="contact">Reach Out</h2>
      <div class="contact-content">
        <div class="contact-textbox">
          <alert-badge :contents="contact.availability" />
          <p class="contact-text">
            {{ contact.description }}
          </p>
        </div>
        <form @submit.prevent="sendEmail" class="contact-form">
          <div class="form-field">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" required="" />
          </div>
          <div class="form-field">
            <label for="message">How can I help you?</label>
            <textarea name="message" id="message" required=""></textarea>
          </div>
          <button-primary class="btn" contents="Send" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import contactInfo from '@/data/contactInfo.json';
import AlertBadge from './common/AlertBadge.vue';
import ButtonPrimary from './common/ButtonPrimary.vue';

export default {
  components: { AlertBadge, ButtonPrimary },
  name: 'ContactForm',
  data() {
    return {
      contact: contactInfo,
    };
  },
  methods: {
    sendEmail() {
      var name = document.getElementById('name').value;
      var message = document.getElementById('message').value;
      var subject = encodeURIComponent(name + ' Reaching Out');
      var emailBody = message;

      window.location.href = `mailto:${
        this.contact.email
      }?subject=${subject}&body=${encodeURIComponent(emailBody)}`;
    },
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

.contact-textbox,
.contact-form {
  padding: var(--gutter-large) var(--gutter-small);
}

.contact-text {
  margin-block-end: var(--gutter-small);
}

.contact-form {
  background-color: var(--bg-color-secondary);
  border-top-right-radius: var(--gutter-nano);
  border-bottom-right-radius: var(--gutter-nano);
  display: flex;
  flex-direction: column;
}

.form-field label,
.form-field input,
.form-field textarea {
  display: block;
  width: 100%;
}

.form-field label {
  color: var(--important);
}

.form-field input,
.form-field textarea {
  font-size: var(--text-small);
  color: var(--sub);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--border);
  background-color: transparent;
}

.form-field input:focus,
.form-field textarea:focus {
  border-color: #888;
}

.form-field input,
.form-field textarea {
  margin-block-end: var(--gutter-small);
  padding: var(--gutter-nano);
  margin-inline: var(--gutter-nano);
}

.form-field label {
  font-size: var(--text-small);
  margin-block-end: var(--gutter-nano);
  margin-inline-start: var(--gutter-nano);
}

.btn {
  margin-top: auto;
  width: 200px;
}
</style>
