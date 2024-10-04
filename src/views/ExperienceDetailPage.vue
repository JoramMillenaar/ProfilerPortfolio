<template>
  <nav-bar :showAtTop="false" />
  <div class="header">
    <div class="header-top">
      <div class="header-text">
        <h1 class="h1 font-tech">{{ experience.company }}</h1>
        <h2>{{ experience.title }}</h2>
        <h3>{{ experience.location }}</h3>
      </div>
      <div class="header-media">
        <video-content
          :thumbnail="experience.thumbnail"
          :video="experience.video"
          :blurred-background="experience.blurredBackground"
        ></video-content>
      </div>
    </div>
    <div class="skills">
      <skill-emblem
        v-for="skill in experience.skills"
        :key="skill"
        :name="skill"
      ></skill-emblem>
    </div>
  </div>
  <div class="container">
    <div class="text-section">
      <div
        v-for="(section, index) in experience.content"
        :key="index"
        class="text-box"
      >
        <h2 v-if="section.type == 'header'" class="subheader">{{ section.content }}</h2>
        <p v-if="section.type == 'paragraph'">{{ section.content }}</p>
        <ul v-if="section.type == 'list'">
          <li v-for="(item, index) in section.items" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer">
    <site-footer />
  </div>
</template>

<script>
import experienceData from '@/data/experience.json';
import SkillEmblem from '@/components/experience/SkillEmblem.vue';
import VideoContent from '@/components/media/VideoContent.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'ExperienceDetailPage',
  components: { SkillEmblem, VideoContent, SiteFooter, NavBar },
  data() {
    return {
      experience: {},
    };
  },
  beforeMount() {
    const experienceId = this.$route.params.id;
    this.experience = experienceData.find((exp) => exp.id === experienceId);
  },
};
</script>

<style scoped>
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

.text-section {
  padding-top: var(--gutter-x-large);
  margin: 0 var(--gutter-huge);
}

@media (max-width: 1045px) {
  .header-top {
    flex-direction: column-reverse !important;
    align-items: flex-start;
  }

  .header-media {
    margin-block-end: var(--gutter-medium);
  }

  .text-section {
    margin: 0 var(--gutter-medium);
  }
}

@media (max-width: 700px) {
  .text-section {
    margin: 0 var(--gutter-small);
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

.text-box {
  padding-top: var(--gutter-micro);
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

.subheader {
  padding-top: var(--gutter-medium);
  padding-bottom: var(--gutter-nano);
}
</style>
