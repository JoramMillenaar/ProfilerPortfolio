<template>
  <div class="relative group">
    <ImageContent :src="skillImage" :alt="name" className="skill-emblem" />
    <div class="tooltip">
      {{ prettyName }}
    </div>
  </div>
</template>

<script>
import ImageContent from '../media/ImageContent.vue';
import skillsData from '/src/data/skills.json';

export default {
  props: ['name'],
  components: { ImageContent },
  data() {
    return {
      skillImage: '',
    };
  },
  async created() {
    const skill = skillsData.find((skill) => skill.id === this.name);
    this.skillImage = 'skills/' + skill.icon;
    this.prettyName = skill.name;
  },
};
</script>

<style>
.skill-emblem {
  @apply size-11 lg:size-10 md:size-9 sm:size-6 bg-transparent transition-transform transform duration-200 ease-in-out group-hover:translate-y-[-6px] group-hover:rotate-0
}

.tooltip {
  @apply absolute left-5 transform translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 ease-in-out text-white text-sm p-2 bg-white/20 rounded
}
</style>
