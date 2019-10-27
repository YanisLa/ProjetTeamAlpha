<template>
  <v-simple-table id="conteneur">
    <tr v-for="SecondList in list" :key="SecondList.id">
      <td  v-for="element in SecondList" :key="element.id" style="padding-bottom: 60px;">
        <p id="title"><strong>{{ element.name }}</strong></p>
        <img :src="element.src" width="100%">
        <p>Jusqu'à <strong>{{ element.passage }}</strong> passagers</p>
        <p><strong>Type:</strong> {{ element.type }} </p>
        <p><strong>Vitesse:</strong> {{ element.vitesse }} Mach</p>
        <p><strong>Envergure:</strong> {{ element.porte }} m</p>
        <p><strong>Prix:</strong> {{ element.prix }} €</p>
        <v-btn id="connected" tile @click="retirer(element.id + 5 * element.id2)"> Retirer de mon panier</v-btn>
      </td>
    </tr>
  </v-simple-table>
</template>
<script>
export default {
  data: () => ({
    list: []
  }),
  methods: {
    data: function () {
      const tmp = require('../data/stocks.json')
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.list[i].length; j++) {
          this.list[i][j].name = tmp[this.list[i][j].value].description.name
          this.list[i][j].src = require(`@/data/avion/${this.list[i][j].value}.jpg`)
          this.list[i][j].passage = tmp[this.list[i][j].value].max.passager
          this.list[i][j].type = tmp[this.list[i][j].value].description.type.this
          this.list[i][j].vitesse = tmp[this.list[i][j].value].max.vitesse
          this.list[i][j].porte = tmp[this.list[i][j].value].max.porté
          this.list[i][j].prix = tmp[this.list[i][j].value].description.prix
          this.list[i][j].id2 = i
        }
      }
    },
    transformList: function (e) {
      let list = []
      for (let i = 0; i < e.length; i++) {
        if (i % 5 === 0) {
          list.push([])
        }
        const id = i % 5
        const variable = {
          id: id,
          value: e[i]
        }
        list[ Math.floor(i / 5) ].push(variable)
      }
      return list
    },
    retirer: function (e) {
      this.axios.post(`/api/panier/supprimer`, { id: e })
        .then(jsondata => {
          const list = jsondata.data.data
          this.list = this.transformList(list)
          this.data()
        }).catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.axios.get(`/api/panier`)
      .then(jsondata => {
        const list = jsondata.data.data
        this.list = this.transformList(list)
        this.data()
      }).catch(error => {
        console.log(error)
      })
  }
}
</script>
<style scoped>
#title{
  text-align: center;
}
#conteneur{
  margin-top:10px;
}
p, img{
  user-select: none;
}
#connected{
  width:100%;
  margin-top:10px;
}
</style>
