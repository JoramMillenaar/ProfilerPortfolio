<script setup>
import { BaseContainer, BaseIcon } from '@/components/base';

const socials = [
  {
    title: 'GitHub',
    href: 'https://github.com/JoramMillenaar',
    icon: 'github.svg',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joram-millenaar-099406143/',
    icon: 'linkedin.svg',
  },
];
</script>

<template>
  <footer class="px-gutter-large py-0 border-t-2 border-border border-solid text-center pt-6">
    <BaseContainer>
      <nav>
        <ol class="list-none p-0 flex justify-center gap-gutter-small">
          <li
            v-for="social in socials"
            :key="social.title"
            class="footer-link"
          >
            <a
              class="inline-block"
              :title="social.title"
              :href="social.href"
              target="_blank"
              rel="noopener"
            >
              <BaseIcon
                :src="social.icon"
                :alt="social.title"
                :size="24"
              />
            </a>
          </li>
        </ol>
      </nav>
    </BaseContainer>
  </footer>
</template>
