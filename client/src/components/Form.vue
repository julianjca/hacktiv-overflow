<template>
  <div class="form">
    <h2>Let's Login to Your Account</h2>
    <input type="email" placeholder="example@mail.com" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <h3 @click="sendLogin">submit</h3>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'Form',
  methods: {
    sendLogin () {
      const obj = {
        email: this.email,
        password: this.password
      }
      store.dispatch('sendLogin', obj)
      setTimeout(() => {
        store.dispatch('getQuestions')
        store.dispatch('checkToken')
      }, 1000)
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.form input {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
  border: none;
}
.form h3 {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 15px;
  color: #1088ed;
  background-color: #fff;
  width: 6%;
  padding: 5px 0px;
  border-radius: 5px;
  cursor: pointer;
}
.form {
  background-color: #1088ed;
  width: 100%;
  height: 200px;
  padding: 6% 0;
}
.form h2 {
  color: #ffffff;
}
</style>
