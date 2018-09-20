<template>
  <div class="navbar">
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/2000px-Stack_Overflow_logo.svg.png" alt="" @click="homePage">
    </div>
    <div class="container">
      <h3 v-if="!isLogin">login</h3>
      <h3 v-if="!isLogin" id="signup">register</h3>
      <h3 v-if="isLogin" id="signup" @click="logout">logout</h3>
    </div>
  </div>
</template>

<script>
import store from '@/store.js'

export default {
  name: 'Navbar',
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      store.dispatch('logout')
    },
    homePage () {
      this.$store.dispatch('getQuestions')
      setTimeout(() => {
        this.$router.push('/')
      }, 500)
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
}
#signup {
  color: #fff;
  background-color: #1088ed;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.container {
  margin-right: 100px;
  margin-left: auto;
}
</style>
