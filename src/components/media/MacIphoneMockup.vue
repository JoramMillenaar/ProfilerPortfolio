<template>
  <div class="device-mockup">
    <img
      src="@/assets/images/apple-mockup.webp"
      alt="MacBook Mockup"
      class="device-image"
    />
    <div class="screen-content">
      <object class="screen-image">
        <video-content :video="video"></video-content>
      </object>
      <div ref="mockup" class="phone-image">
        <picture class="phone-video">
          <img class="phone-main" :src="phoneOverlayImg" loading="lazy" />
          <img
            :style="transformStyle"
            class="phone-second"
            :src="phoneScrollableImg"
            ref="scrollable"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import VideoContent from './VideoContent.vue';
import { throttle } from 'lodash';

export default {
  components: { VideoContent },
  props: ['video', 'phoneOverlayImg', 'phoneScrollableImg'],
  data() {
    return {
      scrollPercentage: 0,
      transformStyle: null,
      viewportHeight: null,
    };
  },
  mounted() {
    this.viewportHeight = window.innerHeight;
    window.addEventListener('scroll', throttle(this.handleScroll, 100));
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.animationFrame) {
        this.animationFrame = requestAnimationFrame(() => {
          const rec = this.$refs.scrollable.getBoundingClientRect();
          this.elementTop = rec.top;
          this.elementBottom = rec.bottom;
          if (this.elementTop < this.viewportHeight && this.elementBottom >= 0) {
            const totalHeight = this.elementBottom - this.elementTop;
            const curPosition =
              this.elementBottom / (this.viewportHeight + totalHeight);
            this.scrollPercentage = (curPosition * 80 - 82).toFixed(1);
            this.applyTransform();
          }

          this.animationFrame = null;
        });
      }
    },
    applyTransform() {
      this.transformStyle = {
        transform: `translateY(${this.scrollPercentage}%)`,
      };
    },
  },
};
</script>


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
