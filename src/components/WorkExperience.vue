<template>
  <section class="work">
    <div class="container">
      <h2 class="h2" id="work">My Experience</h2>
      <div class="work-boxes">
        <video-experience-reel :workExperience="workExperience[0]"></video-experience-reel>
        <mockup-experience-reel :workExperience="workExperience[1]"></mockup-experience-reel>
        <video-experience-reel :workExperience="workExperience[2]"></video-experience-reel>
      </div>
    </div>
  </section>
</template>

<script>
import VideoExperienceReel from '../components/VideoExperienceReel.vue';
import MockupExperienceReel from '../components/MockupExperienceReel.vue';

export default {
  components: {
    VideoExperienceReel,
    MockupExperienceReel,
  },
  data() {
    return {
      workExperience: [
        {
          id: 'therapieland',
          title: 'Back-end Developer',
          subtitle: 'at Therapieland B.V.',
          location: '📍 Amsterdam, The Netherlands',
          description:
            'Advanced the e-health platform as a Backend Developer, improving mental health service delivery in the Netherlands for over 3 years.',
          skills: [
            {
              name: 'Python',
              img: require('../assets/images/skills/python.svg'),
            },
            {
              name: 'Django',
              img: require('../assets/images/skills/django.png'),
            },
            { name: 'SQL', img: require('../assets/images/skills/sql.png') },
            {
              name: 'pytest',
              img: require('../assets/images/skills/pytest.svg'),
            },
            { name: 'Git', img: require('../assets/images/skills/git.webp') },
            {
              name: 'JavaScript',
              img: require('../assets/images/skills/js.webp'),
            },
            {
              name: 'Shell',
              img: require('../assets/images/skills/shell.webp'),
            },
            {
              name: 'HTML/CSS',
              img: require('../assets/images/skills/css.webp'),
            },
            {
              name: 'Kubernetes',
              img: require('../assets/images/skills/kubernetes.svg'),
            },
            {
              name: 'Google Cloud',
              img: require('../assets/images/skills/googlecloud.svg'),
            },
          ],
          image: require('../assets/images/work/therapieland.png'),
          video: require('../assets/videos/therapieland.mp4'),
          modalId: 'therapieland-modal',
        },
        {
          id: 'enviu',
          title: 'Front-end Developer',
          subtitle: 'for ENVIU B.V.',
          location: '📍 Rotterdam, The Netherlands',
          description:
            'Developed a responsive website showcasing eco-friendly maritime initiatives, featuring an interactive map and dynamic content management using WordPress.',
          skills: [
            {
              name: 'WordPress',
              img: require('../assets/images/skills/wordpress.png'),
            },
            {
              name: 'JavaScript',
              img: require('../assets/images/skills/js.webp'),
            },
            {
              name: 'HTML/CSS',
              img: require('../assets/images/skills/css.webp'),
            },
          ],
          image: require('../assets/images/work/green-maritime-medium.png'),
          modalId: 'enviu-modal',
        },
        {
          id: 'maritime-emissions',
          title: 'Lead Developer',
          subtitle: 'for ENVIU B.V.',
          location: '📍 Rotterdam, The Netherlands',
          description:
            'Led the development of an interactive web application for visualizing maritime emissions.',
          skills: [
            {
              name: 'Python',
              img: require('../assets/images/skills/python.svg'),
            },
            {
              name: 'Django',
              img: require('../assets/images/skills/django.png'),
            },
            {
              name: 'HTML/CSS',
              img: require('../assets/images/skills/css.webp'),
            },
            {
              name: 'JavaScript',
              img: require('../assets/images/skills/js.webp'),
            },
            { name: 'Git', img: require('../assets/images/skills/git.webp') },
            {
              name: 'Shell',
              img: require('../assets/images/skills/shell.webp'),
            },
          ],
          image: require('../assets/images/work/emission-thumbnail.png'),
          modalId: 'maritime-emissions-modal',
        },
      ],
    };
  },
  methods: {
    openModal(id) {
      this.$emit('open-modal', id);
    },
    handleVideoLoad(event) {
      const videoElement = event.target;
      videoElement.previousElementSibling.style.display = 'none';
      videoElement.style.display = 'block';
      videoElement.play();
    },
    applyIntersectionObserver() {
      // const workMedia = this.$refs.workMedia;

      // workMedia.forEach((workContent) => workContent.classList.add('transform'));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const textbox = entry.target.querySelector('.work-textbox');
              // const picture = entry.target.getElementsByTagName('picture')[0];
              // picture.classList.remove('transform');
              Array.from(textbox.children).forEach((el) => {
                el.style.animationPlayState = 'running';
              });
            }
          });
        },
        { threshold: 0.3 }
      );

      this.$refs.workBoxes.forEach((workEl) => observer.observe(workEl));
    },
  },
  mounted() {
    // this.applyIntersectionObserver();
  },
};
</script>

