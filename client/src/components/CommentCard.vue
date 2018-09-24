<template>
<div class="commentBox">
    <h4><strong>{{comment.user.name}}</strong></h4>
    <p>{{comment.comment}}</p>
    <h4>Upvotes : <span class="highlight"> {{commentContent.upvotes.length}} </span> <span @click="upvote" v-if="!alreadyUpvote && isLogin && userId!==comment.user._id">⬆️</span></h4>
    <h4>Downvotes : <span class="highlight"> {{commentContent.downvotes.length}} </span> <span @click="downvote" v-if="!alreadyDownvote && isLogin && userId!==comment.user._id">⬇️</span></h4>
</div>

</template>

<script>
import axios from 'axios'
import store from '@/store'

export default {
  name: 'CommentCard',
  props: ['comment'],
  methods: {
    upvote () {
      let self = this
      axios({
        method: 'PUT',
        url: `http://localhost:3000/comments/upvote/${this.comment._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          self.alreadyUpvote = true
          setTimeout(() => {
            self.$emit('fetch-comment')
            store.dispatch('getQuestions')
          }, 500)
        })
        .catch(err => {
          console.log(err)
        })
    },

    downvote () {
      let self = this
      axios({
        method: 'PUT',
        url: `http://localhost:3000/comments/downvote/${this.comment._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          self.alreadyDownvote = true
          setTimeout(() => {
            store.dispatch('getQuestions')
            self.$emit('fetch-comment')
          }, 500)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  created () {
    let self = this
    for (let i = 0; i < self.comment.upvotes.length; i++) {
      if (self.comment.upvotes[i] === self.userId) {
        self.alreadyUpvote = true
      }
    }

    for (let i = 0; i < self.comment.downvotes.length; i++) {
      if (self.comment.downvotes[i] === self.userId) {
        self.alreadyDownvote = true
      }
    }
  },

  watch: {
    comment () {
      this.commentContent = this.comment
    }
  },

  computed: {
    userId () {
      return this.$store.state.userData
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    commentContent () {
      return this.comment
    }
  },

  data () {
    return {
      alreadyUpvote: false,
      alreadyDownvote: false
    }
  }
}
</script>

<style scoped>
h4,
h5 {
  text-align: left;
  margin-left: 10%;
}

h4 {
  width: 300px;
}

.commentBox {
  border: 0.5px solid rgb(195, 195, 195);
  /* border-bottom: 0.5px solid rgb(195, 195, 195); */
  width: 60%;
  min-height: 100px;
  margin-left: 10%;
  margin-top: 5%;
  margin-bottom: 5%;
}

p {
  text-align: left;
  margin-left: 10%;
  font-size: 12px;
}
</style>
