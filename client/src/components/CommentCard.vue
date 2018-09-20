<template>
<div class="commentBox">
    <h4><strong>{{comment.user.name}}</strong></h4>
    <p>{{comment.comment}}</p>
</div>

</template>

<script>
export default {
  name: 'CommentCard',
  props: ['comment'],
  computed: {},
  methods: {},
  created () {}
}
</script>

<style scoped>
h4,
h5 {
  text-align: left;
  margin-left: 10%;
}

h4 {
  width: 300px;
}

.commentBox {
  border-top: 0.5px solid rgb(195, 195, 195);
  border-bottom: 0.5px solid rgb(195, 195, 195);
  width: 60%;
  height: 100px;
  margin-left: 10%;
  margin-top: 5%;
  margin-bottom: -3%;
}

p {
  text-align: left;
  margin-left: 10%;
  font-size: 12px;
}
</style>
