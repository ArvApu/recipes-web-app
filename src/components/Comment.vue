<template>
  <div class='comment-create'>
        <form id="comment-form" @submit.prevent="handle">

           <Alerts :errors="errors"/>

            <p class='form-group'>
                <label for="title"> Title </label>
                <input class='form-input' type="text" id="title" name="title" v-model="data.title" requried>
            </p>

            <p class='form-group'>
                <label for="comment"> Comment</label>
                <textarea class='form-input-textarea' id="comment" name="comment" v-model="data.comment" requried/>
            </p>

            <p class='form-group'>
                <input class='form-input btn btn-primary' type="submit" id="add-comment" name="add-comment" value="Submit" requried> 
            </p>

        </form>
    </div>
</template>

<script>
import Alerts from './Alerts.vue'
import ApiFactory from '@/api/api.factory'

const commentsApi = ApiFactory.get('comments');

export default {
  name: 'Comment',
  components: {
      Alerts
  },
  props: {
    recipeUserId: Number,
    recipeId: Number,
    title: String,
    comment: String,
    commentId: Number,
  },
  data() {
    return {
      data: {
        title: this.title ? this.title : null,
        comment: this.comment ? this.comment : null,
      },
      shouldEdit: this.commentId ? true : false,
      errors: [],
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
        commentsApi.create(this.recipeUserId, this.recipeId, this.data)
        .then(() => {
            this.$emit('created');
            this.onSuccess();
        })
        .catch((errors) => {
            this.onError(errors);
        });
    },
    edit() {
        commentsApi.update(this.recipeUserId, this.recipeId, this.commentId, this.data)
        .then(() => {
            this.$emit('updated');
            this.onSuccess();
        })
        .catch((errors) => {
            this.onError(errors);
        });
    },
    onSuccess() {
        this.errors = [];
    },
    onError(errors) {
        this.errors = errors;
    }
  }
}
</script>