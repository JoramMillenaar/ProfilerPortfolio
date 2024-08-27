<template>
  <div class="work-box" ref="workBoxes">
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
    <div class="work-media" ref="workMedia">
      <img
        :src="workExperience.image"
        :alt="workExperience.title"
        loading="lazy"
      />
      <video
        v-if="workExperience.video"
        :src="workExperience.video"
        :alt="workExperience.title"
        @loadeddata="handleVideoLoad($event)"
        muted
        loop
        playsinline
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workExperience: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleVideoLoad(event) {
      const videoElement = event.target;
      videoElement.previousElementSibling.style.display = 'none';
      videoElement.style.display = 'block';
      videoElement.play();
    },
  },
};
</script>

<style scoped></style>
