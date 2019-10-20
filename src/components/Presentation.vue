<template>
  <div>
      <v-img :src="require(`@/icon/presentation.png`)"></v-img>
      <p><strong>Bienvenue à bord de Plan'air - Leader mondial dans la vente d'avion de ligne </strong> {{ body.text }} </p>
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
