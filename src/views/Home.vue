<template>
  <div class="home">
    <button @click="api()"> TEST API </button>
    <button @click="login()"> LOGIN </button>
    
    <br>
    <br>
    <br>
    <br>
    {{ this.user }}

    SOME FAKING TEXT

  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/auth.service.js'
import axios from 'axios';

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
    api() {
      axios.get('http://localhost:8001/user', {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
      }).then((response) => {
        this.user = response.data; 
        console.log(this.user);
      })
    }
  }
}
</script>
