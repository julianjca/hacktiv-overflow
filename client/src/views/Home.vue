<template>
  <div class="home">
    <Form v-if="!isLogin"></Form>
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
