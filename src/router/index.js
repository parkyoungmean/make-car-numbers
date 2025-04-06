import { createRouter, createWebHistory } from 'vue-router'
import MainComp from '../views/MainComp.vue'
import NumberInsert from '../views/NumberInsert.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainComp
  },
  {
    path: '/numberinsert',
    name: 'NumberInsert',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "numberinsert" */ '../views/NumberInsert.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
