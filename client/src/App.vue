<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import store from '@/store.js'

import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  created () {
    store.dispatch('checkToken')
    store.dispatch('getQuestions')
  }
}
</script>

<style lang="scss">
.clearfix:before,
.clearfix:after {
  content: ' '; /* 1 */
  display: table; /* 2 */
}

.clearfix:after {
  clear: both;
}

/*
 * For IE 6/7 only
 * Include this rule to trigger hasLayout and contain floats.
 */

.clearfix {
  *zoom: 1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
