<template>
  <div>
      <v-img :src="require(`@/icon/presentation.png`)"></v-img>
      <p><strong>DESCRIPTION:</strong> {{ body.text }} </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    body: {
      text: ``
    }
  }),
  created () {
    const tmp = require('../data/description.json')
    this.body.text = tmp.description
  }
}
</script>
<style scoped>
p{
  overflow-wrap: break-word;
  width: 50%;
  margin-left: 50%;
  transform: translate(-50%);
  margin-top: 25px;
}
</style>
