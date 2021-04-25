import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'
import Playground from '../views/Playground.vue'
import EventCreate from '../views/EventCreate.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1})
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
