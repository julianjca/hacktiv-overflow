import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UpdateForm from './views/UpdateForm.vue'
import ShowQuestion from './views/ShowQuestion.vue'
import AllUsers from './views/AllUsers.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/update/:id',
      name: 'update',
      props: true,
      component: UpdateForm
    },
    {
      path: '/question/:id',
      name: 'question',
      props: true,
      component: ShowQuestion
    },
    {
      path: '/users',
      name: 'users',
      component: AllUsers
    }
  ]
})
