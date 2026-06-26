<script setup>
import { BaseImage } from '@/components/base';
import VideoContent from './VideoContent.vue';

defineProps({
  /** Video filename relative to src/assets/videos. */
  video: {
    type: String,
    required: true,
  },
  /** Thumbnail path relative to src/assets/images. */
  thumbnail: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="device-mockup">
    <BaseImage
      src="simple-mac.webp"
      placeholder="simple-mac-lqip.webp"
      alt="MacBook Mockup displaying the video below"
      img-class="device-image"
    />
    <object class="screen-content">
      <VideoContent
        :video="video"
        :thumbnail="thumbnail"
      />
    </object>
  </div>
</template>

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
</style>
