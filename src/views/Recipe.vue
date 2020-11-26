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
                        <b>Author:</b> {{ this.recipe.author }} 
                    </span>
                    <span> 
                        <b>Duration:</b> {{ this.recipe.duration }} 
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

        <div class='recipe-control' v-if="canControl(this.recipe)">
            <button class='btn btn-secondary' @click="showEdit()"> Edit </button>
            <button class='btn btn-danger' @click="showDelete()"> Delete </button>
        </div>
        
        <div class='comments'> 
            <div class="comments-section-name">
                <h2>Comments</h2>
                <button class='btn btn-primary' @click="show()">Comment this recipe</button>
            </div>

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

                <div class='comment-control' v-if="canControl(comment)">
                    <button class='btn btn-secondary' @click="showCommentEdit(comment)"> Edit </button>
                    <button class='btn btn-danger' @click="deleteComment(comment.id)"> Delete </button>
                </div>
            </div>

        </div>

        <!-- MODALS -->
        <v-dialog />

        <modal class="force-scroll-modal" name="comment-creation-modal" :width=800 :adaptive=true :scrollable=true>
            <Comment @created="loadComments(); hide();" :recipeId="this.recipe.id" :recipeUserId="this.recipe.user_id"/>
        </modal>

        <modal class="force-scroll-modal" name="recipe-edit-modal" :width=800 :height=500 :adaptive=true :scrollable=true>
            <div class='recipe-edit'>
                <RecipEdit @updated="hideEdit()"
                    :recipeId="this.recipe.id"
                    :name="this.recipe.name"
                    :description="this.recipe.description"
                    :recipe="this.recipe.recipe"
                    :duration="this.recipe.duration"
                />
            </div>
        </modal>

        <modal class="force-scroll-modal" name="comment-edit-modal" :width=800 :adaptive=true :scrollable=true>
            <div class='recipe-edit'>
                <Comment @updated="hideCommentEdit()"
                    :title="this.currentComment.title"
                    :comment="this.currentComment.comment"
                    :commentId="this.currentComment.id"
                    :recipeId="this.recipe.id" 
                    :recipeUserId="this.recipe.user_id"
                />
            </div>
        </modal>
    </div>
</template>

<script>
import moment from 'moment';
import Comment from '@/components/Comment.vue'
import RecipEdit from '@/components/Recipe.vue'
import ApiFactory from '@/api/api.factory'
import SessionService from '@/services/session.service.js'

const recipesApi  = ApiFactory.get('recipes');
const commentsApi = ApiFactory.get('comments');

export default {
  name: 'Recipe',
  components: {
      Comment,
      RecipEdit
  },
  data() {
    return {
      id: this.$route.params.id,
      currentComment: {
          id: null,
          title: null,
          comment: null,
      },
      recipe: {},
      comments: []   
    };
  },
  methods: {
    canControl(item) {
        return item.user_id == SessionService.getUser().id;
    },
    formatDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:MM:SS')
    },
    formatDate(date) {
        return moment(date).format('YYYY-MM-DD')
    },
    show () {
        this.$modal.show('comment-creation-modal');
    },
    hide () {
        this.$modal.hide('comment-creation-modal');
    },
    showDelete () {
        this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'Are you sure you want to delete this recipe?',
        buttons: [
            {
                title: 'Do It',
                handler: () => {
                    this.$modal.hide('dialog'); 
                    recipesApi.delete(this.recipe.user_id, this.recipe.id);
                    this.$router.back();
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
    },
    showEdit () {
        this.$modal.show('recipe-edit-modal');
    },
    hideEdit () {
        this.loadRecipe();
        this.$modal.hide('recipe-edit-modal');
    },
    showCommentEdit(comment) {
        this.currentComment.id = comment.id;
        this.currentComment.title = comment.title;
        this.currentComment.comment = comment.comment;
        this.$modal.show('comment-edit-modal');
    },
    hideCommentEdit () {
        this.$modal.hide('comment-edit-modal');
        this.loadComments();
    },
    deleteComment(commentId) {
        const userId   = this.$route.params.user_id; 
        const recipeId = this.$route.params.id; 

        commentsApi.delete(userId, recipeId, commentId).then(() => {
          this.loadComments();
        });
    },
    loadComments() {
      const userId   = this.$route.params.user_id; 
      const recipeId = this.$route.params.id; 

      commentsApi.all(userId, recipeId).then((comments) => {
          this.comments = comments.data;
      });
    },
    loadRecipe() {
      const userId   = this.$route.params.user_id; 
      const recipeId = this.$route.params.id; 

      recipesApi.get(userId, recipeId).then((recipe) => {
          this.recipe = recipe.data;
      });
    }
  },
  created() {
      this.loadRecipe();
      this.loadComments();
  }
}
</script>