<template>
    <div id="nca13_mnu_list" class="row" v-if="listasubtipo !== ''">
        <div class="col nca13_mnu_list_tit">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-if="listaunidades.length > 0" v-bind:style="listastyletit">
                    {{ listatitulo }}
                </li>
            </ul>
            <ul class="nca13_mnu_list_rec list-group list-group-flush">
                <li class="list-group-item" v-bind:style="listastylerec" v-bind:key="listarecurso" v-for="listarecurso in listarecursos">
                    <a target="_blank" v-bind:href="listarecurso.url" v-bind:style="listastylerecuni">{{ listarecurso.texto }}</a>
                </li>               
                <li class="list-group-item" v-for="listaunidad in listaunidades" v-bind:key="listaunidad" v-on:click="listaactivasseccion(listaunidad.url)">
                    <span class="badge rounded-pill" v-bind:style="listastyleuni">{{ listaunidad.orden }}</span>
                    {{ listaunidad.texto }}
                </li>	
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'lista',
    props: {
        listasubtipo: {
            type: String,
            default: '',
        },
        listarecursos: {
            type: Array,
            required: true,
            default: function() {return []},
        },
        listaunidades: {
            type: Array,
            required: true,
            default: function() {return []},
        },
        listacolor: {
            type: String,
            default: 'red',
        },
        listatitulo: {
            type: String,
            default: 'titulo default',
        },
    },
    computed: {
        listastyletit() {
            let colortitulo = this.listacolor;
            //if (localStorage.getItem('color') && localStorage.getItem('color') !== 'null') {
            //    colortitulo = localStorage.getItem('color');
            //}
            return 'font-weight: bold; border: none; background-color: ' + colortitulo;
        },
        listastylerec() {
            //return 'border: none; background-color: rgba(' + this.listacolor.slice(4,this.listacolor.length-1) + ',0.2)';
            return 'border: none; background-color: rgba(255,255,255,0.5)';
        },
        listastylerecuni() {
            return 'color: ' + this.listacolor;
        },
        listastyleuni() {
            //return 'color: ' + this.listacolor;
            return 'border-radius:5px;margin-right:10px;background-color:rgba(255,255,255,0.5);color:' + this.listacolor + ';min-width:2em;';
        },
    },
    methods: {
            listaactivasseccion(item) {
                this.$emit('activa-seccion', item);
                console.log(item);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
