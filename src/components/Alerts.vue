<template>

  <div>
    <ul v-if="errors && errors.length > 0" class="list-unstyled alert alert-danger" role="alert">
        <li v-for="error of errors" v-bind:key="error">
            {{error}}
        </li>
    </ul>

    <ul v-if="alerts && alerts.length > 0" class="list-unstyled alert alert-success" role="alert">
        <li v-for="alert of alerts" v-bind:key="alert">
            {{alert}}
        </li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'Alerts',
  props: {
    errors: Array,
    alerts: Array,
  },
}
</script>

<style scoped>
/* Add styles for component here*/
</style>