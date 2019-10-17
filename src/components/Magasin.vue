<template>
    <div id="conteneur">
      <v-simple-table v-for="element in database" :key="element.id">
        <div v-if="element.id === avion_type" :id="element.id">
          <tr v-for="FirstElementOfTable in element.element" :key="FirstElementOfTable.id" :id="FirstElementOfTable.id">
            <td v-for="SecondDimensionOfTable in FirstElementOfTable" :key="SecondDimensionOfTable.id" :id="SecondDimensionOfTable.id" style="padding-bottom: 60px;">
              <p id="title"><strong>{{ SecondDimensionOfTable.description.name }}</strong></p>
              <img :src="SecondDimensionOfTable.description.src" width="100%">
              <p>Jusqu'à <strong>{{ SecondDimensionOfTable.max.passager }}</strong> passagé</p>
              <p><strong>Type:</strong> {{ SecondDimensionOfTable.description.type.this }} </p>
              <p><strong>Vitesse:</strong> {{ SecondDimensionOfTable.max.vitesse }} Km/H/Kt</p>
              <p><strong>Portée:</strong> {{ SecondDimensionOfTable.max.porté }} Nm/Km</p>
              <p><strong>Prix:</strong> {{ SecondDimensionOfTable.description.prix }} €</p>
              <p><strong>Description:</strong> {{ SecondDimensionOfTable.description.this }} </p>
              <v-btn tile id="connected" v-if="connected" @click="panier(SecondDimensionOfTable.id, this)">Ajouter au panier</v-btn>
            </td>
          </tr>
        </div>
      </v-simple-table>
    </div>
</template>

<script>
export default {
  data: () => ({
    database: [
      { id: 0, element: `` },
      { id: 1, element: `` },
      { id: 2, element: `` },
      { id: 3, element: `` },
      { id: 4, element: `` }
    ]
  }),
  props: ['avion_type', 'connected'],
  methods: {
    panier: function (e) {
      this.axios.post(`http://localhost:4000/api/panier/ajouter`, { avion: e })
        .then(jsondata => {
        }).catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    const tmp = require('../data/stocks.json')
    this.database[0].element = []
    class Database {
      constructor () {
        this._long = []
        this._court = []
        this._regionale = []
        this._cargo = []
        this._lo = 0
        this._co = 0
        this._re = 0
        this._ca = 0
      }
      set long (e) {
        this.ajuste(1, e)
      }
      set court (e) {
        this.ajuste(0, e)
      }
      set regionale (e) {
        this.ajuste(2, e)
      }
      set cargo (e) {
        this.ajuste(3, e)
      }
      ajuste (e, e1) {
        switch (e) {
          case 0:
            if (this._co % 5 === 0) {
              this._court.push([])
            }
            this._court[Math.floor(this._co / 5)].push(e1)
            this._court[Math.floor(this._co / 5)][this._co % 5].description.src = require(`@/data/avion/${e1.id}.jpg`)
            this._co++
            break
          case 1:
            if (this._lo % 5 === 0) {
              this._long.push([])
            }
            this._long[Math.floor(this._lo / 5)].push(e1)
            this._long[Math.floor(this._lo / 5)][this._lo % 5].description.src = require(`@/data/avion/${e1.id}.jpg`)
            this._lo++
            break
          case 2:
            if (this._re % 5 === 0) {
              this._regionale.push([])
            }
            this._regionale[Math.floor(this._re / 5)].push(e1)
            this._regionale[Math.floor(this._re / 5)][this._re % 5].description.src = require(`@/data/avion/${e1.id}.jpg`)
            this._re++
            break
          case 3:
            if (this._ca % 5 === 0) {
              this._cargo.push([])
            }
            this._cargo[Math.floor(this._ca / 5)].push(e1)
            this._cargo[Math.floor(this._ca / 5)][this._ca % 5].description.src = require(`@/data/avion/${e1.id}.jpg`)
            this._ca++
            break
        }
      }
      get long () {
        return this._long
      }
      get court () {
        return this._court
      }
      get regionale () {
        return this._regionale
      }
      get cargo () {
        return this._cargo
      }
    }
    let data = new Database()

    for (let i = 0; i < tmp.length; i++) {
      /* Pour tout les types */
      if (i % 5 === 0) {
        this.database[0].element.push([])
      }
      this.database[0].element[Math.floor(i / 5)].push(tmp[i])
      this.database[0].element[Math.floor(i / 5)][i % 5].description.src = require(`@/data/avion/${this.database[0].element[Math.floor(i / 5)][i % 5].id}.jpg`)
      /* Pour les longs courrier */
      if (tmp[i].description.type.id === 1) {
        data.long = tmp[i]
      }
      /* Pour les moyens courrier */
      if (tmp[i].description.type.id === 0) {
        data.court = tmp[i]
      }
      /* Pour les régionale */
      if (tmp[i].description.type.id === 2) {
        data.regionale = tmp[i]
      }
      /* Pour les cargo */
      if (tmp[i].description.type.id === 3) {
        data.cargo = tmp[i]
      }
    }
    this.database[1].element = data.court
    this.database[2].element = data.long
    this.database[3].element = data.regionale
    this.database[4].element = data.cargo
  }
}
</script>
<style scoped>
#conteneur{
  margin-top:10px;
}
#title{
  text-align: center;
}
p, img{
  user-select: none;
}
#connected{
  width:100%;
  margin-top:10px;
}
</style>
