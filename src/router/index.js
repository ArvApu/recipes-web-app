import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'
import Recipes from '../views/Recipes.vue'
import Comments from '../views/Comments.vue'
import RecipesCreate from '../views/RecipesCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/comments',
    name: 'Comments',
    component: Comments
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/recipes-create',
    name: 'RecipesCreate',
    component: RecipesCreate
  },
  {
    path: '/auth/callback',
    name: 'Auth',
    component: () => import('../views/Auth.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
