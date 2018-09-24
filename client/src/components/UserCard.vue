<template>
  <div class="usercard" @click="goToUser">
    <h2>{{user.name}}</h2>
    <h4>Number of Question : {{user.questions.length}}</h4>
    <h4>Number of Comments : {{user.comments.length}}</h4>
  </div>
</template>

<script>
export default {
  name: 'UsersCard',
  props: ['user'],
  methods: {
    goToUser () {
      this.$router.push({ name: `showUser`, params: { user: this.user } })
    }
  }
}
</script>

<style scoped>
.usercard {
  font-size: 15px;
  color: #4684f6;
  width: 60%;
  min-height: 250px;
  height: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
  border: 1px solid rgb(212, 212, 212);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.card h3 {
  display: block;
  font-size: 12px;
  color: rgb(75, 75, 75);
}

.usercard h2 {
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
