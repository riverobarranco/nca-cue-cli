<template>
    <div v-if="iconosurl" id="nca13_mnu_icon" class="row">
        <div v-for="tip in iconostipos" v-bind:key="tip" v-bind:style="iconosWidth" class="col nca13_mnu_icon_btn"  v-on:click="iconosactivatipo(tip)">
          <a><img v-bind:src="iconosurl + 'icono' + tip + '.png'" style="width:100%"></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'iconos',
    props: {
        iconostipos: {
            type: Array,
            required: true,
            default: function() {return []},
        },
        iconosurl: {
            type: String,
            required: true,
            default: '',
        }
    },
    computed: {
      iconosWidth() {
        if (this.iconostipos.length > 0) {
          return 'width: ' + (100 / this.iconostipos.length) + '%';
        } else {
          return 'width: 20%';
        }
      },
    },
    methods: {
      iconosactivatipo(item) {
        this.$emit('activa-tipo', item)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
