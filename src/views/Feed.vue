<template>
  <div class="recipes">
      
        <div class="recipe" v-for="recipe in this.recipes"  v-bind:key="recipe.id"> 
        
            <img class='image' src='https://ciao.lt/wp-content/uploads/2018/12/burger.jpeg' >

            <div class='information'> 
                <span class='title'> {{ recipe.name }} </span>
                <div class='meta'>
                    <span> {{ formatCompat(recipe.created_at) }} </span>  
                    <span> 60min </span>
                </div>
            </div>

        </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
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
        {        
            "id": 2,
            "user_id": 1,
            "name": "Turkey on the rocks",
            "description": "Some good ol fashion turkey on the rocks",
            "recipe": "You will ned some turkey and some rocks. Put turkey on the rocks and volia.",
            "created_at": "2020-10-22T16:39:33.000000Z",
            "updated_at": "2020-10-22T16:39:33.000000Z"
        },
            {        
            "id": 3,
            "user_id": 2,
            "name": "Turkey on the rocks",
            "description": "Some good ol fashion turkey on the rocks",
            "recipe": "You will ned some turkey and some rocks. Put turkey on the rocks and volia.",
            "created_at": "2020-10-22T16:39:33.000000Z",
            "updated_at": "2020-10-22T16:39:33.000000Z"
        },
        {        
            "id": 4,
            "user_id": 2,
            "name": "Turkey on the rocks",
            "description": "Some good ol fashion turkey on the rocks",
            "recipe": "You will ned some turkey and some rocks. Put turkey on the rocks and volia.",
            "created_at": "2020-10-22T16:39:33.000000Z",
            "updated_at": "2020-10-22T16:39:33.000000Z"
        },
        {        
            "id": 5,
            "user_id": 2,
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