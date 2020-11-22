<template>
    <div class='recipe-create'>
        <form id="recipe-form" @submit.prevent="store">
            <p class='form-group'>
                <label for="name"> Name </label>
                <input class='form-input' type="text" id="name" name="name" v-model="name" requried>
            </p>

            <p class='form-group'>
                <label for="description"> Description</label>
                <textarea class='form-input-textarea' id="description" name="description" v-model="description" requried/>
            </p>

            <p class='form-group'>
                <label for="recipe"> Recipe </label>
                <textarea class='form-input-textarea' id="recipe" name="recipe" v-model="recipe" requried/>
            </p>

            <p class='form-group'>
                <label for="duration"> Duration {{ this.duration }} (minutes) </label>
                <input class='form-input slider' type="range" min="10" max="180" value="this.duration" id="duration" name="duration" v-model="duration" requried>
            </p>

            <p class='form-group'>
                <input class='form-input btn btn-primary' type="submit" id="add-recipe" name="add-recipe" value="Submit" requried> 
            </p>

        </form>
    </div>
</template>

<script>
import ApiFactory from '@/api/api.factory'

const recipesApi = ApiFactory.get('recipes');

export default {
  name: 'RecipesCreate',
  data() {
    return {
        name: null,
        description: null,
        recipe: null,
        duration: 30
    };
  },
  methods: {
    store() {
        recipesApi.create();
    }
  }
}
</script>