<template>
  <div v-if="event">
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link> |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link> |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['id'],
  created() {
    //fetch event by id and set local data
    // this.$store.dispatch('event/fetchEvent', this.id)
    console.log('Event ID' + this.id + 'to be fetched...')
    this.fetchEvent(this.id).catch((e) => {
      console.log('this: ' + e)
    })

    // this.$router.push({
    //   name: '404Resource',
    //   params: { resource: 'event' },
    // })
  },
  computed: mapState({
    event: (state) => state.event.event,
  }),
  methods: mapActions('event', ['fetchEvent']),
}
</script>
