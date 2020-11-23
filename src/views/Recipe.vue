<template>
     <div id="recipe-view">
         
         <div class='recipe-data'>
            <div class="image-block">
                <img class='image' src='https://ciao.lt/wp-content/uploads/2018/12/burger.jpeg' >
            </div>

            <div class="content-block">

                <div class="content"> 
                    <h2> {{ this.recipe.name }} </h2>

                    <p> {{ this.recipe.description }} </p>

                    <h4>How to make it:</h4>

                    <p> {{ this.recipe.recipe }} </p>

                </div>

                <div class='meta'>
                    <span> 
                        <b>Author:</b> {{ this.user.username }} 
                    </span>

                    <span>
                        <b>Created:</b> {{ formatDateTime(this.recipe.created_at) }}
                    </span>

                    <span> 
                        <b>Last update:</b> {{ formatDateTime(this.recipe.updated_at) }}
                    </span>
                    
                </div>
            </div>
         </div>

        <div class='recipe-control'>
            <button class='btn btn-secondary'> Edit </button>
            <button class='btn btn-danger' @click="showDelete('recipe')"> Delete </button>
        </div>
        
        <div class='comments'> 
            <h2> Comments </h2>

            <div class="comment" v-for="comment in this.comments"  v-bind:key="comment.id">
                <div class="comment-meta">
                    <h3> {{comment.title}}</h3>
                    <span class='comment-information'> 
                        <b> author: </b> {{comment.author}} <b> created: </b> {{formatDate(comment.created_at) }}
                    </span>
                </div>
                
                <div class="comment-content">
                    {{comment.comment}}
                </div>
            </div>

        </div>

        <!-- MODALS -->
        <v-dialog />

    </div>
</template>

<script>

import moment from 'moment';

export default {
  name: 'Recipe',
  data() {
    return {
      id: this.$route.params.id,
      user: {
          username: "usernamexxusernamexxusernamexxusernamexxusernamexxusernamexx"
      },
      recipe: {        
            "id": 1,
            "user_id": 1,
            "name": "Turkey on the rocks",
            "description": "One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked ",
            "duration": 60,
            "recipe": "One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked ",
            "created_at": "2020-10-22T16:39:33.000000Z",
            "updated_at": "2020-10-22T16:39:33.000000Z"
        },
        comments: [
            {
                "id": 1,
                "title": "VeryLongLongLongLongLongTitle For this",
                "author": 'usernamexxusernamexxusernamexxusernamexx',
                "comment": "One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked",
                "created_at": "2020-10-22T16:39:33.000000Z"
            },
            {
                "id": 2,
                "title": "Superb dish",
                "author": 'Jonelisxxxxx',
                "comment": "Easy to mak and tasty.",
                "created_at": "2020-10-22T16:39:33.000000Z"
            },
            {
                "id": 3,
                "title": "Superb dish",
                "author": 'Jonelisxxxxx',
                "comment": "Easy to mak and tasty.",
                "created_at": "2020-10-22T16:39:33.000000Z"
            },
        ]   
    };
  },
  methods: {
    formatDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:MM:SS')
    },
    formatDate(date) {
        return moment(date).format('YYYY-MM-DD')
    },
    showDelete (item) {
        this.$modal.show('dialog', {
        title: 'WARNING',
        text: `Are you sure you want to delete this ${item}?` ,
        buttons: [
            {
                title: 'Do It',
                handler: () => {
                    alert('Recipe deleted')
                    this.$modal.hide('dialog');
                }

            },
            {
                title: 'Cancel',
                handler: () => {
                    this.$modal.hide('dialog');
                }
            },
        ]
        })
    },
    hideDelete () {
        this.$modal.hide('dialog');
    }
  }
}
</script>