<template>
  <div class="home">

      <h1>Welcome to OhMyRecipies. To Continue please login.</h1>
      <button class='btn btn-secondary' @click="login()"> Login </button>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/auth.service.js'

export default {
  name: 'Home',
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      AuthService.login();
    },
    async api() {
      this.user = await AuthService.getUser();
    }
  }
}
</script>