<template>
  <div class="home">
    <Form v-if="!isLogin"></Form>
    <div class="questionList">
      <question-card class="insideQuestion"></question-card>
      <question-card class="insideQuestion"></question-card>
      <question-card class="insideQuestion"></question-card>
      <question-card class="insideQuestion"></question-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'home',
  components: {
    Form,
    QuestionCard
  },
  data () {
    return {}
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
.questionList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  margin-top: 10%;
  grid-gap: 20px;
}
.insideQuestion {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
