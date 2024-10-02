<template>
  <div class="device-mockup">
    <ImageContent
      src="simple-mac.webp"
      placeholder="simple-mac-lqip.webp"
      alt="MacBook Mockup displaying the video below"
      className="device-image"
    />
    <object class="screen-content">
      <video-content :video="video" :thumbnail="thumbnail" />
    </object>
  </div>
</template>

<script>
import ImageContent from './ImageContent.vue';
import VideoContent from './VideoContent.vue';
export default {
  components: {
    VideoContent,
    ImageContent,
  },
  props: ['video', 'thumbnail'],
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
