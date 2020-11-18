<template>
  <div class="home">
    <button @click="api()"> TEST API </button>
    <br>
    <br>
    {{ this.user }}

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