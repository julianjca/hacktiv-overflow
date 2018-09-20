<template>
  <div class="card">
    <h2>{{data[0].title}}</h2>
    <p>{{data[0].body}}</p>
  </div>
</template>

<script>
import axios from 'axios'
// import store from '@/store'
export default {
  name: 'ShowQuestion',
  props: ['id'],
  methods: {},
  data () {
    return {
      data: []
    }
  },
  created () {
    let self = this
    axios({
      method: 'GET',
      url: `http://localhost:3000/questions/${this.id}`
    })
      .then(response => {
        self.data = response.data.data
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
}
h2 {
  margin-top: 5%;
  font-size: 30px;
}
</style>
