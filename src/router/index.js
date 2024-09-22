import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ExperienceDetailPage from '@/views/ExperienceDetailPage.vue';
import SkillsPage from '@/views/SkillsPage.vue';
import { calculateTopPosition } from '@/utils/windowUtils';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/experience/:id',
    name: 'ExperienceDetail',
    component: ExperienceDetailPage,
    props: true,
  },
  {
    path: '/skills',
    name: 'Skills',
    component: SkillsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      let element = document.querySelector(to.hash);
      if (element) {
        return {
          top: calculateTopPosition(element),
          behavior: 'smooth',
        };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            element = document.querySelector(to.hash);
            if (element) {
              resolve({
                top: calculateTopPosition(element),
                behavior: 'smooth',
              });
            } else {
              resolve({
                top: 0,
              });
            }
          }, 300); // Adjust delay as necessary
        });
      }
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
