import EventServices from '@/services/EventServices.js'
import router from '@/router'
import NProgress from 'nprogress'

export const namespaced = true

export const state = {
    events: [],
    count: 0,
    eventsTotal: 0,
    event: {},
}

export const mutations = {
    //NOTE never get mutations for other modules
    INCREMENT_COUNT(state, value) {
        state.count += value
    },
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENT(state, event) {
        state.event = event
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    GET_TOTAL_EVENTS(state, eventsTotal) {
        state.eventsTotal = eventsTotal
    },
}

export const actions = {
    updateCount({ state, commit }, incrementBy) {
        if (state.user) {
            commit('INCREMENT_COUNT', incrementBy)
        }
    },
    createEvent({ commit, rootState, dispatch }, event) {
        // dispatch('moduleName/actionToCall', null, { root: true }) <-- example tog et action from difffernet module
        console.log('User creating Event is ' + rootState.user.user.name)
        return EventServices.postEvent(event)
            .then(() => {
                commit('ADD_EVENT', event)
                const notification = {
                    type: 'success',
                    message: 'Your event has been created! ',
                }
                dispatch('notification/add', notification, { root: true })
            })
            .catch((error) => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem creating your event: ' + error.message,
                }
                dispatch('notification/add', notification, { root: true })
                throw error
            })
    },
    async fetchEvents({ commit, dispatch }, { perPage, page }) {
        // old version
        console.log('perPage: '+ perPage)
        var res = 'Loading'
        await EventServices.getEvents(perPage, page)
            .then((response) => {
                console.log('Total events are  ' + response.headers['x-total-count'])
                commit('GET_TOTAL_EVENTS', response.headers['x-total-count'])
                commit('SET_EVENTS', response.data)
                NProgress.done()
            })
            .catch((error) => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem fetching events: ' + error.message,
                }
                dispatch('notification/add', notification, { root: true })
                NProgress.done()
                //router.push({ name: 'NetworkError' })
               throw error
            })
        return res
    },

    fetchEvent({ commit, getters, dispatch }, id) {
        console.log('fetchEvent action entered with ID: ' + id)
        var event = getters.getEventById(id)

        if (event) {
            console.log('event exists')
            commit('SET_EVENT', event)
        } else {
            console.log('else entered')
            EventServices.getEvent(id)
                .then((response) => {
                    commit('SET_EVENT', response.data)
                })
                .catch((error) => {
                    const notification = {
                        type: 'error',
                        message: 'There was a problem fetching event: ' + error.message,
                    }
                    dispatch('notification/add', notification, { root: true })

                    if (error.response && error.response.status == 404) {
                        router.push({
                            name: '404Resource',
                            params: { resource: 'event' },
                        })
                    } else {
                        router.push({ name: 'NetworkError' })
                    }
                })
        }
    },
}
export const getters = {
    catLength: (state) => {
        return state.categories.length
    },
    getEventById: (state) => (id) => {
        console.log(state)
        state.events.forEach((e) => {
            console.log(e)
            console.log('test: ' + e.id)
            console.log('getterTest: ')
        })
        console.log(state.events)
        console.log(id + '--')
        return state.events.find((event) => event.id === id)
    },
}
