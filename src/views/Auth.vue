<script>
import AuthService from '@/services/auth.service.js'

export default {
  created() {
    AuthService.getToken();
    this.$router.push('/');
  }
}
</script>
