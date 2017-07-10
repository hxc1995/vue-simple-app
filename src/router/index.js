import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'
import Doexam from '../views/doexam.vue'
import Result from '../views/result.vue'

Vue.use(Router)

export default new Router({

  routes: [
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      name: 'doexam',
      path: '/doexam/:grade',
      component: Doexam
    },
    {
      name: 'result',
      path: '/result',
      component: Result
    },
    {
       path:'*', redirect: '/home'
     }
  ]
})
