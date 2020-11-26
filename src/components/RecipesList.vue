<template>
  <div class="recipes">
      
        <div class="recipe" v-for="recipe in this.recipes" v-bind:key="recipe.id" @click="goToRecipe(recipe.user_id, recipe.id)"> 
        
            <img class='image' :src='recipe.picture' >

            <div class='information'> 
                <span class='title'> {{ recipe.name }} </span>
                <div class='meta'>
                    <span> {{ formatCompat(recipe.created_at) }} </span>  
                    <span> {{ recipe.duration }} min </span>
                </div>
            </div>

        </div>
  </div>
</template>

<script>

export default {
  name: 'RecipesList',
  props: {
    recipes: Array,
  },
  methods: {
    formatCompat(date) {
        date = new Date(date);
        var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return date.getDate() + ' ' + ms[date.getMonth()] + ' ' + date.getFullYear();
    },
    goToRecipe(userId, id) {
      this.$router.push({name:'Recipe', params:{user_id:userId, id:id}});
    }
  }
}
</script>