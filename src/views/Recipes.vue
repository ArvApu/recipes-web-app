<template>
    <RecipesList :recipes="this.recipes"/>
</template>

<script>
import RecipesList from '@/components/RecipesList.vue'

export default {
  name: 'Recipes',
  components: {
      RecipesList
  },
  data() {
    return {
      recipes: [
        {        
            "id": 1,
            "user_id": 1,
            "name": "Turkey on the rocks",
            "description": "Some good ol fashion turkey on the rocks",
            "recipe": "You will ned some turkey and some rocks. Put turkey on the rocks and volia.",
            "created_at": "2020-10-22T16:39:33.000000Z",
            "updated_at": "2020-10-22T16:39:33.000000Z"
        },   
      ]
    };
  },
  methods: {
    formatCompat(date) {
        date = new Date(date);
        var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return date.getDate() + ' ' + ms[date.getMonth()] + ' ' + date.getFullYear();
    }
  }
}
</script>