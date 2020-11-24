<script>
import AuthService from '@/services/auth.service.js'

export default {
  async created() {
    await AuthService.getToken();
    await AuthService.getUser();
    window.location.replace(`${process.env.VUE_APP_BASE_URL}/feed`);
  }
}
</script>
