<template>
  <nav-bar :showAtTop="false"/>
  <div class="header">
    <div class="header-top">
      <div class="header-text">
        <h1 class="capitalize">{{ experience.company }}</h1>
        <h3>{{ experience.title }}</h3>
        <h4>{{ experience.location }}</h4>
      </div>
      <div class="header-media">
        <video-content
            :thumbnail="experience.thumbnail"
            :video="experience.video"
            :blurred-background="experience.blurredBackground"
        />
      </div>
    </div>

    <div class="skills">
      <skill-emblem
          v-for="skill in experience.skills"
          :key="skill"
          :name="skill"
      />
    </div>
  </div>
  <div class="container">
    <div class="text-section">
      <custom-text :content="experience.content"/>
    </div>
  </div>
  <div class="footer">
    <site-footer/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import experienceData from '@/data/experience.json';
import SkillEmblem from '@/components/experience/SkillEmblem.vue';
import VideoContent from '@/components/media/VideoContent.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import NavBar from '@/components/NavBar.vue';
import CustomText from "@/components/common/customText.vue";
import { pageHead, stripMarkdown, truncate } from '@/utils/seo';

export default {
  name: 'ExperienceDetailPage',
  components: {SkillEmblem, VideoContent, SiteFooter, NavBar, CustomText},
  setup() {
    const route = useRoute();
    const experience = computed(
      () =>
        experienceData.find((exp) => exp.id === route.params.id) || {},
    );

    useHead(
      computed(() => {
        const exp = experience.value;
        if (!exp.id) {
          return pageHead({ path: `/experience/${route.params.id}` });
        }
        const intro = `${exp.title} at ${exp.company}${
          exp.location ? ` — ${exp.location}` : ''
        }.`;
        const description = truncate(
          `${intro} ${stripMarkdown(exp.content || '')}`,
          160,
        );
        return pageHead({
          title: `${exp.title} at ${exp.company}`,
          description,
          path: `/experience/${exp.id}`,
        });
      }),
    );

    return { experience };
  },
};
</script>

<style scoped>
.text-section {
  padding-top: var(--gutter-x-large);
  margin: 0 var(--gutter-huge);
}

@media (max-width: 1045px) {
  .text-section {
    margin: 0 var(--gutter-medium);
  }
}

@media (max-width: 700px) {
  .text-section {
    margin: 0 var(--gutter-small);
  }
}

h3 {
  font-weight: 100;
  color: var(--body);
}

h2 {
  text-transform: capitalize;
  font-weight: 400;
}

.header {
  padding: var(--gutter-x-large);
  background: linear-gradient(
      -45deg,
      #e68d3a40,
      #e5a8764d,
      #94b5ef4c,
      #213e6051
  );
  background-size: 400% 400%;

  animation: gradient 20s ease infinite;
  position: relative;
  margin: 0;
  width: 100vw;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1045px) {
  .header-top {
    flex-direction: column-reverse !important;
    align-items: flex-start;
  }

  .header-media {
    margin-block-end: var(--gutter-medium);
  }
}

.header-media,
.header-text {
  flex-basis: 49%;
}

.header-text {
  max-inline-size: 550px;
}

.header-media {
  max-inline-size: 785px;
  transition: 0.6s all;
  border-radius: var(--gutter-nano);
  overflow: hidden;
}

.skills {
  display: flex;
  justify-content: space-between;
  padding-top: var(--gutter-x-large);
}

ul {
  list-style: none;
  margin-left: 0;
  padding-left: 1em;
}

ul > li:before {
  display: inline-block;
  padding-top: var(--gutter-nano);
  content: '-';
  width: 1em;
  margin-left: -1em;
}

.footer {
  margin-top: var(--gutter-x-large);
}
</style>
