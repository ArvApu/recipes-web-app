<template>
  <div class='comment-create'>
        <form id="comment-form" @submit.prevent="handle">
            <p class='form-group'>
                <label for="title"> Title </label>
                <input class='form-input' type="text" id="title" name="title" v-model="data.title" requried>
            </p>

            <p class='form-group'>
                <label for="comment"> Description</label>
                <textarea class='form-input-textarea' id="comment" name="comment" v-model="data.comment" requried/>
            </p>

            <p class='form-group'>
                <input class='form-input btn btn-primary' type="submit" id="add-comment" name="add-comment" value="Submit" requried> 
            </p>

        </form>
    </div>
</template>

<script>
import ApiFactory from '@/api/api.factory'

const commentsApi = ApiFactory.get('comments');

export default {
  name: 'Comment',
  props: {
    recipeUserId: Number,
    recipeId: Number,
  },
  data() {
    return {
      data: {
        title: null,
        comment: null,
      },
      shouldEdit: this.commentId ? true : false
    };
  },
  methods: {
    handle() {
        if(this.shouldEdit) {
            this.edit();
        } else {
            this.store();
        }
    },
    store() {
        commentsApi.create(this.recipeUserId, this.recipeId, this.data);
        this.$emit('created');
    },
    edit() {
        commentsApi.update(this.recipeUserId, this.recipeId, this.commentId, this.data);
        this.$emit('updated');
    },
  }
}
</script>