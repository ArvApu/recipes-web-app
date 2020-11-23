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
                <button class='btn btn-danger' @click="show()"> Delete </button>
            </div>
        </div>

        <v-dialog />
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Users',
  data() {
    return {
      users: [
          {
              id: 1,
              username: "123456789012345678901234567890123456789012345678901234567890",
              role_id: 'user',
              email: "1234567890123456789012345678901234567890123456789012345678901234567890@mail.com",
              last_login_at: "2020-10-22T16:39:33.000000Z",
          },
          {
              id: 2,
              username: "mario",
              role_id: 'admin',
              email: "mario@mail.com",
              last_login_at: "2020-10-22T16:39:33.000000Z",
          },
          {
              id: 3,
              username: "luigy",
              role_id: 'user',
              email: "luigy@mail.com",
              last_login_at: "2020-10-22T16:39:33.000000Z",
          }
      ],
    };
  },
  methods: {
    login() {
      console.log('hey');
    },
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
  }
}
</script>