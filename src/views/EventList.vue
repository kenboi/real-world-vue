<template>
  <h1>Events for {{ user.user.name }}</h1>
  <div class="events">
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'EventList', query: { page: page - 1}}" rel = "prev">Prev Page</router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link v-if="hasNextPage" :to="{ name: 'EventList', query: { page: page + 1}}"> Next Page </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import  { mapState } from 'vuex'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  created() {
    this.perPage = 3,
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed: {
    page() {
      console.log(this.$route.query.page)
      console.log('query page: '+this.$route.query.page)
      console.log(this.event.events)
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['event','user']),
    }
}
</script>

<style scope>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
