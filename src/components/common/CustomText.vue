<template>
  <div>
    <div v-for="(section, index) in content" :key="index" class="text-box">
      <h3 v-if="section.type === 'header'" class="pt-gutter-medium pb-gutter-nano text-xl font-semibold">
        {{ section.content }}
      </h3>

      <p v-else-if="section.type === 'paragraph'">
        {{ section.content }}
      </p>

      <ul v-else-if="section.type === 'list'">
        <li v-for="(item, i) in section.items" :key="i">
          {{ item }}
        </li>
      </ul>

      <figure v-else-if="section.type === 'image'" class="image-block shadow">
        <img :src="section.src" :alt="section.alt || ''"/>
        <figcaption v-if="section.caption">{{ section.caption }}</figcaption>
      </figure>

      <p v-else class="unknown">
        Unknown section type: {{ section.type }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    content: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.text-box {
  padding-top: var(--gutter-micro);
}

.subheader {
  padding-top: var(--gutter-medium);
  padding-bottom: var(--gutter-nano);
}

ul {
  list-style: none;
  margin-left: 0;
  padding-left: 1em;
}

ul > li:before {
  display: inline-block;
  padding-top: var(--gutter-nano);
  content: '-';
  width: 1em;
  margin-left: -1em;
}

.image-block {
  margin: 0;
  padding-bottom: var(--gutter-medium);
}

.image-block img {
  display: block;
  max-width: 100%;
  margin: auto;
  height: auto;
}

.image-block figcaption {
  padding-top: var(--gutter-nano);
  font-size: 0.875em;
  opacity: 0.7;
  font-style: italic;
}

.shadow {
  filter: drop-shadow(0px 0px 172px rgba(255, 255, 255, 0.1));
}

.unknown {
  opacity: 0.7;
  font-style: italic;
}
</style>