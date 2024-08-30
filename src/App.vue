<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@font-face {
  font-family: 'Mona Sans';
  src: url('assets/fonts/Mona-Sans.woff2') format('woff2 supports variations'),
    url('assets/fonts/Mona-Sans.woff2') format('woff2-variations');
  font-display: swap;
  font-weight: 200 900;
  font-stretch: 75% 125%;
}

@font-face {
  font-family: 'Tech';
  src: url('assets/fonts/tech.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

:root {
  --h1: 3.5rem;
  --h2: 3rem;
  --h3: 2.145rem;
  --h4: 1.5rem;
  --text-large: 1.6rem;
  --text-medium: 1.275rem;
  --text-small: 1.125rem;

  --gradient-brand: radial-gradient(
      at 60% 31%,
      rgb(255, 131, 139) 0px,
      transparent 50%
    ),
    radial-gradient(at 48% 98%, rgba(0, 255, 166, 0.707) 0px, transparent 50%),
    radial-gradient(at 84% 67%, rgb(255, 129, 125) 0px, transparent 50%),
    radial-gradient(at 16% 47%, rgb(255, 90, 112) 0px, transparent 50%),
    radial-gradient(at 73% 11%, rgb(115, 255, 225) 0px, transparent 50%),
    radial-gradient(at 49% 37%, rgba(255, 249, 89, 0.695) 0px, transparent 50%),
    radial-gradient(at 70% 21%, rgba(58, 255, 186, 0.715) 0px, transparent 50%);
  --easing: cubic-bezier(0.86, 0, 0.07, 1);

  --site-max-width: 1280px;
  --gutter-nano: 0.5rem;
  --gutter-micro: 1rem;
  --gutter-x-small: 1.5rem;
  --gutter-small: 2rem;
  --gutter-medium: 2.5rem;
  --gutter-large: 3rem;
  --gutter-x-large: 6rem;
  --gutter-huge: 12rem;

  --scroll-padding: 4.375rem;
  --radius: 45px;
}

body {
  --bg-color-primary: #1b1b1b;
  --bg-color-secondary: #202020;
  --important: #f0f5ff;
  --sub: #f0f5ff;
  --body: #cbcbcb;
  --border: #62626234;
  --border-dark: #5e5e5e1f;
  --gradient-border: linear-gradient(to left bottom, #000000c6, #0e0d0d00);
  --shadow: 0 1rem 1rem rgba(0, 0, 0, 0.25);
  font-size: var(--text-medium);
  color: var(--body);
  background-color: var(--bg-color-primary);
  line-height: 1.4;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-family: 'Montserrat', 'Mona Sans', sans-serif;
  box-sizing: border-box;
  scroll-padding-top: var(--scroll-padding);
}

@media (max-width: 1200px) {
  html {
    font-size: 90%;
  }
}

@media (max-width: 645px) {
  html {
    font-size: 80%;
  }
}

/* Improve media defaults */

picture,
video,
svg,
img {
  display: block;
  max-inline-size: 100%;
  object-fit: contain;
}

textarea {
  resize: none;
}

input,
textarea,
button {
  font: inherit;
}

p,
h1,
h2,
h3,
.h4 {
  overflow-wrap: break-word;
}

h1,
h2,
h3,
.h4 {
  font-stretch: 125%;
  line-height: 1.2;
  color: var(--important);
}

.h1 {
  font-size: var(--h1);
}

.h2 {
  border-image: linear-gradient(
      to right,
      transparent 10%,
      gray 50%,
      transparent 90%
    )
    1;
  border-bottom: 1px solid;
  font-size: var(--h2);
  text-align: center;
  padding-bottom: 1rem;
}

.h3 {
  font-size: var(--h3);
}

.h4 {
  font-size: var(--h4);
}

@media (max-width: 845px) {
  :root {
    --h1: 2.845rem;
    --h2: 2.45rem;
    --h3: 1.85rem;
  }
}

@media (max-width: 700px) {
  :root {
    --h1: 2.545rem;
  }
}

@media (max-width: 545px) {
  :root {
    --h1: 2.4rem;
    --text-large: 1.5rem;
  }
}

@media (max-width: 485px) {
  :root {
    --h1: 2.145rem;
    --h2: 1.875rem;
    --h3: 1.6rem;
    --text-large: 1.345rem;
  }
}

.container {
  max-inline-size: var(--site-max-width);
  margin-inline: auto;
}

@media (max-width: 1375px) {
  :root {
    --site-max-width: 1160px;
  }
}

@media (max-width: 1275px) {
  .container {
    padding-inline: var(--gutter-small);
  }
}

@media (max-width: 1200px) {
  .container {
    padding-inline: var(--gutter-medium);
  }
}

@media (max-width: 575px) {
  .container {
    padding-inline: var(--gutter-small);
  }
}

.lock-screen {
  overflow-y: hidden;
}

.hidden {
  visibility: hidden;
  transform: translateX(-100%);
}

.transform {
  transform: translateY(6rem);
  opacity: 0;
}

.shown {
  transition: 0.1s;
  color: lightgrey;
}

.link {
  display: inline-block;
  cursor: pointer;
  font-weight: 600;
  font-size: var(--text-small);
  padding: var(--gutter-nano) 0;
  text-decoration: none;
  color: var(--important);
  position: relative;
}

.link::after,
.link::before {
  content: '';
  width: 100%;
  height: 1px;
  margin-block-start: var(--gutter-nano);
  position: absolute;
  bottom: -1px;
  left: 0;
  transition: 300ms;
}

body .link::before {
  background-color: lightgray;
}

body .link::after {
  background-color: black;
}

.link::after {
  background-color: white;
  transform-origin: left;
  transform: scaleX(0);
}

.link:hover::after,
.link:focus::after {
  transform: scaleX(1);
}
</style>
