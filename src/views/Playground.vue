<template>
  <h1>Create Event/s, {{ user.name }}</h1>
  <p>This event is craeted by {{ user.name }}</p>
  <p>No. of Categories: {{ catLength }}</p>
  <!-- <p>Getter Title: {{ getEventById(1).title }}</p>
  <p>Getter Organizer: {{ getEventById(1).organizer }}</p> -->
  <p>{{ this.$store.state.count }}</p>
  <button @click="incrementCount">Increment</button>
  <input type="number" v-model.number="incrementBy" />
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      incrementBy: 1,
    }
  },
  computed: {
    catLength() {
      return this.$store.getters.catLength
    },
    localComputed() {
      return 'something'
    },
    ...mapGetters(['getEventById']),
    // getEvent() {
    //   return this.$store.getters.getEventById
    // },

    ...mapState(['categories', 'user']), //<-- shortcut to code snippet below
  },
  methods: {
    incrementCount() {
      //this.$store.commit('INCREMENT_COUNT', this.incrementBy)
      this.$store.dispatch('updateCount', this.increment)
    },
  },

  /**
   *computed: mapState({
    userName: (state) => state.user.name,
    categories: 'categories', // <-- simplified syntax for top-level states
    }),

    //e.g <p>This event is craeted by {{ userName }}</p>
   */
}
</script>
