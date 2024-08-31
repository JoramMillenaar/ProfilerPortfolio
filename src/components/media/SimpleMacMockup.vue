<template>
  <div class="device-mockup">
    <img
      src="@/assets/images/simple-mac.webp"
      alt="MacBook Mockup"
      class="device-image"
      loading="lazy"
    />
    <object class="screen-content">
      <video-content :video="video"></video-content>
    </object>
  </div>
</template>

<script>
import VideoContent from './VideoContent.vue';
export default {
  components: {
    VideoContent,
  },
  props: ['video'],
};
</script>

<style scoped>
.device-mockup {
  position: relative;
  width: 100%;
  height: auto;
}

.device-image {
  width: 100%;
  display: block;
}

.screen-content {
  position: absolute;
  top: 4.4%;
  left: 11.5%;
  width: 77%;
  height: 85.5%;
}

/* .screen-content img, */
/* .screen-content video { */
/* object-fit: contain; */
/* } */
</style>
