import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UpdateForm from './views/UpdateForm.vue'
import ShowQuestion from './views/ShowQuestion.vue'
import AllUsers from './views/AllUsers.vue'
import ShowUser from './views/ShowUser.vue'
import UpdateComment from './views/UpdateComment.vue'
import Register from './views/Register.vue'

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
    },
    {
      path: '/users/show',
      name: 'showUser',
      props: true,
      component: ShowUser
    },
    {
      path: '/comments/:id',
      name: 'UpdateComment',
      props: true,
      component: UpdateComment
    },
    {
      path: '/register',
      name: 'Register',
      props: true,
      component: Register
    }
  ]
})
