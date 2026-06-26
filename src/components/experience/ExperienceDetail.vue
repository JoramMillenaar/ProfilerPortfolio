<script setup>
import { computed } from 'vue';
import { BaseLink } from '@/components/base';
import SkillEmblem from './SkillEmblem.vue';

const props = defineProps({
  /** Experience id (used to build the detail-page link). */
  id: { type: String, required: true },
  /** Role title. */
  title: { type: String, default: '' },
  /** Company name. */
  company: { type: String, default: '' },
  /** Location label. */
  location: { type: String, default: '' },
  /** Short description. */
  description: { type: String, default: '' },
  /** Skill ids. */
  skills: { type: Array, default: () => [] },
});

const detailPageLink = computed(() => ({
  name: 'ExperienceDetail',
  params: { id: props.id },
}));
</script>

<template>
  <div>
    <h3 class="text-h3">
      {{ title }}
    </h3>
    <h4 class="text-xl">
      for {{ company }}
    </h4>
    <h5 class="text-base font-light">
      📍 {{ location }}
    </h5>
    <p class="my-4">
      {{ description }}
    </p>
    <div class="flex flex-row flex-wrap justify-start sm:gap-gutter-small py-gutter-small gap-gutter-large">
      <SkillEmblem
        v-for="skill in skills"
        :key="skill"
        :name="skill"
      />
    </div>
    <div class="flex items-center justify-between gap-6">
      <BaseLink :to="detailPageLink">
        Read More
      </BaseLink>
    </div>
  </div>
</template>
