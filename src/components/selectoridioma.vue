<template>
    <div class="show" id="nca13_mnu_selectoridioma">
        <button class="selectoridiomaboton" id="nca13_mnu_selectoridioma" v-on:click="togleavisible()">
            {{idiomaactualfiltrado}}
        </button>
        <div v-if="visible == true" class="selectoridiomasecun">
            <button v-bind:key="lang" v-for="lang in idiomasdisponiblesfiltrados" v-on:click="cambiaidioma(lang)" class="selectoridiomaboton">
            {{lang}}
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'selectoridioma',
  //emits: ['toglea-estado'],
  props: {
      idiomaactual: {
        type: String,
        default: 'es',
      },
      idiomasdisponibles: {
        type: Array,
        default: function() {return ['es']},
      },
      idiomausuario: {
        type: Object,
        default: function() {return {}},
      },
  },
  data() {
      return {
          visible: false
      }
  },
  computed: {
      idiomaactualfiltrado() {
          if (this.idiomaactual == 'ca_valencia') {
              return 'va'
          } {
              return this.idiomaactual;
          }
      },
      idiomasdisponiblesfiltrados() {
        var listaidiomastemp = []
        for (let i=0; i < this.idiomasdisponibles.length; i++) {
            let temp1 = this.idiomasdisponibles[i];
            if (temp1 == 'ca_valencia') {
                temp1 = 'va'
            }
            if (temp1 !== this.idiomaactual) {listaidiomastemp.push(temp1)}
        }
        return listaidiomastemp;
      }
  },
  methods: {
    //togleaestado() {
    //    this.$emit('toglea-estado');
    //},
    togleavisible() {
        this.visible = !this.visible
    },
    cambiaidioma(idioma) {
        let urlidioma = window.location.href;
        if (urlidioma.includes("course/view.php")) {
            while ( urlidioma.includes("&")) {
            urlidioma = urlidioma.substr( 0, urlidioma.lastIndexOf( "&" ) );
            }
        }
        let idiomafiltrado;
        if (idioma == 'va') {
            idiomafiltrado = 'ca_valencia'
        } else {
            idiomafiltrado = idioma;
        }
        urlidioma = urlidioma + '&lang=' + idiomafiltrado;
        sessionStorage.setItem("tipoactivo", this.idiomausuario.tipoactivo);
        sessionStorage.setItem("subtipoactivo", this.idiomausuario.subtipoactivo);
        sessionStorage.setItem("seccionactiva", this.idiomausuario.urlseccionactiva);
        sessionStorage.setItem("color", this.idiomausuario.color);
        // Vamos a la url indicada en la misma pestaña
        window.open(urlidioma, "_self");
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
