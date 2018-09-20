<template>
  <div class="home">
    <Form v-if="!isLogin"></Form>
    <div class="articleList">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'
export default {
  name: 'home',
  components: {
    Form
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
