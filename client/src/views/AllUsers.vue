<template>
  <div class="userspage">
    <UserCard v-for="(user,index) in users" :key="index" :user="user"></UserCard>
  </div>
</template>

<script>
// @ is an alias to /src
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'AllUsers',
  components: {
    UserCard
  },
  data () {
    return {
      showQuestionForm: false
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  },
  created () {
    this.$store.dispatch('getUsers')
  }
}
</script>

<style scoped>
.userspage {
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
