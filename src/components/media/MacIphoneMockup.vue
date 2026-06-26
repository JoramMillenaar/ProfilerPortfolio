<script setup>
import { ref, useTemplateRef, onMounted, onBeforeUnmount } from 'vue';
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
  /** Static phone overlay image path. */
  phoneOverlayImg: {
    type: String,
    required: true,
  },
  /** Scrollable phone screen image path. */
  phoneScrollableImg: {
    type: String,
    required: true,
  },
});

const scrollable = useTemplateRef('scrollable');
const transformStyle = ref(null);
let viewportHeight = null;
let timer = null;

function handleScroll() {
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    if (!scrollable.value) return;
    const rect = scrollable.value.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom >= 0) {
      const totalHeight = rect.bottom - rect.top;
      const curPosition = rect.bottom / (viewportHeight + totalHeight);
      const scrollPercentage = (curPosition * 80 - 82).toFixed(1);
      transformStyle.value = {
        transform: `translateY(${scrollPercentage}%)`,
      };
    }
  }, 70);
}

onMounted(() => {
  viewportHeight = window.innerHeight;
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="device-mockup">
    <BaseImage
      src="apple-mockup.webp"
      placeholder="apple-mockup-lqip.webp"
      alt="A mockup image of a Macbook and an Iphone displaying the images and video below"
      img-class="device-image"
    />
    <div class="screen-content">
      <object class="screen-image">
        <VideoContent
          :video="video"
          :thumbnail="thumbnail"
        />
      </object>
      <div class="phone-image">
        <picture class="phone-video">
          <BaseImage
            img-class="phone-main"
            :src="phoneOverlayImg"
            alt="An iPhone's screen contents displaying a header with the Thrust logo"
          />
          <div ref="scrollable">
            <BaseImage
              :style="transformStyle"
              img-class="phone-second"
              :src="phoneScrollableImg"
              alt="A series of widgets with boats displayed on the phone's screen"
            />
          </div>
        </picture>
      </div>
    </div>
  </div>
</template>

<style>
.device-mockup {
  position: relative;
  width: 100%;
  height: auto;
}

.device-image {
  width: 100%;
  display: block;
}

.screen-image,
.phone-video {
  position: absolute;
  object-fit: fill;
  clip-path: inherit;
}

.screen-image {
  top: 12.2%;
  left: -1.6%;
  width: 73%;
  height: 45%;
  clip-path: polygon(
    0 0,
    43% 0,
    43% 2.5%,
    58% 2.5%,
    58% 0,
    100% 0,
    100% 100%,
    0 100%
  );
  transform: perspective(12180px) rotateX(-13deg) rotateY(37deg) rotateZ(-12deg)
    skewX(-0.9deg);
}

.phone-image {
  position: absolute;
  top: 27.2%;
  left: 74.05%;
  width: 16.2%;
  height: 34.4%;
  overflow: hidden;
  border-radius: 10%;
  clip-path: polygon(
    0 0,
    28% 0,
    29% 3.5%,
    71% 3.5%,
    72% 0,
    100% 0,
    100% 100%,
    0 100%
  );
  transform: perspective(12180px) rotateX(-3deg) rotateY(9deg) rotateZ(19.6deg)
    skewX(-0.1deg) scaleY(1.055);
}

.phone-video {
  width: 100%;
  height: 100%;
}

.phone-main {
  height: 100%;
  object-fit: fill;
}

.phone-second {
  position: absolute;
  width: 100%;
  height: auto;
  top: 26%;
  z-index: -1;
  transition: transform 0.3s ease-out;
  will-change: transform;
}
</style>
