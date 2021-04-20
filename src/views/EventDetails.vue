<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>@ {{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <p>Organizer: {{ event.organizer ? event.organizer.name : '' }}</p>
    <p>Attendees: </p>
    <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'

export default {
  props: ['id'],
  created() {
    //fetch event by id and set local data
    // this.$store.dispatch('event/fetchEvent', this.id)
    console.log('Event ID' + this.id + 'to be fetched...')
    this.fetchEvent(this.id)
  },
  computed: mapState({
    event: state => state.event.event
  }),
  methods: mapActions('event', ['fetchEvent'])
}
</script>
