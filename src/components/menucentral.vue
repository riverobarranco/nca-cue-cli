<template>
    <div id="nca13_mnu_intro" class="container" v-if="centralusuario.estado == 0">     
        <div class="centrador">
            <div class="parte1">
                <div class="itemGroup itemGroup">
                    <div class="item">
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-1.png'" width="100" height="100" /></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-1.png'" width="100" height="100" /></p>
                        <p></p>
                    </div>
                </div>
                <div class="itemGroup itemGroup">
                    <div class="item">
                        <p></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-2.png'" width="100" height="100" /></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-2.png'" width="100" height="100" /></p>
                        <p></p>
                    </div>
                </div>
                <div class="itemGroup itemGroup">
                    <div class="item">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-3.png'" width="100" height="100" /></p>
                        <p></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-3.png'" width="100" height="100" /></p>
                        <p></p>
                    </div>
                </div>
                <div class="itemGroup itemGroup">
                    <div class="item">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-4.png'" width="100" height="100" /></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-4.png'" width="100" height="100" /></p>
                        <p></p>
                    </div>
                </div>
                <div class="itemGroup itemGroup">
                    <div class="item">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-5.png'" width="100" height="100" /></p>
                        <p><img v-if="centralusuario.urlmenulateral !== ''" v-bind:src="centralusuario.urlmenulateral + 'Loader-5.png'" width="100" height="100" /></p>
                        <p></p>
                    </div>
                </div>
            </div>
            <div class="parte2">
                <h1>
                {{ centralusuario.introbienvenida[centralusuario.lang] }}
                </h1>
                <p>
                {{ centralusuario.intromensaje[centralusuario.lang] }}
                </p>
            </div>
        </div>
    </div>

    <div id="nca13_mnu_ctrl" class="container">
        <div class="row">
            <div class="col nca13-mnu-ctrl-mas" v-bind:style="centralstylemas" v-on:click="actualizarecursoactivo">
            <h2>+</h2>
            </div>
            <div class="col nca13-mnu-ctrl-tit">
                <div class="titulo">
                    <p id="nca13-mnu-subtitulo">{{ centralusuario.subtipoactivorotulito }}</p>
                    <p id="nca13-mnu-titulo">{{ centralusuario.subtipoactivorotulo }}</p>
                </div>
            </div>
            <div class="col nca13-mnu-ctrl-icon">
                <img v-if="centralurllogo !== 'vacio'" id="nca13-mnu-imagen" v-bind:src="centralurllogo" style="width:100%">
            </div>
        </div>

        <div id="nca13-mnu-ctrl-recursos" class="row justify-content-start" v-if="centralrecursosactivo">
            <div class="col-auto" v-if="sliderdatos.tipo == 'json'">
                <div v-bind:style="centralstylerec" style="cursor:pointer;" class="nca13-mnu-ctrl-recursos-elem" v-on:click="generapdf(sliderdatos.datos)">{{ guiatraducida[centralusuario.lang] }}</div>
            </div>
            <div class="col-auto" v-for="recurso in centralrecursostitulofiltrado" v-bind:key="recurso">
                <a target="_blank" v-bind:href="recurso.url" v-bind:style="centralstylerec">
                    <div class="nca13-mnu-ctrl-recursos-elem">{{ recurso.texto }}</div>
                </a>
            </div>
        </div>

        <div id="nca13-mnu-ctrl-interactivas" class="row justify-content-end" v-bind:data-slider="centralsliderfiltrado">
            <a target="_blank" v-for="interactiva in centralinteractivasfiltrado" v-bind:key="interactiva"  v-bind:href="interactiva.url">
                <div class="col-auto" v-bind:style="centralstyleint">
                    {{ interactiva.indice }}
                </div>
            </a>
        </div>
    </div>

    <slider v-bind:sliderusuario="centralusuario" v-bind:slider="sliderdatos"></slider>

</template>

<script>
import slider from './slider.vue'
import axios from 'axios';

