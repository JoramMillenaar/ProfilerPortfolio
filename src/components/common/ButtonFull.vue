<template>
  <button type="submit" class="btn btn-cta">{{ contents }}</button>
</template>

<script>
export default {
  props: ['contents'],
};
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

.btn-cta {
  color: var(--bg-color-primary);
  background-color: var(--important);
}

body .btn-cta:hover,
body .btn-cta:focus {
  box-shadow: #07070733 0 0 0 var(--gutter-nano);
}
</style>
