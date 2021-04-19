import { createStore, createLogger } from 'vuex'
import EventServices from '../services/EventServices'

export default createStore({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    events: [],
    count: 0,
    eventsTotal: 0,
    event:{}
  },
  getters: {
    catLength: (state) => {
      return state.categories.length
    },
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id)
    },
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENT(state,event){
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    GET_TOTAL_EVENTS(state, eventsTotal){
      state.eventsTotal = eventsTotal
    }
  },
  actions: {
    updateCount({ state, commit }, incrementBy) {
      if (state.user) {
        commit('INCREMENT_COUNT', incrementBy)
      }
    },
    createEvent({ commit }, event) {
      return EventServices.postEvent(event).then(() => {
          commit('ADD_EVENT', event.data)
        })
    },
    fetchEvents({ commit }, { perPage, page}){
      EventServices.getEvents( perPage, page)
        .then(response => {
          console.log('Total events are  '+ response.headers['x-total-count'])
          commit('GET_TOTAL_EVENTS', response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
    fetchEvent({ commit, getters}, id){
      var event = getters.getEventById(id)

      if(event) {
        commit('SET_EVENT',event)
      }
      else {
        EventServices.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  modules: {},
  plugins:
    process.env.NODE_ENV !== 'production' //FOR LOGGING MUTATIONS AND OTHER STUFF, WILL LOOK MORE INTO IT
      ? [createLogger()]
      : [],
})
