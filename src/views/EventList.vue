<template>
  <h1>Events for {{ user.user.name }}</h1>
  <div class="events">
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <div class="pagination">
      <template v-if="page != 1">
        <router-link
          id = "page-prev"
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          >&#60; Previous</router-link
        >
      </template>
      <router-link
      id = "page-next"
        v-if="hasNextPage"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
      >
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import { watchEffect } from 'vue'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard,
  },
  created() {
    watchEffect(() => {
      this.events = null
      this.perPage = 3
      this.$store.dispatch('event/fetchEvents', {
        perPage: this.perPage,
        page: this.page,
      })
    })
  },
  computed: {
    // page() {
    //   console.log(this.$route.query.page)
    //   console.log('query page: '+this.$route.query.page)
    //   console.log(this.event.events)
    //   return parseInt(this.$route.query.page) || 1
    // },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['event', 'user']),
  },
}
</script>

<style scope>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
