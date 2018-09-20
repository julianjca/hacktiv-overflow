<template>
  <div class="home">
    <Form v-if="!isLogin"></Form>
    <h3 v-if="isLogin" @click="showQuestionForm = !showQuestionForm">Ask a question</h3>
    <QuestionForm v-if="showQuestionForm" @closeForm="showQuestionForm = !showQuestionForm"></QuestionForm>
    <h1>List of Questions</h1>
    <div class="questionList">
      <question-card class="insideQuestion" v-for="(question,index) in questions" :key="index" :question="question"></question-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import QuestionForm from '@/components/QuestionForm.vue'

export default {
  name: 'home',
  components: {
    Form,
    QuestionCard,
    QuestionForm
  },
  data () {
    return {
      showQuestionForm: false
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    },
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>

<style scoped>
.questionList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  margin-top: 5%;
  grid-gap: 20px;
}
.insideQuestion {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  margin-top: 5%;
}

h3 {
  margin-top: 40px;
  color: #fff;
  background-color: #1088ed;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 20%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  /* margin-bottom: -30px; */
}
</style>
