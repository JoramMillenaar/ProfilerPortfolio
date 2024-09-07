<template>
  <section class="work">
    <div class="container">
      <h2 class="h2" id="work">My Experience</h2>
      <div class="work-boxes">
        <div class="work-box">
          <div class="work-textbox">
            <experience-detail
              :id="therapielandExperience.id"
              :title="therapielandExperience.title"
              :subtitle="therapielandExperience.subtitle"
              :location="therapielandExperience.location"
              :description="therapielandExperience.description"
              :skills="therapielandExperience.skills"
              :modalId="therapielandExperience.modalId"
            />
          </div>
          <div class="work-media">
            <video-content
              :video="therapielandExperience.video"
            ></video-content>
          </div>
        </div>
        <div class="work-box left">
          <div class="work-textbox">
            <experience-detail
              :id="enviuExperience.id"
              :title="enviuExperience.title"
              :subtitle="enviuExperience.subtitle"
              :location="enviuExperience.location"
              :description="enviuExperience.description"
              :skills="enviuExperience.skills"
              :modalId="enviuExperience.modalId"
            />
          </div>
          <div class="work-media">
            <mac-iphone-mockup
              :video="enviuExperience.video"
              :phoneOverlayImg="enviuExperience.phoneOverlayImg"
              :phoneScrollableImg="enviuExperience.phoneScrollableImg"
            ></mac-iphone-mockup>
          </div>
        </div>
        <div class="work-box">
          <div class="work-textbox">
            <experience-detail
              :id="thrustExperience.id"
              :title="thrustExperience.title"
              :subtitle="thrustExperience.subtitle"
              :location="thrustExperience.location"
              :description="thrustExperience.description"
              :skills="thrustExperience.skills"
              :modalId="thrustExperience.modalId"
            />
          </div>
          <div class="work-media">
            <simple-mac-mockup
              :image="thrustExperience.image"
              :video="thrustExperience.video"
            ></simple-mac-mockup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
      therapielandExperience: {
        id: 'therapieland',
        title: 'Back-end Developer',
        subtitle: 'at Therapieland B.V.',
        location: '📍 Amsterdam, The Netherlands',
        description:
          'Advanced the e-health platform as a Backend Developer, improving mental health service delivery in the Netherlands for over 3 years.',
        skills: [
          'Python',
          'Django',
          'SQL',
          'pytest',
          'Git',
          'JavaScript',
          'Shell',
          'HTML/CSS',
          'Kubernetes',
          'Google Cloud',
        ],
        video: require('@/assets/videos/therapieland-comp.mp4'),
        modalId: 'therapieland-modal',
      },
      enviuExperience: {
        id: 'enviu',
        title: 'Front-end Developer',
        subtitle: 'for ENVIU B.V.',
        location: '📍 Rotterdam, The Netherlands',
        description:
          'Developed a responsive website showcasing eco-friendly maritime initiatives, featuring an interactive map and dynamic content management using WordPress.',
        skills: ['WordPress', 'JavaScript', 'HTML/CSS'],
        modalId: 'enviu-modal',
        video: require('@/assets/videos/mac-enviu-comp.mp4'),
        phoneOverlayImg: require('@/assets/images/iphone-enviu-main.webp'),
        phoneScrollableImg: require('@/assets/images/maritime-scroll-250w.webp'),
      },
      thrustExperience: {
        id: 'maritime-emissions',
        title: 'Lead Developer',
        subtitle: 'for ENVIU B.V.',
        location: '📍 Rotterdam, The Netherlands',
        description:
          'Led the development of an interactive web application for visualizing maritime emissions.',
        skills: ['Python', 'Django', 'HTML/CSS', 'JavaScript', 'Git', 'Shell'],
        video: require('@/assets/videos/thrust-website-comp.mp4'),
        modalId: 'maritime-emissions-modal',
      },
    };
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
