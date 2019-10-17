<template>
  <div>
    <v-form v-if="!connected"
      id="form"
      ref="form"
      v-model="valid">
      <v-text-field id="pseudo"
        :label="text.pseudo"
        v-model="value_form.pseudo"
        :rules="value_form.rules.pseudo"
        required></v-text-field>
      <div id="password">
        <v-text-field
          :label="text.password"
          v-model="value_form.password"
          :type="value_form.see"
          :rules="value_form.rules.password"
          required></v-text-field>
      </div>
      <v-checkbox v-model="value_form.swap" id="check" label="Watch my password" @click="swap_password"></v-checkbox>
      <v-btn tile id="sucess" :disabled="!valid" @click="connection">Validate</v-btn>
      <v-btn tile :id="value_form.warning" @click="reset">Reset</v-btn>
    </v-form>
    <v-form id="form" v-else>
      <v-btn tile id="disconnect" @click="deconnection()">Se deconnecter</v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    text: {
      pseudo: `Pseudo`,
      password: `Mot de passe`
    },
    value_form: {
      pseudo: ``,
      password: ``,
      see: `password`,
      swap: false,
      warning: `warning`,
      rules: {
        password: [
          v => !!v || 'Name is required'
        ],
        pseudo: [
          v => !!v || 'Pseudo is required'
        ]
      }
    },
    valid: true
  }),
  props: ['connected'],
  methods: {
    swap_password: function () {
      if (!this.value_form.swap) {
        this.value_form.see = `password`
      } else {
        this.value_form.see = ``
      }
    },
    reset: function () {
      this.$refs.form.reset()
      this.value_form.warning = `warning`
      this.value_form.see = `password`
    },
    connection: function () {
      this.axios.post(`http://localhost:4000/api/login`, { username: this.value_form.pseudo, password: this.value_form.password })
        .then(jsondata => {
          const data = jsondata.data
          if (data.message === `error`) {
            this.value_form.warning = `warning_false`
          } else {
            this.value_form.warning = `warning`
            this.$emit('connectionVue', data.connect)
          }
        }).catch(error => {
          console.log(error)
        })
    },
    deconnection: function () {
      this.$emit('connectionVue', false)
    }
  }
}
</script>
<style scoped>
#sucess{
  background-color:rgba(76,175,80,0.5);
  width:50%;
}
#sucess:hover{
  background-color:rgba(76,175,80,1);
}
#warning{
  background-color: rgba(250,140,0,0.5);
  width:50%;
}
#warning:hover{
  background-color: rgba(250,140,0,1);
}
#warning_false{
  background-color: rgba(255,0,0,0.5);
  width:50%;
}
#warning_false:hover{
  background-color: rgba(255,0,0,1);
}
#form{
  width: fit-content;
  top: 48px;
  right: 0px;
  position: absolute;
  background-color: rgb(255,255,255,0.75);
  padding:10px;
}
#form:hover{
  background-color: rgb(255,255,255,1);
}
#disconnect{
  width:100%;
  background-color: rgb(255,255,255,0);
}
#password{
  float:left;
}
</style>
