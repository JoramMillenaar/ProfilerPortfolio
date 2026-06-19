import HomePage from '@/views/HomePage.vue';
import ExperienceDetailPage from '@/views/ExperienceDetailPage.vue';
import BlogPage from '@/views/BlogPage.vue';
import BlogDetailPage from '@/views/BlogDetailPage.vue';
import { calculateTopPosition } from '@/utils/windowUtils';

export const routes = [
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
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetailPage,
    props: true,
  },
];

export function scrollBehavior(to, from, savedPosition) {
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
}
