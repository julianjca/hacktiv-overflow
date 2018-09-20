<template>
  <div class="card">
    <div class="left">
      <div class="content">
        <h3>Upvotes : <span class="highlight"> {{question.upvotes.length}}</span></h3>
        <h3>Downvotes : <span class="highlight"> {{question.downvotes.length}}</span></h3>
        <h3>Comments : <span class="highlight"> {{question.comments.length}}</span></h3>

      </div>
    </div>
    <div>
      <h2>{{question.title}}</h2>
      <p>{{question.body}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: ['question']
}
</script>

<style scoped>
.card {
  font-size: 15px;
  color: #4684f6;
  width: 100%;
  min-height: 250px;
  height: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
  border: 1px solid rgb(212, 212, 212);
  display: grid;
  grid-template-columns: 2fr 3fr;
}

.card h3 {
  display: block;
  font-size: 12px;
  color: rgb(75, 75, 75);
}

.card h2 {
  font-size: 20px;
  cursor: pointer;
}

.card p {
  font-size: 12px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  color: rgb(75, 75, 75);
}

.left {
  border-right: 1px solid rgb(226, 226, 226);
}

.content {
  margin-top: 38%;
}

.highlight {
  color: rgb(255, 172, 19);
  font-weight: 700;
}
</style>
