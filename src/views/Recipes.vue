<template>
    <RecipesList :recipes="this.recipes"/>
</template>

<script>
import ApiFactory from '@/api/api.factory'
import RecipesList from '@/components/RecipesList.vue'
import SessionService from '@/services/session.service.js'

const recipesApi = ApiFactory.get('recipes');

export default {
  name: 'Recipes',
  components: {
      RecipesList
  },
  data() {
    return {
      recipes: [],
    }
  },
  methods: {
    formatCompat(date) {
        date = new Date(date);
        var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return date.getDate() + ' ' + ms[date.getMonth()] + ' ' + date.getFullYear();
    }
  },
  created() {
    const user = SessionService.getUser();
    recipesApi.all(user.id).then((recipes) => {
      this.recipes = recipes.data
    });
  }
}
</script>