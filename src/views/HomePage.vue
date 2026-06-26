<script setup>
import NavBar from '@/components/NavBar.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import ExperienceSection from '@/components/experience/ExperienceSection.vue';
import TestimonialsSection from '@/components/TestimonialsSection.vue';
import HobbyProject from '@/components/HobbyProject.vue';
import ContactForm from '@/components/ContactForm.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { usePageHead } from '@/composables/usePageHead';
import { siteUrl, author, defaultImage } from '@/utils/seo';
import { defaultDescription, siteName } from '@/config/site';

usePageHead({ path: '/' }, [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author,
    url: siteUrl,
    image: defaultImage,
    jobTitle: 'Software Solutions Engineer',
    description: defaultDescription,
    sameAs: [
      'https://github.com/JoramMillenaar',
      'https://www.linkedin.com/in/joram-millenaar-099406143/',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
  },
]);
</script>

<template>
  <div class="home-page">
    <NavBar :show-at-top="false" />
    <SiteHeader />
    <main>
      <ExperienceSection />
      <HobbyProject />
      <TestimonialsSection />
      <ContactForm />
      <SiteFooter />
    </main>
  </div>
</template>

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
