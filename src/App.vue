<template>
  <div id="app">

    <!-- HEADER -->
    <header id="header">     
      <button @click="login()"> LOGIN </button>
      <button @click="login()"> LOGOUT </button>
    </header>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu">
        <NavLinks/>
      </nav>

      <div id="content">
        <router-view/>
      </div>
      
    </div>

    <!-- FOOTER -->
    <footer id="footer"> 
      META INFO HERE  
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/auth.service.js'
import NavLinks from '@/components/NavLinks.vue'

export default {
  name: 'App',
  components: {
    NavLinks,
  },
  methods: {
    login() {
      AuthService.login();
    }
  }
}
</script>

<style>
  @import './assets/css/main.css';
  /* Can add style here or in main.css file */
</style>
