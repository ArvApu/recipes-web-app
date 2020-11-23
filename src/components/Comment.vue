<template>
  <div class='comment-create'>
        <form id="comment-form" @submit.prevent="store">
            <p class='form-group'>
                <label for="title"> Title </label>
                <input class='form-input' type="text" id="title" name="title" v-model="title" requried>
            </p>

            <p class='form-group'>
                <label for="comment"> Description</label>
                <textarea class='form-input-textarea' id="comment" name="comment" v-model="comment" requried/>
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
        title: null,
        comment: null,
    };
  },
  methods: {
    store() {

        const payload = {
            title: this.title,
            comment: this.comment,
        }

        commentsApi.create(this.recipeUserId, this.recipeId, payload);
        this.$emit('created');
    },
  }
}
</script>