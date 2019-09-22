/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/invented',
      name: 'invented',
      component: () => import('./views/invented')
    },
    {
      path: '/undo',
      name: 'undo',
      component: () => import('./views/undo')
    }
  ]
})
