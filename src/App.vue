<template>
  <div>
    <v-toolbar dense>
      <v-btn-toggle>
        <v-btn text @click="watch(0)">
          <v-img :src="require(`@/icon/avion.png`)"></v-img>
          <span v-if="body.watch === 0" style="margin-Left:10px"> {{ header.text.presentation }}</span>
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-btn-toggle>
        <v-btn text @click="watch(1);">
          <span v-if="body.watch === 1" style="margin-Right:10px"> {{ header.text.entrepot }}</span>
          <v-img :src="require(`@/icon/entrepot.png`)"></v-img>
        </v-btn>
        <v-btn text v-if="server.connected" @click="watch(2)">
          <span v-if="body.watch === 2" style="margin-Right:10px"> {{ header.text.panier }}</span>
          <v-img :src="require(`@/icon/panier.png`)"></v-img>
        </v-btn>
        <v-btn text v-if="!server.connected" @click="watch(3)">
          <span v-if="body.connection.watch" style="margin-Right:10px"> {{ header.text.connection }}</span>
          <v-img :src="require(`@/icon/connection.png`)"></v-img>
        </v-btn>
        <v-btn text v-else @click="watch(3)">
          <span v-if="body.connection.watch" style="margin-Right:10px"> {{ header.text.deconnection }}</span>
          <v-img :src="require(`@/icon/deconnection.png`)"></v-img>
        </v-btn>
      </v-btn-toggle>
      <template v-if="body.watch === 1" #extension>
        <v-toolbar-items>
          <v-btn tile @click="avion(0)">Tout les types</v-btn>
          <v-btn tile @click="avion(1)">Long courier</v-btn>
          <v-btn tile @click="avion(2)">Moyen courier</v-btn>
          <v-btn tile @click="avion(3)">Régionale</v-btn>
          <v-btn tile @click="avion(4)">Cargo</v-btn>
        </v-toolbar-items>
      </template>
    </v-toolbar>
    <Presentation v-if="body.watch === 0"/>
    <Magasin v-if="body.watch === 1" :avion_type="body.magasin.watch" :connected="server.connected"/>
    <Panier v-if="body.watch === 2"/>
    <Connection v-if="body.connection.watch" :connected="server.connected" v-on:connectionVue="update($event)"/>
  </div>
</template>

<script>
import Presentation from './components/Presentation'
import Magasin from './components/Magasin'
import Connection from './components/Connection'
import Panier from './components/Panier'

export default {
  name: 'App',
  components: {
    Presentation,
    Magasin,
    Connection,
    Panier
  },
  data: () => ({
    header: {
      text: {
        presentation: `Accueil`,
        entrepot: `Les flottes`,
        panier: `Mon panier`,
        deconnection: `Déconnexion`,
        connection: `Connexion`
      }
    },
    server: {
      connected: false
    },
    body: {
      watch: 0,
      magasin: {
        watch: 0
      },
      connection: {
        watch: false
      }
    }
  }),
  methods: {
    watch: function (element) {
      if (element !== 3) {
        this.body.watch = element
      } else {
        this.body.connection.watch = !this.body.connection.watch
      }
    },
    avion: function (element) {
      this.body.magasin.watch = element
    },
    update: function (event) {
      this.server.connected = event
    }
  }
}
</script>
<style scoped>
</style>
