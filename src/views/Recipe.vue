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
                        <b>Created:</b> {{ formatDate(this.recipe.created_at) }}
                    </span>

                    <span> 
                        <b>Last update:</b> {{ formatDate(this.recipe.updated_at) }}
                    </span>
                    
                    
                </div>
            </div>
         </div>

        <div class='recipe-control'>
            <button class='btn btn-secondary'> Edit </button>
            <button class='btn btn-danger'> Delete </button>
        </div>

        <div class='comments'>

        </div>
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
    };
  },
  methods: {
    formatDate(date) {
        return moment(date).format('YYYY-MM-DD HH:MM:SS')
    }
  }
}
</script>