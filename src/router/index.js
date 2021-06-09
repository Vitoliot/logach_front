import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import register from '@/views/register'
import theory from '@/views/theory'
import practice from '@/views/practice'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/log',
    component: login
  },
  {
    path: '/reg',
    component: register
  },
  {
    path: '/theory',
    component: theory
  },
  {
    path: '/practice',
    component: practice
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
})

export default router