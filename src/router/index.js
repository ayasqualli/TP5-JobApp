import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import AddJobView from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'
import JobDetail from '@/views/JobDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'Add Job',
    component: AddJobView
  },
  {
    path: '/Jobs/:id',
    name: 'Job n° :id',
    component: JobDetail,
    props: true
  },
  {
    path: '/edit/:id',
    name: 'Edit Job n° :id',
    component: EditJob,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
