<template>
  <footer class="px-gutter-large py-0 border-t-2 border-border border-solid text-center pt-6">
    <div class="container">
      <div>
        <nav>
          <ol class="list-none p-0 flex justify-center gap-gutter-small">
            <li class="footer-link">
              <a class="inline-block" title="GitHub" href="https://github.com/JoramMillenaar" target="_blank"
                rel="noopener">
                <ImageContent src="github.svg" alt="GitHub" className="w-6" />
              </a>
            </li>
            <li class="footer-link">
              <a class="inline-block" title="LinkedIn" href="https://www.linkedin.com/in/joram-millenaar-099406143/"
                target="_blank" rel="noopener">
                <ImageContent src="linkedin.svg" alt="LinkedIn" className="w-6" />
              </a>
            </li>
            <!-- Additional links can be added here -->
          </ol>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
import ImageContent from './media/ImageContent.vue';

export default {
  name: 'SiteFooter',
  components: { ImageContent },
};
</script>

<style scoped></style>
