import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = `http://localhost:3000/`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userData: {}
  },
  mutations: {
    changeLoginStatus (state) {
      state.isLogin = true
    },
    getLoginData (state, data) {
      state.userData = data
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
        })
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
          context.commit('getLoginData', response.data.data)
          context.commit('changeLoginStatus')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
