<template>
    <div v-if="botonestipo !== ''" id="nca13_mnu_tit" class="row">
        <div class="nca13_mnu_tit_text col">
            <h4>{{ botonestitulo }}</h4>
        </div>
    </div>
    <div id="nca13_mnu_btn" class="row">
        <div class="col nca13_mnu_btn_elem" v-bind:key="subtip" v-for="subtip in botonessubtiposfiltrados" v-bind:style="botonesstyle + subtip.color" v-on:click="botonesactivasubtipo(subtip.customkey)">
            <a>{{ subtip.nombre }}</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'botones',
  emits: ['activa-subtipo'],
  props: {
    botonestipo: {
        type: String,
        default: 'null',
    },
    botonessubtipos: {
        type: Array,
        required: true,
        default: function() {return []},
    },
    botonestitulo: {
    type: String,
    required: true,
    default: 'null',
    },
    botonesccaa: {
    type: String,
    default: '',
    },
  },
  computed: {
    botonesstyle() {
        if (this.botonessubtipos.length > 0) {
        return 'width: ' + (100 / this.botonessubtipos.length) + '%' + '; background-color: ';
        } else {
        return 'background-color: ';
        }
    },
    botonessubtiposfiltrados() {
        // Mostrará la subcategoría si: 1- La categoría no tiene definida ccaas.  2- El sitio no tiene ccaa definida   3- La ccaa del sitio y una de las de categoría coinciden
        if (this.botonessubtipos !== []) {
            console.log(this.botonessubtipos)
            return this.botonessubtipos.filter( elem => ( !elem.ccaa || this.botonesccaa == null || elem.ccaa.indexOf(this.botonesccaa) > -1 ) );
        } else {
            return [];
        }
    },
  },
  methods: {
    botonesactivasubtipo(elem) {
        this.$emit('activa-subtipo', elem);
        console.log(elem);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
