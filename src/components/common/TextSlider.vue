<template>
  <div class="font-tech mb-3">
    <div class="overflow-hidden flex h-h1">
      <h1 class="text-h1 inline m-0 leading-tight">Hello </h1>
      <ul class="mt-0 pl-4 text-left list-none h-fit animate-list">
        <li
          class="m-0"
          v-for="(greeting, index) in greetings"
          :key="index"
        >
          <h1 class="text-h1 leading-tight">{{ greeting }}</h1>
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
.animate-list {
  -webkit-animation-name: change;
  -webkit-animation-duration: 40s;
  -webkit-animation-iteration-count: infinite;
  animation-name: change;
  animation-duration: 40s;
  animation-iteration-count: infinite;
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
