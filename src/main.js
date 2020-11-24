import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import AuthService from '@/services/auth.service.js'

Vue.config.productionTip = false

Vue.use(VModal, { dialog: true })

AuthService.getUser();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
