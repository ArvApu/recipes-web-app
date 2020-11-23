<template>
    <div class='recipe-create'>
      <Recipe/>
    </div>
</template>

<script>
import Recipe from '@/components/Recipe.vue'

export default {
    name: 'RecipesCreate',
    components: {
      Recipe
    },
}
</script>