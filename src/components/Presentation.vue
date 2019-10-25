<template>
  <div>
      <v-img :src="require(`@/icon/presentation.png`)"></v-img>
      <p><strong><font color=#007FFF size="7">Bienvenue à bord de Plan'air </font></strong><br/><br/>{{ body.text }} </p>
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
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%);
  margin-top: 25px;
  font-size: 20px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
