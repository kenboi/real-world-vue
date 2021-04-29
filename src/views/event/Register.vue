<template>
  <div v-if="event">
    <p>Register Component</p>
    <button @click="register">Register Me</button>
  </div>
</template>

<script>
//Previous Script Code for Vuex has been moved to Layout.vue

export default {
  props: ['event'],
  methods: {
    register() {
      //Call to API
      //If registered then redirect to event details
      const notification = {
        type: 'success',
        message: 'Your event has been created! ',
      }
      this.$store.dispatch('notification/add', notification, { root: true })
      this.$router.push({
        //<-- this.$router.push('/about') a simple version
        name: 'EventDetails', // <-- also accepts, query, path and objects
        //params: { id: this.event.id }//Since its nested, we dont need an id
      })
      //this.$router.replace({ name: 'EventDetails', params: {id: 3}}) //<-- To navigate without pusing a histor entry into the browser (disabled back button)
      //This will replace the current page with the EventDetails page
      //Useful for forms that you dont want to back button

      //this.$router.go(1) //<-- Goes forward (Forward Buttton in Browser)
      //this.$router.go(-1) // <-- Goes backward ( Backward Button in Browser)
    },
  },
}
</script>
