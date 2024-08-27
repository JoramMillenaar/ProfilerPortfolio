<template>
  <div class="work-box" ref="workBoxes">
    <div class="media">
      <mac-mockup></mac-mockup>
    </div>
    <div class="work-textbox">
      <h3 class="h3">{{ workExperience.title }}</h3>
      <h5 class="h5">{{ workExperience.subtitle }}</h5>
      <h6 class="h6">{{ workExperience.location }}</h6>
      <p class="work-text">{{ workExperience.description }}</p>
      <div class="skills-imgs">
        <span
          class="tooltip"
          v-for="skill in workExperience.skills"
          :key="skill.name"
          :data-title="skill.name"
        >
          <img
            :src="skill.img"
            :alt="skill.name"
            class="skills-img"
            loading="lazy"
          />
        </span>
      </div>
      <div class="work-links">
        <a class="link" @click="openModal(workExperience.modalId)">Read More</a>
      </div>
    </div>
  </div>
</template>

<script>
import MacMockup from '../components/MacMockup.vue';

export default {
  components: {
    MacMockup,
  },
  props: {
    workExperience: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.media {
  flex-basis: 49%;
}
</style>
