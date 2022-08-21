import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserActive from '../views/UserActive.vue'
import UserList from '../views/userlist.vue'
import UserLogin from '../views/login.vue'
import UserRegister from '../views/register.vue'
import NotFind from '../views/NotFind.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserList,
  },
  {
    path: '/useractive/:userId/',
    name: 'useractive',
    component: UserActive,
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegister,
  },
  {
    path: '/404',
    name: 'notfind',
    component: NotFind,
  },
  {
    path: '/:catchAll(.*)',
    redirect:"/404",
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
