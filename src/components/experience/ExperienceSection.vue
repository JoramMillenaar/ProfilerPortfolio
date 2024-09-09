<template>
  <section class="work">
    <div class="container">
      <h2 class="h2" id="work">My Experience</h2>
      <div class="work-boxes">
        <div class="work-box">
          <div class="work-textbox">
            <experience-detail
              :id="experiences[0].id"
              :title="experiences[0].title"
              :subtitle="experiences[0].subtitle"
              :location="experiences[0].location"
              :description="experiences[0].description"
              :skills="experiences[0].skills"
              :modalId="experiences[0].modalId"
            />
          </div>
          <div class="work-media">
            <video-content
              :video="experiences[0].video"
            ></video-content>
          </div>
        </div>
        <div class="work-box left">
          <div class="work-textbox">
            <experience-detail
              :id="experiences[1].id"
              :title="experiences[1].title"
              :subtitle="experiences[1].subtitle"
              :location="experiences[1].location"
              :description="experiences[1].description"
              :skills="experiences[1].skills"
              :modalId="experiences[1].modalId"
            />
          </div>
          <div class="work-media">
            <mac-iphone-mockup
              :video="experiences[1].video"
              :phoneOverlayImg="experiences[1].phoneOverlayImg"
              :phoneScrollableImg="experiences[1].phoneScrollableImg"
            ></mac-iphone-mockup>
          </div>
        </div>
        <div class="work-box">
          <div class="work-textbox">
            <experience-detail
              :id="experiences[2].id"
              :title="experiences[2].title"
              :subtitle="experiences[2].subtitle"
              :location="experiences[2].location"
              :description="experiences[2].description"
              :skills="experiences[2].skills"
              :modalId="experiences[2].modalId"
            />
          </div>
          <div class="work-media">
            <simple-mac-mockup
              :image="experiences[2].image"
              :video="experiences[2].video"
            ></simple-mac-mockup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import experienceData from '@/data/experience.json';
import ExperienceDetail from './ExperienceDetail.vue';
import MacIphoneMockup from '../media/MacIphoneMockup.vue';
import VideoContent from '../media/VideoContent.vue';
import SimpleMacMockup from '../media/SimpleMacMockup.vue';

export default {
  components: {
    ExperienceDetail,
    MacIphoneMockup,
    VideoContent,
    SimpleMacMockup,
  },
  data() {
    return {
      experiences: experienceData,
    }
  },
  mounted() {
    this.experiences.forEach((experience) => {
      experience.video = require(`@/assets/videos/${experience.video}`);
    });
    this.experiences[1].phoneOverlayImg = require(`@/assets/images/${this.experiences[1].phoneOverlayImg}`);
    this.experiences[1].phoneScrollableImg = require(`@/assets/images/${this.experiences[1].phoneScrollableImg}`);
    
  },
};
</script>

<style>
.work-boxes {
  padding-block-start: var(--gutter-x-large);
}

.work-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1045px) {
  .work-boxes {
    max-inline-size: fit-content;
    margin-inline: auto;
  }

  .work-box {
    flex-direction: column-reverse!important;
    align-items: flex-start;
  }

  .work-media {
    margin-block-end: var(--gutter-medium);
  }
}

.work-box:not(:last-child) {
  margin-block-end: var(--gutter-huge);
}

@media (max-width: 1285px) {
  .work-box:not(:last-child) {
    margin-block-end: 8rem;
  }
}

@media (max-width: 885px) {
  .work h2 {
    margin-block-start: 45px;
  }
}

@media (max-width: 485px) {
  .work h2 {
    margin-block-start: 0;
  }
}

.work-media,
.work-textbox {
  flex-basis: 49%;
}

.work-textbox {
  max-inline-size: 550px;
}

.work-media {
  filter: drop-shadow(0px 0px 172px rgba(255, 255, 255, 0.1));
  max-inline-size: 785px;
  transition: 0.6s all;
}

.left {
  flex-direction: row-reverse;
}
</style>
