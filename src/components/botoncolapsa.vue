<template>
    <div id="nca13_mnu_tglbtn" class="row" v-if="lateralvisible" v-on:click="$emit('toglea-estado')">
      <button type="button" class="btn nav-link float-sm-left mr-1 btn-secondary">
        <i class="icon fa fa-angle-double-left" ></i>
      </button>
    </div>
    <div id="nca13_mnu_tglbtn" class="row" v-if="!lateralvisible" v-on:click="$emit('toglea-estado')">
      <button type="button" class="btn nav-link float-sm-left mr-1 btn-secondary">
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
