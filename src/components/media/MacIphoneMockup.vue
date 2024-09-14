<template>
  <div class="device-mockup">
    <img
      v-lazy="require('@/assets/images/apple-mockup.webp')"
      alt="A mockup image of a Macbook and an Iphone displaying the images and video below"
      class="device-image"
      loading="lazy"
    />
    <div class="screen-content">
      <object class="screen-image">
        <video-content :video="video" :thumbnail="thumbnail" />
      </object>
      <div class="phone-image">
        <picture class="phone-video">
          <img
            class="phone-main"
            v-lazy="require(`@/assets/images/${phoneOverlayImg}`)"
            loading="lazy"
            alt="An IPhone's screen contents displaying a header with the Thrust logo"
          />
          <img
            :style="transformStyle"
            class="phone-second"
            v-lazy="require(`@/assets/images/${phoneScrollableImg}`)"
            ref="scrollable"
            loading="lazy"
            alt="A series of widgets with boats displayed on the phone's screen"
          />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import VideoContent from './VideoContent.vue';

export default {
  components: { VideoContent },
  props: ['video', 'thumbnail', 'phoneOverlayImg', 'phoneScrollableImg'],
  data() {
    return {
      scrollPercentage: 0,
      transformStyle: null,
      viewportHeight: null,
      timer: null,
    };
  },
  mounted() {
    this.viewportHeight = window.innerHeight;
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          const rec = this.$refs.scrollable.getBoundingClientRect();
          this.elementTop = rec.top;
          this.elementBottom = rec.bottom;
          if (
            this.elementTop < this.viewportHeight &&
            this.elementBottom >= 0
          ) {
            const totalHeight = this.elementBottom - this.elementTop;
            const curPosition =
              this.elementBottom / (this.viewportHeight + totalHeight);
            this.scrollPercentage = (curPosition * 80 - 82).toFixed(1);
            this.applyTransform();
          }
        }, 70);
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
