import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  parseQuery,
  stringifyQuery,
} from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
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
    component: () =>
      import(/* webpackChunkName: "about" */ `../views/About.vue`),
  },
];

// https://router.vuejs.org/guide/advanced/scroll-behavior.html
// TODO fix any
function scrollBehavior(to: any, from: any, savedPosition: any) {
  if (savedPosition && to.hash !== from.hash) {
    return savedPosition;
  }
  if (to.hash) {
    const item = document.querySelector(`a.anchor[href="${to.hash}"]`);
    if (item) {
      item.scrollIntoView({ behavior: `smooth` });
    }
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

export default router;
