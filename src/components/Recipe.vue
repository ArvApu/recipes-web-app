<template>
    <form id="recipe-form" @submit.prevent="handle">
        <p class='form-group'>
            <label for="name"> Name </label>
            <input class='form-input' type="text" id="name" name="name" v-model="data.name" requried>
        </p>

        <p class='form-group'>
            <label for="description"> Description</label>
            <textarea class='form-input-textarea' id="description" name="description" v-model="data.description" requried/>
        </p>

        <p class='form-group'>
            <label for="recipe"> Recipe </label>
            <textarea class='form-input-textarea' id="recipe" name="recipe" v-model="data.recipe" requried/>
        </p>

        <p class='form-group'>
            <label for="duration"> Duration {{ this.data.duration }} (minutes) </label>
            <input class='form-input slider' type="range" min="10" max="180" value="this.data.duration" id="duration" name="duration" v-model="data.duration" requried>
        </p>

        <p class='form-group'>
            <input class='form-input btn btn-primary' type="submit" id="add-recipe" name="add-recipe" value="Submit" requried> 
        </p>

    </form>
</template>

<script>
import ApiFactory from '@/api/api.factory'
import SessionService from '@/services/session.service.js'

const recipesApi = ApiFactory.get('recipes');

export default {
  name: 'RecipesCreate',
  props: {
    recipeId: Number,
    name: String,
    description: String,
    recipe: String,
    duration: Number,
  },
  data() {
    return {
        data: {
            name: this.name ? this.name : null,
            description: this.description ? this.description : null,
            recipe: this.recipe ? this.recipe : null,
            duration: this.duration ? this.duration : 30
        },
        shouldEdit: this.recipeId ? true : false,
    };
  },
  methods: {
    handle() {
        const userId = SessionService.getUser().id;
        if(this.shouldEdit) {
            this.edit(userId);
        } else {
            this.store(userId);
        }
    },
    store(userId) {
        recipesApi.create(userId, this.data);
        this.$emit('created');
        this.data = {
            name: null,
            description: null,
            recipe: null,
            duration: 30
        }
    },
    edit(userId) {
        recipesApi.update(userId, this.recipeId, this.data);
        this.$emit('updated');
    }
  }
}
</script>