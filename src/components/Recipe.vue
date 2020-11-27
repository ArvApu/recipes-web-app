<template>
    <form id="recipe-form" @submit.prevent="handle">

        <Alerts :errors="errors" :alerts="alerts"/>

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
            <label for="picture"> Picture </label>
            <input type="file" id="picture" name="picture" ref="file" v-on:change="onChangeFileUpload()"/>        
        </p>

        <p class='form-group'>
            <input class='form-input btn btn-primary' type="submit" id="add-recipe" name="add-recipe" value="Submit" requried> 
        </p>

    </form>
</template>

<script>
import Alerts from './Alerts.vue'
import ApiFactory from '@/api/api.factory'
import SessionService from '@/services/session.service.js'

const recipesApi = ApiFactory.get('recipes');

export default {
  name: 'RecipesCreate',
  components: {
      Alerts
  },
  props: {
    recipeId: Number,
    userId: Number,
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
        picture: null,
        errors: [],
        alerts: [],
    };
  },
  methods: {
    handle() {
        const userId = this.userId == null ? SessionService.getUser().id : this.userId;
        if(this.shouldEdit) {
            this.edit(userId);
        } else {
            this.store(userId);
        }
    },
    store(userId) {
        recipesApi.create(userId, this.getFormatedData())
        .then(() => {
            this.$emit('created');
            this.onSuccess('Recipe added.');
        })
        .catch((errors) => {
            this.onError(errors);
        });
    },
    edit(userId) {
        recipesApi.update(userId, this.recipeId, this.getFormatedData())
        .then(() => {
            this.$emit('updated');
            this.onSuccess('Recipe updated.');
        })
        .catch((errors) => {
            this.onError(errors);
        });
    },
    onSuccess(alert) {
        this.data = {
            name: null,
            description: null,
            recipe: null,
            duration: 30
        }
        this.picture = null;
        this.errors = [];
        this.alerts = [alert];
    },
    onError(errors) {
        this.alerts = [];
        this.errors = errors;
    },
    onChangeFileUpload(){
        this.picture = this.$refs.file.files[0];
    },
    getFormatedData() {
        let formData = new FormData();
        
        for (var key in this.data) {
            if(this.data[key] == null) {
                continue;
            }
            formData.append(key, this.data[key]);
        }

        if(this.picture != null) {
          formData.append('picture', this.picture);
        }

        return formData;
    }
  }
}
</script>