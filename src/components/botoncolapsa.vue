<template>
    <div id="nca13_mnu_tglbtn" class="row" v-on:click="$emit('toglea-estado')">
      <button v-if="lateralvisible" type="button" class="btn nav-link float-sm-left mr-1 btn-secondary">
        <i class="icon fa fa-angle-double-left" ></i>
      </button>
      <button v-if="!lateralvisible" type="button" class="btn nav-link float-sm-left mr-1 btn-secondary">
        <i class="icon fa fa-angle-double-right" ></i>
      </button>
    </div>
</template>

<script>
export default {
  name: 'botoncolapsa',
  emits: ['toglea-estado'],
  props: ['lateralvisible'],
  computed: {
  },
  methods: {
    //togleaestado() {
    //    this.$emit('toglea-estado');
    //}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
