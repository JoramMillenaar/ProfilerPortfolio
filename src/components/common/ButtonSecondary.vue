<template>
  <a :href="actionCallLink" class="btn btn-secondary">{{ actionCallText }}</a>
</template>

<script>
export default {
    props: ["actionCallLink", "actionCallText"]
}
</script>

<style>
.btn {
  font-size: 1.35rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  padding: 18px 60px;
  border-radius: var(--gutter-nano);
  transition: 0.3s all ease-in-out;
  cursor: pointer;
}

@media (max-width: 700px) {
  .btn {
    padding: 16px 48px;
  }
}

@media (max-width: 485px) {
  .btn {
    font-size: 1.2rem;
    padding: 14px 38px;
  }
}

.btn-secondary {
  border: 1px solid var(--border-dark);
  color: var(--important);
}

.btn-secondary:hover,
.btn-secondary:focus {
  border-color: var(--important);
}
</style>