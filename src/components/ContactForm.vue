<template>
  <section class="contact">
    <div class="container">
      <h2 class="h2" id="contact">Reach Out</h2>
      <div class="contact-content">
        <div class="contact-textbox">
          <strong href="#" class="hire-alert">
            <span class="indicator"></span>
            Available
          </strong>
          <p class="contact-text">
            As a full-stack software engineer, I specialize in developing
            scalable web applications with a strong emphasis on Python and
            Django. I take pride in crafting software that not only meets but
            anticipates user needs, ensuring reliability and high performance
            across all platforms.
          </p>
        </div>
        <form @submit.prevent="sendEmail" class="contact-form">
          <div class="form-field">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" required="" />
          </div>
          <div class="form-field">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required=""
              inputmode="email"
            />
          </div>
          <div class="form-field">
            <label for="message">How can I help you?</label>
            <textarea name="message" id="message" required=""></textarea>
          </div>
          <button type="submit" class="btn btn-cta">Send</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactForm',
  methods: {
    sendEmail() {
      var name = document.getElementById('name').value;
      //   var email = document.getElementById('email').value;
      var message = document.getElementById('message').value;

      var subject = encodeURIComponent(name + ' Reaching Out');
      var emailBody = message;

      window.location.href =
        'mailto:' +
        'lockups-entity.0a' +
        '+jorammillenaar' +
        '@' +
        'icloud.com' +
        '?subject=' +
        subject +
        '&body=' +
        encodeURIComponent(emailBody);
    },
  },
};
</script>

<style scoped>
.contact {
  background-color: var(--bg-color-secondary);
  padding: var(--gutter-large);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--gutter-small);
}

.form-field input,
.form-field textarea {
  border: 1px solid var(--border-dark);
  padding: var(--gutter-nano);
}

.btn-cta {
  background-color: var(--important);
  color: var(--bg-color-primary);
  border: none;
  padding: var(--gutter-micro) var(--gutter-medium);
  cursor: pointer;
}

.btn-cta:hover {
  background-color: darken(var(--important), 10%);
}

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

.hire-alert {
  display: inline-flex;
  align-items: center;
  gap: var(--gutter-nano);
  font-size: initial;
  padding: var(--gutter-nano) var(--gutter-micro);
  border-radius: var(--gutter-small);
  position: relative;
  z-index: 1;
  margin-block-end: var(--gutter-small);
  color: var(--important);
}

.hire-alert::before,
.hire-alert::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.hire-alert::after {
  background-image: var(--gradient-border);
  z-index: -2;
}

.hire-alert::before {
  background-color: var(--bg-color-primary);
  inset: 1px;
  z-index: -1;
}

.indicator {
  display: inline-block;
  block-size: var(--gutter-nano);
  inline-size: var(--gutter-nano);
  border-radius: 50%;
  background-color: red;
  animation: blink 550ms alternate infinite var(--easing);
}

@keyframes blink {
  100% {
    opacity: 0;
  }
}

.contact-text {
  margin-block-end: var(--gutter-small);
}

.signatures {
  inline-size: 150px;
}

body .signatures {
  filter: invert(1);
}

.contact-form {
  background-color: var(--bg-color-secondary);
  border-top-right-radius: var(--gutter-nano);
  border-bottom-right-radius: var(--gutter-nano);
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

.contact-form button[type='submit'] {
  border: none;
}

</style>
