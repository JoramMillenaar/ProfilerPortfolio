<template>
  <div class="home-page">
    <nav-bar :showAtTop="false" />
    <site-header></site-header>
    <main>
      <experience-section></experience-section>
      <hobby-project></hobby-project>
      <testimonials-section></testimonials-section>
      <contact-form></contact-form>
      <site-footer></site-footer>
    </main>
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import ExperienceSection from '@/components/experience/ExperienceSection.vue';
import TestimonialsSection from '../components/TestimonialsSection.vue';
import HobbyProject from '../components/HobbyProject.vue';
import ContactForm from '../components/ContactForm.vue';
import SiteFooter from '../components/SiteFooter.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    SiteHeader,
    ExperienceSection,
    TestimonialsSection,
    HobbyProject,
    ContactForm,
    SiteFooter,
    NavBar,
  },
};
</script>

<style>
section:not(:first-child) {
  padding-block-start: var(--gutter-huge);
}

section:first-child {
  padding-block-start: 7rem;
}

@media (max-width: 885px) {
  :root {
    --gutter-huge: 8rem;
    --gutter-x-large: 4rem;
  }
}

main {
  border-top: 1px solid var(--border);
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  background-color: var(--bg-color-primary);
  transform: translateY(calc(-1 * var(--radius)));
}

@media (max-width: 1185px) {
  :root {
    --radius: 45px;
  }
}
</style>
