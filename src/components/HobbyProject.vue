<template>
  <section class="article">
    <div class="container">
      <h2 class="h2" id="projects">My Hobby Projects</h2>
      <div class="article-boxes">
        <article
          class="article-box featured-article"
          data-aos="zoom-out-up"
          data-aos-offset="300"
          data-aos-duration="200"
        >
          <div class="article-textbox">
            <div>
              <h3 class="h3">{{ featured.title }}</h3>
              <p class="text-text-medium my-6">{{ featured.description }}</p>
            </div>
            <div class="article-info">
              <external-link class="link" :href="featured.link" target="_blank">Source Code</external-link>
              <skill-emblem :name="featured.skill"></skill-emblem>
            </div>
          </div>
          <picture class="article-illustration">
            <ImageContent
              v-if="!featured.featured"
              :src="featured.image"
              :alt="featured.title + ' image'"
            />
          </picture>
        </article>
        <article
          class="article-box"
          v-for="(project, index) in projects"
          :key="project.id"
          data-aos="zoom-out-up"
          :data-aos-offset="400 + 100 * index"
        >
          <div class="article-textbox">
            <div>
              <div class="article-title">
                <h3 class="h4">{{ project.title }}</h3>
                <ImageContent
                  v-if="!project.featured"
                  className="article-icon"
                  :src="project.image"
                  :alt="project.title + '\'s logo'"
                />
              </div>
              <p class="text-text-small my-6">{{ project.description }}</p>
            </div>
            <div class="article-info">
              <external-link class="link" :href="project.link" target="_blank">Source Code</external-link>
              <skill-emblem :name="project.skill" />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import SkillEmblem from './experience/SkillEmblem.vue';
import projectData from '@/data/projects.json';
import ExternalLink from './common/ExternalLink.vue';
import ImageContent from './media/ImageContent.vue';

export default {
  name: 'HobbyProject',
  components: {
    SkillEmblem,
    ExternalLink,
    ImageContent
  },
  data() {
    return {
      featured: projectData.featured,
      projects: projectData.projects,
    };
  },
};
</script>

<style scoped>
.article-boxes {
  display: flex;
  flex-flow: row wrap;
  gap: 3.5%;
  margin-block-start: var(--gutter-x-large);
}

.article-box {
  flex-basis: 31%;
  border: 1px solid var(--border);
  padding: var(--gutter-medium) var(--gutter-small);
  border-radius: var(--gutter-nano);
  background-color: var(--bg-color-secondary);
}

.article-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.article-icon {
  width: 70px;
  height: 70px;
  margin-right: 15px;
  border-radius: 50%;
}

.article-textbox {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-info {
  display: flex;
  justify-content: space-between;
  margin-block-start: auto;
}

.reaction-count {
  display: inline-flex;
  align-items: center;
  gap: var(--gutter-nano);
  font-size: initial;
}

@media (max-width: 985px) {
  .article-boxes {
    max-inline-size: 685px;
    margin-inline: auto;
    justify-content: center;
    gap: 4%;
  }

  .article-box:nth-of-type(2),
  .article-box:nth-of-type(3) {
    flex-basis: 48%;
  }

  .article-box:last-child {
    display: none;
  }
}

@media (max-width: 650px) {
  .article-box:nth-child(2),
  .article-box:nth-child(3),
  .article-box:last-child {
    flex-basis: 100%;
  }

  .featured-article {
    margin-block-end: 0;
  }

  .article-box:not(:last-child) {
    margin-block-end: var(--gutter-x-small);
  }

  .article-box:last-child {
    display: block;
  }
}

.featured-article {
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 44.8px;
}

@media (max-width: 985px) {
  .featured-article {
    margin-block-end: 24.4px;
    flex-direction: column-reverse;
  }
}

.featured-article .article-textbox {
  flex-basis: 44%;
}

.featured-article h3 {
  margin-block-start: var(--gutter-x-small);
}

.featured-article .article-illustration {
  flex-basis: 50%;
}

.article-illustration img {
  border-radius: var(--gutter-nano);
}
</style>
