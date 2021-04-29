<template>
  <h1>Events for {{ user.user.name }}</h1>
  <div class="events">
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <div class="pagination">
      <template v-if="page != 1">
        <router-link
          id="page-prev"
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          >&#60; Previous</router-link
        >
      </template>
      <router-link
        id="page-next"
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
import { mapState, mapActions } from 'vuex'
// import { nextTick } from 'vue'
import store from '@/store/index.js'
// import { watchEffect } from 'vue'
import NProgress from 'nprogress'
// import { nextTick } from 'vue'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard,
  },
  created() {
    this.perPage = 3
    //  NProgress.start()
    //   this.fetch().then(()=>{
    //     nextTick()
    //   }).catch(e=>{
    //     console.log('E:' + e)
    //   }).finally(()=>{
    //     NProgress.done()
    //   })
   
    // watchEffect(() => {
    //   this.events = null
    //   this.perPage = 3
    //   this.$store.dispatch('event/fetchEvents', {
    //     perPage: this.perPage,
    //     page: this.page,
    //   })
    // })
  },
  methods: {//Alternate solution because I can't seem to find a way to use vue router Router Guards to work
    async fetch(routeTo){
      await this.$store.dispatch('event/fetchEvents', {
        perPage: this.perPage,
        page: parseInt(routeTo.query.page) || 1,
      })
    }
  },
   beforeRouteUpdate(routeTo){
    console.log('attempting: '+ this.perPage)
     NProgress.start()
    store.dispatch('event/fetchEvents', {
      perPage:3,
      page: parseInt(routeTo.query.page) || 1,
    }).then(()=>{
      console.log('then entered')
    }).catch(() => {
      console.log('error detected')
      this.$router.push({name: 'NetworkError'}) //can't seem to make return {name: 'NetworkError'} to work properly
    }).finally(()=>{
      // NProgress.done()
    })
   },
  beforeRouteEnter(routeTo, routeFrom, next){ //A little workaround is to use async on fetchEvents inside vuex store under event.js
    // console.log('attempting: '+ this.perPage)
     NProgress.start()
   store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: parseInt(routeTo.query.page) || 1,
    }).then((response)=>{
      console.log('then detected:'+ response)
      next()
    }).catch(() => {
      console.log('error detected')
      next({name: 'NetworkError'})
    }).finally(()=>{
      console.log('done')
      // NProgress.done()
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
    ...mapActions('event',['fetchEvents'])
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
  margin:10px;
 
}

#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