<style>
.work-boxes {
  padding-block-start: var(--gutter-x-large);
}

.work-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1045px) {
  .work-boxes {
    max-inline-size: fit-content;
    margin-inline: auto;
  }

  .work-box {
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .work-media * {
    margin-block-end: var(--gutter-medium);
  }
}

.work-box:not(:last-child) {
  margin-block-end: var(--gutter-huge);
}

@media (max-width: 1285px) {
  .work-box:not(:last-child) {
    margin-block-end: 8rem;
  }
}

.work-media *,
.work-textbox {
  flex-basis: 49%;
}

.work-media * {
  max-inline-size: 785px;
  transition: 0.6s all;
}

.work-media video {
  display: none;
  max-inline-size: 785px;
  transition: 0.6s all;
}

.work-media * {
  box-shadow: var(--shadow);
}

.work-textbox {
  max-inline-size: 445px;
}

@media (max-width: 885px) {
  .work h2 {
    margin-block-start: 45px;
  }
}

@media (max-width: 485px) {
  .work h2 {
    margin-block-start: 0;
  }
}

.work-text {
  margin-block: var(--gutter-micro);
}

.work-technologies {
  list-style-position: inside;
  list-style-type: disc;
  margin-block-end: var(--gutter-x-small);
}

.work-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gutter-x-small);
}

.work-links img {
  block-size: 28px;
  inline-size: 28px;
}

/* Github icon */

.work-links > a:last-child {
  transition: 0.3s transform ease-in;
}

.work-links > a:hover,
.work-links > a:focus {
  transform: scale(1.1);
}

.work-text,
.contact-text,
.work-technologies {
  font-weight: 300;
}

.work-textbox h3,
.work-textbox h6,
.work-textbox h5,
.work-textbox .skills-imgs,
.work-text,
.work-technologies,
.work-links {
  --delay: 0.2s;
  animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  /* animation-play-state: paused; */
}

.work-text {
  animation-delay: var(--delay);
}

.work-technologies {
  animation-delay: calc(var(--delay) * 1.5);
}

.work-links {
  animation-delay: calc(var(--delay) * 2);
}

@keyframes slide-up {
  from {
    transform: translateY(45px);
    opacity: 0;
  }

  to {
    transform: none;
    opacity: 1;
  }
}

.skills-imgs {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: var(--gutter-small);
  padding-block: var(--gutter-small);
}

.skills-img {
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.3));
  block-size: 50px;
  inline-size: 50px;
  background: transparent;
  transform: rotateX(20deg) rotateZ(2deg);
  transform-style: preserve-3d;
  transition: 0.2s ease-in-out transform, 0.2s ease-in-out filter;
}

.skills-img:hover {
  transform: translate3d(0px, -6px, 0px) rotateX(0deg) rotateZ(0deg);
  filter: drop-shadow(5px 8px 3px rgba(0, 0, 0, 0.2));
}

@media (max-width: 1100px) {
  .skills-img {
    block-size: 40px;
    inline-size: 40px;
  }
}

@media (max-width: 810px) {
  .skills-img {
    block-size: 35px;
    inline-size: 35px;
  }
}

@media (max-width: 675px) {
  .skills-imgs {
    gap: var(--gutter-large);
  }
  .skills-img {
    block-size: 25px;
    inline-size: 25px;
  }
}

@media (max-width: 340px) {
  .skills-img {
    block-size: 20px;
    inline-size: 20px;
  }
}

.tooltip {
  position: relative;
}
.tooltip:before,
.tooltip:after {
  display: block;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transform: translate3d(0, -10px, 0);
  transition: all 0.15s ease-in-out;
}

.tooltip:after {
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgba(0, 0, 0, 0.5);
  border-left: 6px solid transparent;
  content: '';
  height: 0;
  top: 44px;
  left: 20px;
  width: 0;
}
.tooltip:before {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  color: #fff;
  content: attr(data-title);
  font-size: 14px;
  padding: 6px 10px;
  top: 50px;
  white-space: nowrap;
}

.tooltip:hover:after,
.tooltip:hover:before {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
