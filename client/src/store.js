import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = `https://rama.minimalistdeveloper.xyz/`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userData: '',
    questions: [],
    error: '',
    users: []
  },
  mutations: {
    changeLoginStatus (state) {
      state.isLogin = true
      state.error = ''
    },
    getLoginData (state, data) {
      state.userData = data
    },
    logout (state) {
      state.isLogin = false
      state.userData = ''
    },
    putQuestions (state, data) {
      state.questions = data
    },
    senderror (state) {
      state.error = `username/password is wrong`
    },
    putUsers (state, payload) {
      state.users = payload
    }
  },

  actions: {
    sendLogin (context, obj) {
      axios({
        method: 'POST',
        url: `${baseUrl}users/login`,
        data: obj
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          context.commit('changeLoginStatus')
        })
        .catch(err => {
          console.log(err)
          context.commit('senderror')
        })
    },

    facebookLogin (context, token) {
      localStorage.setItem('token', token)
      context.commit('changeLoginStatus', token)
    },

    checkToken (context) {
      const token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `${baseUrl}users/auth`,
        headers: {
          token: token
        }
      })
        .then(response => {
          context.commit('getLoginData', response.data.data._id)
          context.commit('changeLoginStatus')
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout (context) {
      localStorage.removeItem('token')
      context.commit('logout')
    },

    getQuestions (context) {
      axios({
        method: 'GET',
        url: `${baseUrl}questions`
      })
        .then(response => {
          context.commit('putQuestions', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    getUsers (context) {
      axios({
        method: 'GET',
        url: `${baseUrl}users`
      })
        .then(response => {
          context.commit('putUsers', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
