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
  props: {
    nameProp: String,
    descriptionProp: String,
    recipeProp: String,
    durationProp: Number,
  },
  data() {
    return {
        name: this.nameProp ? this.nameProp : null,
        description: this.descriptionProp ? this.descriptionProp : null,
        recipe: this.recipeProp ? this.recipeProp : null,
        duration: this.durationProp ? this.durationProp : 30
    };
  },
  methods: {
    store() {

        const userId = 1; // Todo dynamicly load it

        const payload = {
            name: this.name,
            description: this.description,
            recipe: this.recipe,
            duration: this.duration
        }

        recipesApi.create(userId, payload);
    }
  }
}
</script>