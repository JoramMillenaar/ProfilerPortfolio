<template>
  <section class="work">
    <div class="container">
      <h2 class="h2" id="work">My Experience</h2>
      <div class="work-boxes">
        <div class="work-box">
          <div class="work-textbox">
            <experience-header
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
            <content-display
              :image="therapielandExperience.image"
              :video="therapielandExperience.video"
            ></content-display>
          </div>
        </div>
        <div class="work-box">
          <div class="work-media">
            <mac-iphone-mockup
              :macMP4="enviuExperience.macMP4"
              :phoneOverlayImg="enviuExperience.phoneOverlayImg"
              :phoneScrollableImg="enviuExperience.phoneScrollableImg"
            ></mac-iphone-mockup>
          </div>
          <div class="work-textbox">
            <experience-header
              :id="enviuExperience.id"
              :title="enviuExperience.title"
              :subtitle="enviuExperience.subtitle"
              :location="enviuExperience.location"
              :description="enviuExperience.description"
              :skills="enviuExperience.skills"
              :modalId="enviuExperience.modalId"
            />
          </div>
        </div>
        <div class="work-box">
          <div class="work-textbox">
            <experience-header
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
            <content-display :image="thrustExperience.image"></content-display>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ExperienceHeader from './ExperienceHeader.vue';
import MacIphoneMockup from '../media/MacIphoneMockup.vue';
import ContentDisplay from '../media/ContentDisplay.vue';

export default {
  components: {
    ExperienceHeader,
    MacIphoneMockup,
    ContentDisplay,
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
        image: require('@/assets/images/work/therapieland.png'),
        video: require('@/assets/videos/therapieland.mp4'),
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
        macMP4: require('@/assets/videos/mac-enviu.mp4'),
        phoneOverlayImg: require('@/assets/images/iphone-enviu-main.png'),
        phoneScrollableImg: require('@/assets/images/long-enviu.jpg'),
      },
      thrustExperience: {
        id: 'maritime-emissions',
        title: 'Lead Developer',
        subtitle: 'for ENVIU B.V.',
        location: '📍 Rotterdam, The Netherlands',
        description:
          'Led the development of an interactive web application for visualizing maritime emissions.',
        skills: ['Python', 'Django', 'HTML/CSS', 'JavaScript', 'Git', 'Shell'],
        image: require('@/assets/images/work/emission-thumbnail.png'),
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
    flex-direction: column-reverse;
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

.work-textbox h3,
.work-textbox h6,
.work-textbox h5,
.work-textbox,
.work-text,
.work-technologies,
.work-links {
  --delay: 0.2s;
  animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  /* animation-play-state: paused; */
}

.work-media {
  max-inline-size: 785px;
  transition: 0.6s all;
}
</style>
