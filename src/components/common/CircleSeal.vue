<script setup>
import { ref, computed, useId, nextTick, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  /** Diameter in px. */
  size: { type: Number, default: 220 },
  /** Rotation duration in seconds. */
  duration: { type: Number, default: 18 },
  /** Inner padding in px. */
  padding: { type: Number, default: 14 },
  /** Uppercase the text. */
  uppercase: { type: Boolean, default: true },
  /** Insert bullet separators between words. */
  addDots: { type: Boolean, default: true },
});

const vb = 1000; // viewBox size for stable geometry
const fontSizePx = ref(22);
const textLength = ref(0);
const pathId = `seal-path-${useId()}`;

const root = ref(null);

const radius = computed(() => {
  const padVb = (props.padding / props.size) * vb;
  return vb / 2 - padVb;
});

const circlePathD = computed(() => {
  const cx = vb / 2;
  const cy = vb / 2;
  const r = radius.value;
  return [
    `M ${cx - r} ${cy}`,
    `a ${r} ${r} 0 1 1 ${2 * r} 0`,
    `a ${r} ${r} 0 1 1 ${-2 * r} 0`,
  ].join(' ');
});

const normalizedText = computed(() => {
  let t = (props.text ?? '').trim();
  if (!t) return '';
  if (props.uppercase) t = t.toUpperCase();
  if (props.addDots) {
    t = t.replace(/\s+/g, ' ').split(' ').join(' • ');
  }
  return `${t} •`;
});

function fitText() {
  const el = root.value;
  const textEl = el?.querySelector('.seal-text');
  const pathEl = el?.querySelector('path');
  if (!textEl || !pathEl) return;

  const circumference = 2 * Math.PI * radius.value;
  textLength.value = circumference * 0.94;

  const min = 8;
  const max = 80;
  const measure = () => {
    try {
      return textEl.getComputedTextLength();
    } catch {
      return Infinity;
    }
  };

  let lo = min;
  let hi = max;
  let best = min;

  fontSizePx.value = Math.max(min, Math.min(max, Math.round(props.size / 10)));
  void textEl.getBBox?.();

  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    fontSizePx.value = mid;
    void textEl.getBBox?.();
    if (measure() <= textLength.value) {
      best = mid;
      lo = mid;
    } else {
      hi = mid;
    }
  }

  fontSizePx.value = Math.floor(best);
}

onMounted(() => {
  nextTick(() => {
    fitText();
    window.addEventListener('resize', fitText, { passive: true });
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', fitText);
});
</script>

<template>
  <div
    ref="root"
    class="seal"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
    role="img"
    :aria-label="text"
  >
    <svg
      class="seal-svg"
      :viewBox="`0 0 ${vb} ${vb}`"
      :style="{ animationDuration: `${duration}s` }"
    >
      <defs>
        <path
          :id="pathId"
          :d="circlePathD"
        />
      </defs>

      <text
        class="seal-text"
        :style="{ fontSize: `${fontSizePx}px` }"
      >
        <textPath
          :href="`#${pathId}`"
          startOffset="50%"
          text-anchor="middle"
          lengthAdjust="spacingAndGlyphs"
          :textLength="textLength"
        >
          {{ normalizedText }}
        </textPath>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.seal {
  display: inline-block;
  position: relative;
}

.seal-svg {
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
  animation-name: seal-rotate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.ring {
  fill: none;
  stroke: currentColor;
  stroke-width: 6;
  opacity: 0.08;
}

.seal-text {
  fill: currentColor;
  letter-spacing: 0.08em;
  font-weight: 500;
  opacity: 0.9;
}

@keyframes seal-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .seal-svg {
    animation: none;
  }
}
</style>


border-bottom-colorrgb(229, 231, 235)
border-bottom-stylesolid
border-bottom-width0px
border-left-colorrgb(229, 231, 235)
border-left-stylesolid
border-left-width0px
border-right-colorrgb(229, 231, 235)
border-right-stylesolid
border-right-width0px
border-top-colorrgb(229, 231, 235)
border-top-stylesolid
border-top-width0px
box-sizingborder-box
colorrgb(203, 203, 203)
displayblock
fillrgb(203, 203, 203)
font-familyMontserrat, sans-serif
font-feature-settingsnormal
font-size79px
font-variation-settingsnormal
font-weight500
heightauto
letter-spacing6.32px
line-height110.6px
margin-bottom0px
margin-left0px
margin-right0px
margin-top0px
opacity0.9
padding-bottom0px
padding-left0px
padding-right0px
padding-top0px
pointer-eventsnone
tab-size4
text-renderingoptimizelegibility
text-size-adjust100%
text-wrap-modenowrap
transform-origin0px 0px
white-space-collapsecollapse
widthauto
-webkit-tap-highlight-colorrgba(0, 0, 0, 0)