export default {
    name: 'menucentral',
    components: {
        slider,
    },
    emits: ['genera-pdf'],
    props: {
      centralusuario: {
        type: Object,
        default: function() {return {}},
      },
    },
    data() {
      return {
        centralrecursosactivo: false,
        guiatraducida: {
          es: "Guía actividades",
          eu: "Jarduera gida",
          ca: "Guía actividades catalá",
          gl: "Guía activdiades galego",
          ca_valencia: "Guía actividades valenciá",
          en: "Guía de actividades english",
        },
        tipoactivoFijo : this.centralusuario.tipoactivo,
        sliderdatos: {jsonvisible: false, tipo: null, datos:''},
      }
    },
    updated() {
      this.tipoactivoFijo = this.centralusuario.tipoactivo;
      console.log(this.sliderdatos);
    },
    methods: {
        innerfiltroccaa(elem, index, array) {
            let temp1 = true;
            for (let i=0; i < array.length; i++) {
                if (elem.titulo.split("-")[4] == array[i].titulo.split("-")[4] && elem.titulo.split("-")[1] == array[i].titulo.split("-")[1] && elem.titulo.split("-")[2] == "0" && i !== index) {
                    temp1 = false;
                }
            }
            return temp1;
        },
        innerfiltrolang(innerlang) {
            return function(elem, index, array) {
                let temp1 = true;
                for (let i=0; i < array.length; i++) {
                    if (  elem.titulo.split("-")[4] == array[i].titulo.split("-")[4] &&
                            elem.titulo.split("-")[2] == array[i].titulo.split("-")[2] && 
                            elem.titulo.split("-")[1] !== array[i].titulo.split("-")[1] &&
                            elem.titulo.split("-")[1] !== innerlang &&
                            i !== index
                        ) {
                            temp1 = false;
                    }
                }
                return temp1;
            }
        },
        centralslidercargado(sliderfiltrado) {
            let temp0 = sliderfiltrado;
            //let pasadatos = {tipo:'html', jsonvisible:false, datos: ''};
            let pasadatos = this.sliderdatos;
            let url;
            if (temp0 && temp0[0] && temp0[0].url) {
                // marcamos el tipo de slider para pintarlo bien
                if (temp0[0].indice !== "JS") {
                    pasadatos.tipo = 'html';
                    url = temp0[0].url;
                } else {
                    pasadatos.tipo = 'json';
                    url = '/local/slider/getslider.php?slidername=' + temp0[0].titulo.split(' ')[0];
                }
                // hacemos la consulta para actualizar los valores del slider
                axios.get(url)
                .then(function (response) {
                // handle success
                    if (pasadatos.tipo == 'html') {
                        var e = document.createElement("div");
                        e.innerHTML = response.data;
                        pasadatos.datos = e.querySelector('#region-main .box').innerHTML;
                        pasadatos.jsonvisible = false;
                    }
                    if (pasadatos.tipo == 'json') {
                        pasadatos.datos = response.data;
                        pasadatos.jsonvisible = true;
                    }
                    console.log('esto es la respuesta de la consulta get');
                    console.log(response.data);
                    console.log('esto es el objeto pasadatos');
                    console.log(pasadatos);
                })
                .catch(function (error) {
                    console.log(error)
                }) //handle error
                .then(function () {}); // always executed
                
            } else {
                // esto es lo que se ejecuta en el caso de que no haya slider, se oculta todo.
                pasadatos.jsonvisible = false;
                pasadatos.datos = '';
                pasadatos.tipo = 'html';
            }
        },
        actualizarecursoactivo() {
        this.centralrecursosactivo = !this.centralrecursosactivo;
        },
        generapdf(item) {
            this.$emit('genera-pdf', item);
            console.log(item);
        },
    },
    computed: {
        centralstyleint() {
            return "background-color:" + this.centralusuario.color + "; background-image:url('" + this.centralusuario.urlmenulateral + this.tipoactivoFijo.toUpperCase() + ".png')";
        },
        centralstylemas() {
            return 'background-color: ' + this.centralusuario.color;
        },
        centralstylerec() {
            return 'font-weight: bold; color: ' + this.centralusuario.color;
        },
        centralurllogo() {
            if (this.centralusuario.subtipoactivoimagen !== "") {
                return this.centralusuario.urlmenulateral + this.centralusuario.subtipoactivoimagen;
            } else {
                return 'vacio';
            }
        },
        centralrecursostitulofiltrado () {
            var temp0 = this.centralusuario.recursostitulo;
            console.log('recursos inicial es: ' + temp0);
            // Filtro por rol. Ocultamos los recursos didacticos si el rol es student;
            if (this.centralusuario.rol == "student") {
                temp0 = temp0.filter(elem => elem.indice !== "RD")
                console.log('recursos filtro por rol queda: ');
                console.log(temp0);
            }
            // Filtro por ccaa 1. Eliminamos los elementos de ccaa ajenas al usuario;
            if (this.centralusuario.ccaa && this.centralusuario.ccaa !== "") {
                temp0 = temp0.filter(elem => elem.titulo.split("-")[2] == "0" || elem.titulo.split("-")[2] == this.centralusuario.ccaa);
                console.log('recursos filtro por ccaa-1 queda: ');
                console.log(temp0);
            }
            // Filtro por ccaa 2. Si hay dos elementos de igual indice e idioma pero ccaa estatal y autonomica eliminamos la estatal;
            if (this.centralusuario.ccaa && this.centralusuario.ccaa !== "") {
                temp0 = temp0.filter(this.innerfiltroccaa, temp0);
                console.log('recursos filtro por ccaa-2 queda: ');
                console.log(temp0);
            }
            // Filtro por idioma. Si hay dos elementos de igual indice y ccaa pero idioma distinto eliminamos la que tiene idioma distinto al usuario;
            var langtrad = {es: "CAS", en:"ENG", eu:"EUS", ca:"CAT", ca_valencia:"VAL", gl:"GAL"};
            var langactivo = langtrad[this.centralusuario.lang];
            if (this.centralusuario.lang && this.centralusuario.lang !== "" && langtrad[this.centralusuario.lang]) {
                temp0 = temp0.filter(this.innerfiltrolang(langactivo), temp0);
                console.log('recursos filtro por idioma queda: ');
                console.log(temp0);
            }
            // Fin de filtros. 
            return temp0;
        },
        centralinteractivasfiltrado () {
            let temp0 = this.centralusuario.interactivas;
            console.log('interactivas inicial es: ');
            console.log(temp0);
            // Filtro por calificación. Si la interactiva es evaluable añade paréntesis al texto indice para resaltarla
            temp0.forEach(function(part,index) {
                if (this[index].titulo.split("-")[3] == "SI") {
                    this[index].indice = '(' + this[index].indice + ')';
                }
            }, temp0);
            // Filtro por rol. Ninguno; Si se quiere una interactiva oculta al alumno hacer el elemento moodle oculto.
            // Filtro por ccaa 1. Eliminamos los elementos de ccaa ajenas al usuario;
            if (this.centralusuario.ccaa && this.centralusuario.ccaa !== "") {
                temp0 = temp0.filter(elem => elem.titulo.split("-")[2] == "0" || elem.titulo.split("-")[2] == this.centralusuario.ccaa);
                console.log('interactivas filtro por ccaa-1 queda: ');
                console.log(temp0);
            }
            // Filtro por ccaa 2. Si hay dos elementos de igual indice e idioma pero ccaa estatal y autonomica eliminamos la estatal;
            if (this.centralusuario.ccaa && this.centralusuario.ccaa !== "") {
                temp0 = temp0.filter(this.innerfiltroccaa, temp0);
                console.log('interactivas filtro por ccaa-2 queda: ');
                console.log(temp0);
            }
            // Filtro por idioma. Si hay dos elementos de igual indice y ccaa pero idioma distinto eliminamos la que tiene idioma distinto al usuario;
            var langtrad = {es: "CAS", en:"ENG", eu:"EUS", ca:"CAT", ca_valencia:"VAL", gl:"GAL"};
            var langactivo = langtrad[this.centralusuario.lang];
            if (this.centralusuario.lang && this.centralusuario.lang !== "" && langtrad[this.centralusuario.lang]) {
                temp0 = temp0.filter(this.innerfiltrolang(langactivo), temp0);
                console.log('interactivas filtro por idioma queda: ')
                console.log(temp0);
            }
            // Fin de filtros. 
            return temp0;
        },
        centralsliderfiltrado () {
            var temp0 = this.centralusuario.slider;
            console.log('slider inicial es: ' + temp0);
            // Filtro por rol. Ocultamos los slider de profesor;
            if (this.centralusuario.rol == "student") {
                temp0 = temp0.filter(elem => elem.indice !== "PF")
                temp0 = temp0.filter(elem => elem.indice !== "JS")
            } else {
                temp0 = temp0.filter(elem => elem.indice !== "AL")
            }
            console.log('slider filtro por rol queda: ' + temp0);
            // Filtro por ccaa 1. Eliminamos los elementos de ccaa ajenas al usuario;
            if (this.centralusuario.ccaa && this.centralusuario.ccaa !== "") {
                temp0 = temp0.filter(elem => elem.titulo.split("-")[2] == "0" || elem.titulo.split("-")[2] == this.centralusuario.ccaa);
            }
            console.log('slider filtro por ccaa-1 queda: ');
            console.log(temp0);
            // Filtro por ccaa 2. Si hay dos elementos de igual indice e idioma pero ccaa estatal y autonomica eliminamos la estatal;
            if (this.centralusuario.ccaa && this.centralusuario.ccaa !== "") {
                temp0 = temp0.filter(this.innerfiltroccaa, temp0);
                console.log('slider filtro por ccaa-2 queda: ');
                console.log(temp0);
            }
            // Filtro por idioma. Si hay dos elementos de igual indice y ccaa pero idioma distinto eliminamos la que tiene idioma distinto al usuario;
            var langtrad = {es: "CAS", en:"ENG", eu:"EUS", ca:"CAT", ca_valencia:"VAL", gl:"GAL"};
            var langactivo = langtrad[this.centralusuario.lang];
            if (this.centralusuario.lang && this.centralusuario.lang !== "" && langtrad[this.centralusuario.lang]) {
                temp0 = temp0.filter(this.innerfiltrolang(langactivo), temp0);
                console.log('slider filtro por idioma queda: ');
                console.log(temp0);
            }
            // Filtro por origen de datos. Si existe un slider SLDR.JS, deja únicamente ese.
            let temp2 = temp0.filter(elem => elem.indice !== "JS")
            if (temp2.length > 0) {
                temp0 = temp2
            }
            console.log('slider filtro por origen de datos queda: ');
            console.log(temp0);
            this.centralslidercargado(temp0);
            return temp0;
        },

    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
