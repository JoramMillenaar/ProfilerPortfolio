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
            <img
              class="phone-main"
              :src="phoneOverlayImg"
            />
            <img
              :style="transformStyle"
              class="phone-second"
              :src="phoneScrollableImg"
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
    props: ['video', 'phoneOverlayImg', 'phoneScrollableImg'],
    data() {
      return {
        scrollPercentage: 0,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    // beforeDestroy() {
    //   window.removeEventListener('scroll', this.handleScroll);
    // },
    methods: {
      handleScroll() {
        const element = this.$refs.mockup;
        if (element) {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          const viewportHeight = window.innerHeight;
  
          if (elementTop < viewportHeight && elementBottom >= 0) {
            const totalHeight = elementBottom - elementTop;
            const curPosition = elementBottom / (viewportHeight + totalHeight);
            this.scrollPercentage = (curPosition * 100).toFixed(2);
          }
        }
      },
    },
    computed: {
      transformStyle() {
        const translateY = -82 + (82 * this.scrollPercentage) / 100;
        return {
          transform: `translateY(${translateY}%)`,
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
    width: 100%; /* Adjust accordingly to fit the phone mockup exactly */
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
    transform: translateY(-91.8%);
  }
  </style>
  