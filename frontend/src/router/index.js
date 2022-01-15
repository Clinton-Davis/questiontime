import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/question/:slug",
    name: "question",
    // route level code-splitting
    // this generates a separate chunk (questiontime.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Question.vue"),
    props: true,
  },
  {
    path: "/ask/:slug?", // '?' Make the slug optional
    name: "question-editor",
    component: () =>
      import(
        /* webpackChunkName: "question-editor" */ "../views/QuestionEditor.vue"
      ),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
