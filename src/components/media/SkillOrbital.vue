<template>
  <div class="orbit">
    <ul class="orbit-wrap">
      <li v-for="(orbit, index) in orbits" :key="index">
        <ul :class="`ring-${index}`">
          <li v-for="(iconUrl, idx) in orbit.iconImages" :key="idx">
            <img
              class="orbit-icon"
              v-if="iconUrl"
              v-lazy="iconUrl"
              :alt="orbit.icons[idx]"
            />
            <i v-else>{{ orbit.icons[idx] }}</i>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchIcon } from '@/utils/iconFetcher';

export default {
  name: 'SkillOrbital',
  props: {
    orbits: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.fetchAllIcons();
  },
  methods: {
    async fetchAllIcons() {
      for (let orbit of this.orbits) {
        const iconPromises = orbit.icons.map((iconName) => fetchIcon(iconName));
        orbit.iconImages = await Promise.all(iconPromises);
      }
    },
  },
};
</script>

<style scoped>
.orbit {
  float: left;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
}

.orbit-icon {
  width: 1.3em;
  height: 1.3em;
}

.orbit-wrap {
  height: 40em;
  list-style: none;
  font-size: 1.3em;
}

.orbit-wrap > li {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.orbit:hover ul[class^='ring'] li {
  font-size: 0em;
}

.orbit:hover ul[class^='ring'] {
  width: 0;
  height: 0;
}

ul[class^='ring'] {
  transition: all 300ms ease-in-out;
}

ul[class^='ring'] li {
  transition: all 300ms ease-in-out;
}

.ring-0 {
  width: 25em;
  height: 25em;
  animation: clockwiseRotate 35s linear infinite;
}

.ring-0 img,
.ring-0 i {
  animation: counterClockwiseRotate 35s linear infinite;
}

.ring-0 > *:nth-of-type(1) {
  transform: rotate(95deg) translate(12.5em) rotate(-95deg);
}

.ring-0 > *:nth-of-type(2) {
  transform: rotate(190deg) translate(12.5em) rotate(-190deg);
}

.ring-0 > *:nth-of-type(3) {
  transform: rotate(285deg) translate(12.5em) rotate(-285deg);
}

.ring-0 > *:nth-of-type(4) {
  transform: rotate(380deg) translate(12.5em) rotate(-380deg);
}

.ring-1 {
  width: 20em;
  height: 20em;
  animation: clockwiseRotate 30s linear infinite;
}

.ring-1 img,
.ring-1 i {
  animation: counterClockwiseRotate 30s linear infinite;
}

.ring-1 > *:nth-of-type(1) {
  transform: rotate(126.66667deg) translate(10em) rotate(-126.66667deg);
}

.ring-1 > *:nth-of-type(2) {
  transform: rotate(253.33333deg) translate(10em) rotate(-253.33333deg);
}

.ring-1 > *:nth-of-type(3) {
  transform: rotate(380deg) translate(10em) rotate(-380deg);
}

.ring-2 {
  width: 15em;
  height: 15em;
  animation: clockwiseRotate 25s linear infinite;
}

.ring-2 img,
.ring-2 i {
  animation: counterClockwiseRotate 25s linear infinite;
}

.ring-2 > *:nth-of-type(1) {
  transform: rotate(47.5deg) translate(7.5em) rotate(-47.5deg);
}

.ring-2 > *:nth-of-type(2) {
  transform: rotate(95deg) translate(7.5em) rotate(-95deg);
}

.ring-2 > *:nth-of-type(3) {
  transform: rotate(142.5deg) translate(7.5em) rotate(-142.5deg);
}

.ring-2 > *:nth-of-type(4) {
  transform: rotate(190deg) translate(7.5em) rotate(-190deg);
}

.ring-2 > *:nth-of-type(5) {
  transform: rotate(237.5deg) translate(7.5em) rotate(-237.5deg);
}

.ring-2 > *:nth-of-type(6) {
  transform: rotate(285deg) translate(7.5em) rotate(-285deg);
}

.ring-2 > *:nth-of-type(7) {
  transform: rotate(332.5deg) translate(7.5em) rotate(-332.5deg);
}

.ring-2 > *:nth-of-type(8) {
  transform: rotate(380deg) translate(7.5em) rotate(-380deg);
}

.ring-3 {
  width: 10em;
  height: 10em;
  animation: clockwiseRotate 20s linear infinite;
}

.ring-3 img,
.ring-3 i {
  animation: counterClockwiseRotate 20s linear infinite;
}

.ring-3 > *:nth-of-type(1) {
  transform: rotate(126.66667deg) translate(5em) rotate(-126.66667deg);
}

.ring-3 > *:nth-of-type(2) {
  transform: rotate(253.33333deg) translate(5em) rotate(-253.33333deg);
}

.ring-3 > *:nth-of-type(3) {
  transform: rotate(380deg) translate(5em) rotate(-380deg);
}

ul[class^='ring'] {
  border: solid 1px rgba(200, 200, 200, 0.2);
  position: relative;
  padding: 0;
  border-radius: 50%;
  list-style: none;
  box-sizing: content-box;
}

ul[class^='ring'] li {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.6em;
  height: 1.6em;
  margin: -0.8em;
}

/* 
animations 
*/
@keyframes clockwiseRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes counterClockwiseRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
