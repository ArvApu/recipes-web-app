<template>
    <div>
        Comment create
    </div>
</template>

<script>
import ApiFactory from '@/api/api.factory'

const commentsApi = ApiFactory.get('comments');

export default {
  name: 'Comment',
  props: {
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
        commentsApi.store();
    },
  }
}
</script>