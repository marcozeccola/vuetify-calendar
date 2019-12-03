import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Calendar from '../components/Calendar'
import Login from '../components/Login'
import SignUp from '../components/Signup'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

//auto skip-login (non in caso di logout)

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('calendar')
  else next()
})

export default router