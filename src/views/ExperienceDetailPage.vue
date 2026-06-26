<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import SkillEmblem from '@/components/experience/SkillEmblem.vue';
import VideoContent from '@/components/media/VideoContent.vue';
import CustomText from '@/components/common/CustomText.vue';
import experienceData from '@/data/experience.json';
import { usePageHead } from '@/composables/usePageHead';
import { stripMarkdown, truncate } from '@/utils/seo';

const route = useRoute();
const experience = computed(
  () => experienceData.find((exp) => exp.id === route.params.id) || {},
);

usePageHead(() => {
  const exp = experience.value;
  if (!exp.id) {
    return { path: `/experience/${route.params.id}` };
  }
  const intro = `${exp.title} at ${exp.company}${
    exp.location ? ` — ${exp.location}` : ''
  }.`;
  return {
    title: `${exp.title} at ${exp.company}`,
    description: truncate(`${intro} ${stripMarkdown(exp.content || '')}`, 160),
    path: `/experience/${exp.id}`,
  };
});
</script>

<template>
  <DefaultLayout>
    <div class="header">
      <div class="header-top">
        <div class="header-text">
          <h1 class="capitalize">
            {{ experience.company }}
          </h1>
          <h3>{{ experience.title }}</h3>
          <h4>{{ experience.location }}</h4>
        </div>
        <div class="header-media">
          <VideoContent
            :thumbnail="experience.thumbnail"
            :video="experience.video"
          />
        </div>
      </div>

      <div class="skills">
        <SkillEmblem
          v-for="skill in experience.skills"
          :key="skill"
          :name="skill"
        />
      </div>
    </div>
    <div class="container">
      <div class="text-section">
        <CustomText :content="experience.content" />
      </div>
    </div>

    <template #footer>
      <div class="footer">
        <SiteFooter />
      </div>
    </template>
  </DefaultLayout>
</template>

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
