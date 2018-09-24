<template>
  <div class="card">
    <h3>Name : {{user.name}}</h3>
    <h3>Email : {{user.email}}</h3>
    <h4>Number of Question : {{user.questions.length}}</h4>
    <h4>Number of Comments : {{user.comments.length}}</h4>
    <h2>List of Questions</h2>
    <div class="container-question">
      <QuestionCard v-for="(question,index) in user.questions" :key="index" :question="question"></QuestionCard>
    </div>
    <h2>List of Comments</h2>
  <div class="container-question">
      <CommentCard v-for="(comment,index) in user.comments" :key="index" :comment="comment"></CommentCard>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import CommentCard from '@/components/CommentCard.vue'
import QuestionCard from '@/components/QuestionCard.vue'

// import store from '@/store'
export default {
  name: 'ShowUser',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  components: {
    CommentCard,
    QuestionCard
  },
  props: ['user']
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
  color: black;
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

.container-question {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  margin-top: 5%;
  grid-gap: 20px;
}
</style>
