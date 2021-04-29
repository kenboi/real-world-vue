<template>
  <div v-if="event">
    <p>Edit Component</p>
  </div>
</template>

<script>
//Previous Script Code for Vuex has been moved to Layout.vue

export default {
  props: ['event'],
}
</script>
