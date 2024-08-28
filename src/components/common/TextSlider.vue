<template>
  <div class="slider">
    <div class="slider-container">
      <h1 class="h1 slider-container-text">Hello </h1>
      <ul class="slider-container-list">
        <li
          class="slider-container-list-item"
          v-for="(greeting, index) in greetings"
          :key="index"
        >
          <h1 class="h1">{{ greeting }}</h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextSlider',
  data() {
    return {
      greetings: [
        'World!',
        'Enterprise!',
        'Innovators!',
        'Startups!',
        'Creators!',
        'Local!',
        'Solutions!',
        'Automation!',
        'Growth!',
        'Tech!',
      ],
    };
  },
};
</script>

<style scoped>
.slider {
  font-family: 'Tech', 'Mona Sans', sans-serif;
  margin-bottom: 0.7rem;
}

.slider-container {
  overflow: hidden;
  height: var(--h1);
  display: flex;
}

.slider-container-text {
  display: inline;
  margin: 0;
}

.slider-container-list {
  margin-top: 0;
  padding-left: var(--gutter-micro);
  text-align: left;
  list-style: none;
  -webkit-animation-name: change;
  -webkit-animation-duration: 40s;
  -webkit-animation-iteration-count: infinite;
  animation-name: change;
  animation-duration: 40s;
  animation-iteration-count: infinite;
  height: fit-content;
}

.slider-container-list-item {
  line-height: 40px;
  margin: 0;
}

@-webkit-keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-o-keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-moz-keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-webkit-keyframes change {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  5.56% {
    transform: translate3d(0, -10%, 0);
  }
  11.11% {
    transform: translate3d(0, -20%, 0);
  }
  16.67% {
    transform: translate3d(0, -30%, 0);
  }
  22.22% {
    transform: translate3d(0, -40%, 0);
  }
  27.78% {
    transform: translate3d(0, -50%, 0);
  }
  33.33% {
    transform: translate3d(0, -60%, 0);
  }
  38.89% {
    transform: translate3d(0, -70%, 0);
  }
  44.44% {
    transform: translate3d(0, -80%, 0);
  }
  50% {
    transform: translate3d(0, -90%, 0);
  }
  55.56% {
    transform: translate3d(0, -80%, 0);
  }
  61.11% {
    transform: translate3d(0, -70%, 0);
  }
  66.67% {
    transform: translate3d(0, -60%, 0);
  }
  72.22% {
    transform: translate3d(0, -50%, 0);
  }
  77.78% {
    transform: translate3d(0, -40%, 0);
  }
  83.33% {
    transform: translate3d(0, -30%, 0);
  }
  88.89% {
    transform: translate3d(0, -20%, 0);
  }
  94.44% {
    transform: translate3d(0, -10%, 0);
  }
}

@-o-keyframes change {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  5.56% {
    transform: translate3d(0, -10%, 0);
  }
  11.11% {
    transform: translate3d(0, -20%, 0);
  }
  16.67% {
    transform: translate3d(0, -30%, 0);
  }
  22.22% {
    transform: translate3d(0, -40%, 0);
  }
  27.78% {
    transform: translate3d(0, -50%, 0);
  }
  33.33% {
    transform: translate3d(0, -60%, 0);
  }
  38.89% {
    transform: translate3d(0, -70%, 0);
  }
  44.44% {
    transform: translate3d(0, -80%, 0);
  }
  50% {
    transform: translate3d(0, -90%, 0);
  }
  55.56% {
    transform: translate3d(0, -80%, 0);
  }
  61.11% {
    transform: translate3d(0, -70%, 0);
  }
  66.67% {
    transform: translate3d(0, -60%, 0);
  }
  72.22% {
    transform: translate3d(0, -50%, 0);
  }
  77.78% {
    transform: translate3d(0, -40%, 0);
  }
  83.33% {
    transform: translate3d(0, -30%, 0);
  }
  88.89% {
    transform: translate3d(0, -20%, 0);
  }
  94.44% {
    transform: translate3d(0, -10%, 0);
  }
}

@-moz-keyframes change {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  5.56% {
    transform: translate3d(0, -10%, 0);
  }
  11.11% {
    transform: translate3d(0, -20%, 0);
  }
  16.67% {
    transform: translate3d(0, -30%, 0);
  }
  22.22% {
    transform: translate3d(0, -40%, 0);
  }
  27.78% {
    transform: translate3d(0, -50%, 0);
  }
  33.33% {
    transform: translate3d(0, -60%, 0);
  }
  38.89% {
    transform: translate3d(0, -70%, 0);
  }
  44.44% {
    transform: translate3d(0, -80%, 0);
  }
  50% {
    transform: translate3d(0, -90%, 0);
  }
  55.56% {
    transform: translate3d(0, -80%, 0);
  }
  61.11% {
    transform: translate3d(0, -70%, 0);
  }
  66.67% {
    transform: translate3d(0, -60%, 0);
  }
  72.22% {
    transform: translate3d(0, -50%, 0);
  }
  77.78% {
    transform: translate3d(0, -40%, 0);
  }
  83.33% {
    transform: translate3d(0, -30%, 0);
  }
  88.89% {
    transform: translate3d(0, -20%, 0);
  }
  94.44% {
    transform: translate3d(0, -10%, 0);
  }
}

@keyframes change {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  5.56% {
    transform: translate3d(0, -10%, 0);
  }
  11.11% {
    transform: translate3d(0, -20%, 0);
  }
  16.67% {
    transform: translate3d(0, -30%, 0);
  }
  22.22% {
    transform: translate3d(0, -40%, 0);
  }
  27.78% {
    transform: translate3d(0, -50%, 0);
  }
  33.33% {
    transform: translate3d(0, -60%, 0);
  }
  38.89% {
    transform: translate3d(0, -70%, 0);
  }
  44.44% {
    transform: translate3d(0, -80%, 0);
  }
  50% {
    transform: translate3d(0, -90%, 0);
  }
  55.56% {
    transform: translate3d(0, -80%, 0);
  }
  61.11% {
    transform: translate3d(0, -70%, 0);
  }
  66.67% {
    transform: translate3d(0, -60%, 0);
  }
  72.22% {
    transform: translate3d(0, -50%, 0);
  }
  77.78% {
    transform: translate3d(0, -40%, 0);
  }
  83.33% {
    transform: translate3d(0, -30%, 0);
  }
  88.89% {
    transform: translate3d(0, -20%, 0);
  }
  94.44% {
    transform: translate3d(0, -10%, 0);
  }
}
</style>
