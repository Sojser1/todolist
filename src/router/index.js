import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Reg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: List,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/reg',
    component: Registration,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
