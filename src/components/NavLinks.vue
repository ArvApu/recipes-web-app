<template>
    <ul>
        <li>
          <router-link :to="{ path: '/feed' }" exact-active-class="side-panel-exact-active" > Feed </router-link>
        </li>
        <li v-if="this.isAdmin">
          <router-link :to="{ path: '/users' }" exact-active-class="side-panel-exact-active" > Users </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/recipes-create' }" exact-active-class="side-panel-exact-active" > Add Recipe </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/recipes' }" exact-active-class="side-panel-exact-active" > My Recipes </router-link>
        </li>
    </ul>
</template>

<script>
import SessionService from '@/services/session.service.js';

export default {
  name: 'NavLinks',
  data() {
    return {
      isAdmin: SessionService.isAuthenticated() ? SessionService.getUser().role_id === 'admin' : false,
    }
  }
}
</script>
