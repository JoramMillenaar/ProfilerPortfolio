<template>
  <section class="work">
    <div class="container">
      <h2 class="h2" id="work">My Experience</h2>
      <div class="work-boxes">
        <!-- Work Box for Each Experience -->
        <div class="work-box" ref="workBoxes" v-for="work in workExperience" :key="work.id">
          <div class="work-textbox">
            <h3 class="h3">{{ work.title }}</h3>
            <h5 class="h5">{{ work.subtitle }}</h5>
            <h6 class="h6">{{ work.location }}</h6>
            <p class="work-text">{{ work.description }}</p>
            <div class="skills-imgs">
              <span
                class="tooltip"
                v-for="skill in work.skills"
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
              <a class="link" @click="openModal(work.modalId)">Read More</a>
              <a href="#testimonials" class="link">Testimonials</a>
            </div>
          </div>
          <picture class="work-img" ref="workImgs">
            <img :src="work.image" :alt="work.title" loading="lazy" />
          </picture>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
    applyIntersectionObserver() {
      const workImgs = this.$refs.workImgs;
    
      workImgs.forEach(workImg => workImg.classList.add("transform"));
    
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const textbox = entry.target.querySelector('.work-textbox');
            const picture = entry.target.getElementsByTagName('picture')[0];
            picture.classList.remove("transform");
            Array.from(textbox.children).forEach(el => {
              el.style.animationPlayState = "running";
            });
          }
        });
      }, { threshold: 0.3 });
    
      this.$refs.workBoxes.forEach(workEl => observer.observe(workEl));
    }
  },
  mounted() {
    this.applyIntersectionObserver();
  }
}
</script>

<style scoped>
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

  .work-img {
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

.work-img,
.work-textbox {
  flex-basis: 49%;
}

.work-img {
  max-inline-size: 785px;
  transition: 0.6s all;
}

.work-img svg {
  position: absolute; /* Takes the SVG out of flow and positions relatively to the container */
  top: 50%; /* Position the top of the element at the center */
  left: 50%; /* Position the left of the element at the center */
  transform: translate(
    -50%,
    -50%
  ); /* Adjust the position to truly center the SVG */
  width: 50px; /* Or any size */
  height: 50px; /* Maintain aspect ratio */
}

.youtube-placeholder {
  position: relative;
  cursor: pointer;
}

body .work-img {
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
  animation-play-state: paused;
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
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, .6));
  block-size: 50px;
  inline-size: 50px;
  background: transparent;
  transform: rotateX(20deg) rotateZ(2deg);
  transform-style: preserve-3d;
  transition: 0.2s ease-in-out transform, 0.2s ease-in-out filter;
}

.skills-img:hover {
    transform: translate3d(0px, -6px, 0px) rotateX(0deg) rotateZ(0deg);
    filter: drop-shadow(5px 8px 3px rgba(0, 0, 0, .4));
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
  transform: translate3d(0,-10px,0);
  transition: all .15s ease-in-out;
}

.tooltip:after {
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgba(0,0,0,.5);
  border-left: 6px solid transparent;
  content: '';
  height: 0;
  top: 44px;
  left: 20px;
  width: 0;
}
.tooltip:before {
  background: rgba(0,0,0,.5);
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
  transform: translate3d(0,0,0);
}

</style>
