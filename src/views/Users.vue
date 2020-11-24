<template>
  <div class="users">
        <div class="user" v-for="user in this.users"  v-bind:key="user.id">
            <div class="user-content">
                <span><b>Username:</b> {{user.username}}</span>
                <span><b>Email:</b> {{user.email}}</span>
                <span><b>Role:</b> {{user.role_id}}</span>
                <span><b>Last login at:</b> {{ formatDateTime(user.last_login_at) }}</span>
            </div>

            <div class='user-control'>
                <button v-if="user.role_id === 'user'" class='btn btn-danger' @click="show()"> Delete </button>
            </div>
        </div>

        <v-dialog />
  </div>
</template>

<script>
import moment from 'moment';
import ApiFactory from '@/api/api.factory'

const usersApi = ApiFactory.get('users');

export default {
  name: 'Users',
  data() {
    return {
      users: [],
    };
  },
  methods: {
    formatDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:MM:SS')
    },
    show () {
        this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'Are you sure you want to delete this user?',
        buttons: [
            {
                title: 'Do It',
                handler: () => {
                    alert('User deleted')
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
    hide () {
        this.$modal.hide('dialog');
    },
  },
  created() {
    usersApi.all().then((users) => {
    this.users = users.data
    });
  }
}
</script>