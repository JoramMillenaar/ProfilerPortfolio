<template>
  <div>
    <h3 class="text-h3">{{ title }}</h3>
    <h4>for {{ company }}</h4>
    <h5>📍 {{ location }}</h5>
    <p class="work-text">{{ description }}</p>
    <div class="skills-imgs">
      <skill-emblem
        v-for="skill in skills"
        :key="skill"
        :name="skill"
      ></skill-emblem>
    </div>
    <div class="work-links">
      <external-link class="link" :to="detailPageLink">Read More</external-link>
    </div>
  </div>
</template>

<script>
import ExternalLink from '../common/ExternalLink.vue';
import SkillEmblem from './SkillEmblem.vue';

export default {
  components: { SkillEmblem, ExternalLink },
  props: [
    'id',
    'title',
    'company',
    'location',
    'description',
    'skills',
    'modalId',
  ],
  computed: {
    detailPageLink() {
      return { name: 'ExperienceDetail', params: { id: this.id } };
    },
  },
};
</script>

<style scoped>
.work-text {
  margin-block: var(--gutter-micro);
}

.skills-imgs {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: var(--gutter-small);
  padding-block: var(--gutter-small);
}

@media (max-width: 675px) {
  .skills-imgs {
    gap: var(--gutter-large);
  }
}

.work-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gutter-x-small);
}

h4 {
  font-size: 1.2rem;
}

h5 {
  font-size: 1rem;
  font-weight: 300;
}

</style>
