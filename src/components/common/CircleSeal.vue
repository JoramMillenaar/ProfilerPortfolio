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

      <text class="seal-text" :style="{ fontSize: `${fontSizePx}px` }">
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

<script>
export default {
  name: "CircularSeal",
  props: {
    text: {type: String, required: true},
    size: {type: Number, default: 220},
    duration: {type: Number, default: 18},
    padding: {type: Number, default: 14},
    uppercase: {type: Boolean, default: true},
    addDots: {type: Boolean, default: true},
  },
  data() {
    return {
      vb: 1000, // viewBox size for stable geometry
      fontSizePx: 22,
      pathId: `seal-path-${Math.random().toString(36).slice(2)}`,
      textLength: 0,
    };
  },
  computed: {
    radius() {
      // radius in viewBox units
      // map px padding to vb scale
      const padVb = (this.padding / this.size) * this.vb;
      return this.vb / 2 - padVb;
    },
    circlePathD() {
      const cx = this.vb / 2;
      const cy = this.vb / 2;
      const r = this.radius;

      // full circle path (two arcs) — best compatibility
      return [
        `M ${cx - r} ${cy}`,
        `a ${r} ${r} 0 1 1 ${2 * r} 0`,
        `a ${r} ${r} 0 1 1 ${-2 * r} 0`,
      ].join(" ");
    },
    normalizedText() {
      let t = (this.text ?? "").trim();
      if (!t) return "";

      if (this.uppercase) t = t.toUpperCase();

      // Seal vibe: add dots between words (optional)
      if (this.addDots) {
        // Collapse whitespace, then put centered dots between tokens
        const tokens = t.replace(/\s+/g, " ").split(" ");
        t = tokens.join(" • ");
      }
      // Add a trailing separator so it loops nicely visually
      return `${t} •`;
    },
  },
  mounted() {
    // Wait for svg to render, then fit font size by measurement.
    this.$nextTick(() => {
      this.fitText();
      // Refit on resize (if parent layout changes)
      window.addEventListener("resize", this.fitText, {passive: true});
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.fitText);
  },
  methods: {
    fitText() {
      const svg = this.$el?.querySelector("svg");
      const textEl = this.$el?.querySelector(".seal-text");
      const pathEl = this.$el?.querySelector("path");

      if (!svg || !textEl || !pathEl) return;

      // circumference in vb units
      const circumference = 2 * Math.PI * this.radius;

      // Give the text a target length slightly under circumference
      // so we avoid cramped glyphs.
      this.textLength = circumference * 0.94;

      // Binary search a font size that fits.
      // We measure the text element length in vb units.
      const min = 8;
      const max = 80;

      const measure = () => {
        // getComputedTextLength gives the current rendered length
        // in the SVG coordinate system.
        try {
          return textEl.getComputedTextLength();
        } catch {
          return Infinity;
        }
      };

      let lo = min;
      let hi = max;
      let best = min;

      // Start from something proportional to circle size (in px)
      // and then refine.
      this.fontSizePx = Math.max(min, Math.min(max, Math.round(this.size / 10)));

      // Force reflow-ish
      void textEl.getBBox?.();

      for (let i = 0; i < 12; i++) {
        const mid = (lo + hi) / 2;
        this.fontSizePx = mid;

        // Force the browser to update metrics
        void textEl.getBBox?.();

        const len = measure();
        if (len <= this.textLength) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }

      this.fontSizePx = Math.floor(best);
    },
  },
};
</script>

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

/* subtle ring to sell the seal vibe */
.ring {
  fill: none;
  stroke: currentColor;
  stroke-width: 6;
  opacity: 0.08;
}

/* text styling */
.seal-text {
  fill: currentColor;
  letter-spacing: 0.08em;
  font-weight: 500;
  opacity: 0.9;
}

/* slow rotation */
@keyframes seal-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .seal-svg {
    animation: none;
  }
}
</style>
