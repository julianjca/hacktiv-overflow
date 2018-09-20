<template>
  <div class="card">
    <div class="left">
      <div class="content">
        <h3>Upvotes :</h3>
        <h3>Downvotes :</h3>
      </div>
    </div>
    <div>
      <h2>halo</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum elementum dictum. Sed id mattis est. Curabitur semper lobortis iaculis. Nullam vulputate ullamcorper sem ac fringilla. Ut scelerisque, dui nec finibus suscipit, augue turpis maximus orci, sit amet porttitor augue quam quis purus. Morbi pretium, lectus ac vestibulum placerat, libero nisl viverra leo, sed gravida sapien leo in dolor. Nullam id fermentum mauris, quis hendrerit risus. Integer ornare risus tincidunt vulputate pharetra. Donec a luctus neque. Etiam nisl augue, mattis et ante sit amet, tristique rutrum metus.</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'QuestionCard'
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
}

.card h2 {
  font-size: 16px;
}

.card p {
  font-size: 12px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.left {
  border-right: 1px solid rgb(226, 226, 226);
}

.content {
  margin-top: 40%;
}
</style>
