<script setup>
import { computed } from 'vue';
import { BaseImage } from '@/components/base';
import skillsData from '@/data/skills.json';

const props = defineProps({
  /** Skill id (matches an entry in skills.json). */
  name: {
    type: String,
    required: true,
  },
});

const skill = computed(() => skillsData.find((s) => s.id === props.name));
const skillImage = computed(() =>
  skill.value ? `skills/${skill.value.icon}` : '',
);
const prettyName = computed(() => skill.value?.name ?? props.name);
</script>

<template>
  <div class="relative group">
    <BaseImage
      :src="skillImage"
      :alt="prettyName"
      img-class="skill-emblem"
    />
    <div class="tooltip">
      {{ prettyName }}
    </div>
  </div>
</template>

<style>
.skill-emblem {
  @apply size-11 lg:size-10 md:size-9 sm:size-6 bg-transparent transition-transform transform duration-200 ease-in-out group-hover:translate-y-[-6px] group-hover:rotate-0
}

.tooltip {
  @apply absolute left-5 transform translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 ease-in-out text-white text-sm p-2 bg-white/20 rounded
}
</style>
