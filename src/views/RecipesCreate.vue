<template>
    <div class='recipe-create'>
        <form id="recipe-form">

            <p>
                <label for="name"> Name </label>
                <input type="text" id="name" name="name" v-model="name" requried>
            </p>

            <p>
                <label for="description"> Description</label>
                <textarea id="description" name="description" v-model="description" requried/>
            </p>

            <p>
                <label for="recipe"> Recipe </label>
                <textarea id="recipe" name="recipe" v-model="recipe" requried/>
            </p>

            <p>
                <label for="duration"> Duration </label>
                <input type="range" min="10" max="180" value="this.duration" class="slider" id="duration" name="duration" v-model="duration" requried> {{ this.duration }} (minutes)
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