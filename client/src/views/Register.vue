<template>
  <div class="form">
    <h2>Let's Register to Your Account</h2>
    <input type="text" placeholder="John Doe" v-model="name">
    <input type="email" placeholder="example@mail.com" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <h3 @click="sendRegister">submit</h3>
  </div>
</template>

<script>
// import store from '@/store.js'
import axios from 'axios'

export default {
  name: 'Form',
  methods: {
    sendRegister () {
      const obj = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      axios({
        method: 'POST',
        url: `${this.baseUrl}users/register`,
        data: obj
      })
        .then(response => {
          console.log(response)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  data () {
    return {
      email: '',
      password: '',
      name: '',
      baseUrl: `http://hacktivapi.minimalistdeveloper.xyz/`
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
h4 {
  color: rgb(255, 70, 70);
}
</style>
