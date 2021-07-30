import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import allBooksIndex from '../components/AllBooks/AllBooksIndex'
import searchIndex from "../components/Search/SearchIndex" 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/allBooks',
    name: 'All Books',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../components/AllBooks/allBooks-index.vue')
    component: allBooksIndex
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../components/AllBooks/allBooks-index.vue')
    component: searchIndex
  }
]

const router = new VueRouter({
  routes
})

export default router
