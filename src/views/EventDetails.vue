<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>@ {{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <p>Attendees: </p>
    <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
  </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
  props: ['id'],
  created() {
    //fetch event by id and set local data
    this.$store.dispatch('fetchEvent', this.id)
  },
  computed: mapState(['event'])
}
</script>
