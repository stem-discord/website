import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

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
      return import(/* webpackChunkName: "about" */ `../views/About.vue`);
    },
  },
  {
    path: `/rules`,
    name: `rules of the server`,
    component: () => import(`../views/MarkdownTest.vue`),
  },
  {
    path: `/meme`,
    name: `we doin meme events`,
    component: () => import(`../views/Meme.vue`),
  },
  {
    path: `/404`,
    name: `explicit 404`,
    component: function() {
      return import(`../views/404.vue`);
    },
  },
  {
    path: `/:pathMatch(.*)*`,
    name: `catch page`,
    component: function() {
      return import(`../views/404.vue`);
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
