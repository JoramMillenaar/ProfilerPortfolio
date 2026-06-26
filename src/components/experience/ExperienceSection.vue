<script setup>
import experienceData from '@/data/experience.json';
import ExperienceDetail from './ExperienceDetail.vue';
import MacIphoneMockup from '../media/MacIphoneMockup.vue';
import VideoContent from '../media/VideoContent.vue';
import SimpleMacMockup from '../media/SimpleMacMockup.vue';

// Positional layout config per experience entry (matches the source order).
const layouts = [
  { media: 'video', rounded: true, textAos: 'fade-right' },
  { media: 'video', rounded: true, textAos: 'fade-right' },
  { media: 'video', rounded: true, textAos: 'fade-right' },
  { media: 'phone', rounded: false, textAos: 'fade-left' },
  { media: 'mac', rounded: false, textAos: 'fade-right' },
];

const experiences = experienceData.map((exp, index) => ({
  ...exp,
  layout: layouts[index] ?? { media: 'video', rounded: true, textAos: 'fade-right' },
  isLeft: index % 2 === 1,
}));
</script>

<template>
  <section class="work">
    <div class="container">
      <h2 id="work">
        My Experience
      </h2>
      <div class="work-boxes">
        <div
          v-for="exp in experiences"
          :key="exp.id"
          class="work-box"
          :class="{ left: exp.isLeft }"
        >
          <div
            class="work-textbox"
            :data-aos="exp.layout.textAos"
          >
            <ExperienceDetail
              :id="exp.id"
              :title="exp.title"
              :company="exp.company"
              :location="exp.location"
              :description="exp.description"
              :skills="exp.skills"
            />
          </div>
          <div
            class="work-media shadow"
            :class="{ rounded: exp.layout.rounded }"
            data-aos="zoom-in-up"
          >
            <MacIphoneMockup
              v-if="exp.layout.media === 'phone'"
              :video="exp.video"
              :thumbnail="exp.thumbnail"
              :phone-overlay-img="exp.phoneOverlayImg"
              :phone-scrollable-img="exp.phoneScrollableImg"
            />
            <SimpleMacMockup
              v-else-if="exp.layout.media === 'mac'"
              :thumbnail="exp.thumbnail"
              :video="exp.video"
            />
            <VideoContent
              v-else
              :thumbnail="exp.thumbnail"
              :video="exp.video"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
  margin-block-end: var(--gutter-x-huge);
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
  max-inline-size: 785px;
  transition: 0.6s all;
}

.shadow {
  filter: drop-shadow(0px 0px 172px rgba(255, 255, 255, 0.1));
}

.left {
  flex-direction: row-reverse;
}

.rounded video {
  border-radius: 5px;
}
</style>
