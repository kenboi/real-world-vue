import { createStore, createLogger } from 'vuex'
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/events.js'

export default createStore({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
  modules: {
    user,
    event
  },
  plugins:
    process.env.NODE_ENV !== 'production' //FOR LOGGING MUTATIONS AND OTHER STUFF, WILL LOOK MORE INTO IT
      ? [createLogger()]
      : [],
})
