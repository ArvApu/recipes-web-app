import Vue from 'vue'
import VueRouter from 'vue-router'
import SessionService from '../services/session.service';
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'
import Users from '../views/Users.vue'
import Recipes from '../views/Recipes.vue'
import Recipe from '../views/Recipe.vue'
import RecipesCreate from '../views/RecipesCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { guest: true }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true, adminOnly: true },
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/:user_id/recipes/:id',
    name: 'Recipe',
    component: Recipe,
    meta: { requiresAuth: true },
  },
  {
    path: '/recipes-create',
    name: 'RecipesCreate',
    component: RecipesCreate,
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {

  // Route needs authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Non authorized user - redirect to login
    if (!SessionService.isAuthenticated()) {
      next({path: '/', params: { nextUrl: to.fullPath }})
    } else {

      let user = SessionService.getUser();

      // Check if route is for admin only
      if (to.matched.some(record => record.meta.adminOnly)) {
        if (user.role_id === 'admin') {
          next()
        } else {
          next({ name: 'Feed'})
        }
      } else {
        next()
      }
    }
  }

  // Route is for guest users only
  else if (to.matched.some(record => record.meta.guest)) {
    if (!SessionService.isAuthenticated()) {
      next()
    } else {
      next({ name: 'Feed'})
    }
  }

  // Default behavior
  else {
    next()
  }
})

export default router
