<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>@ {{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <p>Organizer: {{ event.organizer ? event.organizer.name : '' }}</p>
    <p>Attendees:</p>
    <span class="badge -fill-gradient">{{
      event.attendees ? event.attendees.length : 0
    }}</span>
  </div>
</template>

<script>
//Previous Script Code for Vuex has been moved to Layout.vue
export default {
  props: ['event'],
}
</script>
