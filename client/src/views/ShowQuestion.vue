<template>
  <div class="card">
    <h2>{{data[0].title}}</h2>
    <p>{{data[0].body}}</p>
    <textarea placeholder="write your comment here" name="" id="writeComment" v-model="comment"></textarea>
    <button @click="sendComment">Submit Comment</button>
    <comment-card v-for="(comment,index) in comments" :key="index" :comment="comment" @fetch-comment="fetchComment"></comment-card>
  </div>
</template>

<script>
import axios from 'axios'
import CommentCard from '@/components/CommentCard.vue'
// import store from '@/store'
export default {
  name: 'ShowQuestion',
  components: {
    CommentCard
  },
  props: ['id'],
  methods: {
    sendComment () {
      let self = this
      axios({
        method: 'POST',
        url: `http://localhost:3000/comments`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          comment: this.comment,
          postId: this.data[0]._id
        }
      })
        .then(response => {
          axios({
            method: 'GET',
            url: `http://localhost:3000/questions/${this.id}`
          })
            .then(response => {
              console.log(response)
              self.data = response.data.data
              self.comments = response.data.data[0].comments
              self.comment = ''
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchComment () {
      console.log('masuk')
      let self = this
      axios({
        method: 'GET',
        url: `http://localhost:3000/questions/${this.id}`
      })
        .then(response => {
          console.log(response)
          console.log(response.data.data[0].comments)
          setTimeout(() => {
            self.comments = response.data.data[0].comments
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  data () {
    return {
      data: [],
      comments: [],
      comment: ''
    }
  },
  created () {
    let self = this
    axios({
      method: 'GET',
      url: `http://localhost:3000/questions/${this.id}`
    })
      .then(response => {
        console.log(response)
        self.data = response.data.data
        self.comments = response.data.data[0].comments
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
p {
  margin-top: 40px;
  font-size: 15px;
  text-align: left;
  margin-left: 10%;
}
h2 {
  margin-top: 5%;
  font-size: 30px;
  border-bottom: 0.5px solid rgb(202, 202, 202);
  width: 60%;
  margin-left: 10%;
  text-align: left;
}
textarea {
  overflow: auto;
  margin-top: 5%;
  width: 600px;
  height: 200px;
  margin-left: 10%;
  margin-right: auto;
  display: block;
}
button {
  margin-left: 10%;
  margin-right: auto;
  float: left;
  margin-top: 20px;
}
.card {
  padding-bottom: 5%;
}
</style>
