<template>
  <div class="navbar">
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/2000px-Stack_Overflow_logo.svg.png" alt="">
    </div>
    <div class="container">
      <h3>login</h3>
      <h3 id="signup">register</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.navbar img {
  width: 200px;
  height: auto;
  margin-top: 2%;
}
.container h3 {
  display: inline-block;
  padding-right: 50px;
  text-align: center;
  color: #1088ed;
}
#signup {
  color: #fff;
  background-color: #1088ed;
  padding: 5px 10px;
  border-radius: 5px;
}
.container {
  margin-right: 100px;
  margin-left: auto;
}
</style>
