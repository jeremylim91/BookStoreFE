import Vue from 'vue'
import VueRouter from 'vue-router'
// import {createWebHistory} from "vue-router"
// import Home from '../views/Home.vue'
import allBooksIndex from '../components/AllBooks/AllBooksIndex'
import searchIndex from "../components/Search/SearchIndex" 
import createBookIndex from "../components/CreateBook/CreateBookIndex"
import notFound from "../views/NotFound.vue"



Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: allBooksIndex
  // },
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
    alias: '/',
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
  },
  {
    path: '/createBooks',
    name: 'Create Book',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../components/AllBooks/allBooks-index.vue')
    component: createBookIndex
  },
  {
    path: '*',
    name: 'Not Found',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../components/AllBooks/allBooks-index.vue')
    component: notFound
  },
  
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router
