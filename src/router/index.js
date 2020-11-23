import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'
import Recipes from '../views/Recipes.vue'
import Recipe from '../views/Recipe.vue'
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
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/user/:user_id/recipes/:id',
    name: 'Recipe',
    component: Recipe
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
