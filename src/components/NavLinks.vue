<template>
    <ul>

        <li>
          <router-link :to="{ path: 'feed' }" exact-active-class="side-panel-exact-active" > Feed </router-link>
        </li>
        <li v-if="isAdmin">
          <router-link :to="{ path: 'users' }" exact-active-class="side-panel-exact-active" > Users </router-link>
        </li>
        <li>
          <router-link :to="{ path: 'recipes' }" exact-active-class="side-panel-exact-active" > My Recipes </router-link>
        </li>
        <li>
          <router-link :to="{ path: 'comments' }" exact-active-class="side-panel-exact-active" > My Comments </router-link>
        </li>
    </ul>
</template>

<script>
import AuthService from '@/services/auth.service.js';

export default {
  name: 'NavLinks',
  data() {
    return {
      isAdmin: AuthService.getUser().then( (user) => this.isAdmin = user.role_id == 'admin'),
    }
  }
}
</script>
