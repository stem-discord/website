import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: `/`,
    name: `Home`,
    component: Home,
  },
  {
    path: `/about`,
    name: `About`,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ `@/views/About.vue`);
    },
  },{
    path: `/sponsors`,
    name: `sponsors`,
    component: function() {
      return import(`@/views/Sponsors.vue`);
    },
  },
  {
    path: `/rules`,
    name: `rules of the server`,
    component: () => import(`@/views/MarkdownViews/Rules.vue`),
  },
  {
    path: `/tos`,
    name: `tos of the server`,
    component: () => import(`@/views/MarkdownViews/TOS.vue`),
  },
  {
    path: `/meme`,
    name: `we doin meme events`,
    component: () => import(`@/views/Meme.vue`),
  },
  {
    path: `/memes`,
    name: `grid of memes`,
    component: () => import(`@/views/Memes.vue`),
  },
  {
    path: `/404`,
    name: `explicit 404`,
    component: function() {
      return import(`@/views/404.vue`);
    },
  },
  {
    path: `/:pathMatch(.*)*`,
    name: `catch page`,
    component: function() {
      return import(`@/views/404.vue`);
    },
  },
];

// https://router.vuejs.org/guide/advanced/scroll-behavior.html
function scrollBehavior (to, from, savedPosition) {
  if (savedPosition && to.hash !== from.hash) {
    return savedPosition;
  }
  if (to.hash) {
    const item = document.querySelector(`a.anchor[href="${to.hash}"]`);
    if (item) {
      item.scrollIntoView({ behavior: `smooth`});
    }
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

export default router;
