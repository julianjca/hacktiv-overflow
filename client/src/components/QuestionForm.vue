<template>
  <div class="form">
    <h2>Let's Ask Some Questions</h2>
    <input type="text" placeholder="title" v-model="title">
    <textarea type="text" placeholder="put details here" v-model="body"></textarea>
    <h3 @click="createQuestion">submit</h3>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store.js'
export default {
  name: 'QuestionForm',
  methods: {
    createQuestion () {
      let self = this
      axios({
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          body: this.body
        },
        url: `https://rama.minimalistdeveloper.xyz/questions`
      })
        .then(response => {
          console.log(response)
          self.$emit('closeForm')
          store.dispatch('getQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  data () {
    return {
      title: '',
      body: ''
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
  color: #6aa6d6;
  background-color: #fff;
  width: 6%;
  padding: 5px 0px;
  border-radius: 5px;
  cursor: pointer;
}
.form {
  background-color: #1088ed;
  width: 100%;
  height: 300px;
  padding: 6% 0;
}
.form h2 {
  color: #ffffff;
}
textarea {
  width: 500px;
  height: 200px;
  border: none;
  border-radius: 5px;
  text-align: center;
}
</style>
