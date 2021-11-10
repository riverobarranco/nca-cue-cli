<template>
    <div id="nca13_mnu_tglbtn" class="row" v-on:click="togleaestado()">
    </div>
</template>

<script>
export default {
  name: 'botoncolapsa',
  emits: ['toglea-estado'],
  props: {
    lateralvisible: {
        type: Boolean,
        default: true
    },
  },
  computed: {
    botonstyle() {
        if (this.lateralvisible == true) {
        return 'width: ' + (100 / this.botonessubtipos.length) + '%' + '; background-color: ';
        } else {
        return 'background-color: ';
        }
    },
  },
  methods: {
    togleaestado() {
        this.$emit('toglea-estado');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
