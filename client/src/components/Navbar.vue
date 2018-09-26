<template>
  <div class="navbar">
    <div>
      <img src="../assets/logo1.png" alt="" @click="homePage">
    </div>
    <div class="container">
      <!-- <h3 v-if="!isLogin">login</h3> -->
      <h3 @click="goToUserPage">users</h3>
      <h3 v-if="!isLogin" id="signup" @click="goToRegister">register</h3>
      <h3 v-if="!isLogin" id="signup" @click="loginWithFacebook">facebook login</h3>
      <h3 v-if="isLogin" id="signup" @click="logout">logout</h3>
    </div>
  </div>
</template>

<script>
import store from '@/store.js'
import facebookLogin from 'facebook-login'
import axios from 'axios'
const api = facebookLogin({
  appId: '297651914156063'
})

export default {
  name: 'Navbar',
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    loginWithFacebook () {
      // to trigger the login flow
      api.login().then(response => {
        axios({
          method: 'get',
          url: `https://graph.facebook.com/me?fields=email,name&access_token=${
            response.authResponse.accessToken
          }`
        })
          .then(resp => {
            console.log(resp)
            axios({
              method: 'POST',
              data: resp.data,
              url: `https://rama.minimalistdeveloper.xyz/users/facebook`
            })
              .then(data => {
                this.$store.dispatch('facebookLogin', data.data.token)
                setTimeout(() => {
                  store.dispatch('checkToken')
                  setTimeout(() => {
                    store.dispatch('getQuestions')
                  }, 2000)
                }, 5000)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    logout () {
      store.dispatch('logout')
      this.$router.push('/')
    },
    homePage () {
      this.$store.dispatch('getQuestions')
      setTimeout(() => {
        this.$router.push('/')
      }, 500)
    },
    goToUserPage () {
      this.$router.push('/users')
    },
    goToRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-bottom: 0.5px solid rgb(187, 187, 187);
}
.navbar img {
  width: 150px;
  height: auto;
  margin-top: 4%;
  cursor: pointer;
}
.container h3 {
  display: inline-block;
  padding-right: 50px;
  text-align: center;
  color: #1088ed;
  cursor: pointer;
}
#signup {
  color: #fff;
  background-color: #1088ed;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 50px;
}
.container {
  margin-right: 100px;
  margin-left: auto;
}
</style>
