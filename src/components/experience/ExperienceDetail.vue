<template>
  <div>
    <h3 class="text-h3">{{ title }}</h3>
    <h4 class="text-xl">for {{ company }}</h4>
    <h5 class="text-base font-light">📍 {{ location }}</h5>
    <p class="my-4">{{ description }}</p>
    <div class="flex flex-row flex-wrap justify-start sm:gap-gutter-small py-gutter-small gap-gutter-large">
      <skill-emblem
        v-for="skill in skills"
        :key="skill"
        :name="skill"
      ></skill-emblem>
    </div>
    <div class="flex items-center justify-between gap-6">
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

<style scoped></style>
