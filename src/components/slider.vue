<template>
    <div v-if="slider.jsonvisible" class="carousel slide carousel-fade">

        <div class="carousel-sesiones row" style="position:relative">
            <div v-for="(sesion, index) in sliderjson.sesiones" class="nca_carousel_sesiones_hija col" v-bind:style="stylesesion(sesion.numactividades)" v-bind:key="sesion">
                S-{{ index + 1 }}
            </div>
        </div>

        <div style="position:relative" class="carousel-indicators row">
            <div v-for="(activ, index) in sliderjson.actividades" v-bind:style="styleactividad(index)" v-bind:class="classactividad(index)" v-on:click="actualizarslider(index)" v-bind:key="activ">
                {{ contentactividad(index) }}
            </div>
        </div>

        <div class="carousel-inner">
            <div class="slider-vue carousel-item row">

                <div class="nca_book_slide_vue row">
                    <div class="col-md-1 title nca_book_orden" v-bind:style="styleorden()">
                        <div class="row align-items-center" style="text-align:center;">
                            <div class="col-md-3"><span class="carousel-control-prev-icon" aria-hidden="true" v-on:click="actualizarslider(activatras())"></span></div>
                            <div class="col-md-6"><h2>{{ contentactividad(activactivofiltrada) }}</h2></div>
                            <div class="col-md-3"><span class="carousel-control-next-icon" aria-hidden="true" v-on:click="actualizarslider(activdelante())"></span></div>
                        </div>
                    </div>

                    <div class="col-md-7">
                        <div class="col-md-12 nca_book_titulo">
                            <h2>{{ sliderjson.actividades[activactivofiltrada].titulo }}</h2>
                        </div>
                        <div class="col-md-12 left nca_book_descripcion" v-html="sliderjson.actividades[activactivofiltrada].descripcion"></div>
                    </div>

                    <div class="col-md-4">
                        <div class="nca_book_recursos" v-bind:style="'background-color:' + slidercolorAclarado(slidercolorFijo)">
                            <div class="row" v-for="(recur, index) in sliderjson.actividades[activactivofiltrada].recursos" v-bind:key="recur"> 
                                <div class="nca_book_recursos_col_long">
                                    {{ sliderjson.actividades[activactivofiltrada].recursos[index].titulo }}
                                </div>
                                <div v-if="(sliderjson.actividades[activactivofiltrada].recursos[index].tipo !== 'mat')" class="nca_book_recursos_col_short">
                                    <a class="nca_book_recursos_icon" v-bind:href="sliderjson.actividades[activactivofiltrada].recursos[index].url" target="_blank">
                                        <i v-bind:class="classicono(index)" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div v-if="sliderjson.actividades[activactivofiltrada].recursos[index].tipo == 'vid' && recursourlvideo(sliderjson.actividades[activactivofiltrada].recursos[index].url) !== ''" class="nca_book_recursos_col_long" style="height:0; width:100%; margin-top:20px; position:relative; padding-bottom:56.25%">
                                    <iframe v-bind:src="recursourlvideo(sliderjson.actividades[activactivofiltrada].recursos[index].url)" style="position: absolute; top: 0; left: 0; height:100%; width: 100%; padding-left: 20px; padding-right:20px; padding-bottom:20px; border: 0;"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div v-if="!slider.jsonvisible" v-html="slider.datos" class="carousel slide carousel-fade"> </div>

</template>

<script>
export default {
    name: 'slider',
    props: {
        sliderusuario: {
            type: Object,
            required: true,
            default: function() {return {}},
        },
        slider: {
            type: Object,
            required: true,
            default: function() {return {}},
        },
        slidercolor: { // TODO: Eliminar esta vinculacion porque no es necesaria
            type: String,
            required: false,
            default: 'red',
        },
    },
    data() {
        return {
            activactivo: 0,
            slidercolorFijo: this.sliderusuario.color,
        }
    },
    updated() {
        // Aquí están los elementos que se llaman cuando el componente se ha actualizado
        this.slidercolorFijo = this.sliderusuario.color;
        // Unimos las listas de recursos
        let arrayunida = this.arrayunida; // esto es una propiedad computed
        console.log('esto es el array unido con todos los elementos');
        console.log(arrayunida);
        //Aquí realizaremos el reemplazo dinámico de urls. por ahora definimos la función
        function textfinder (searchingtext, array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].titulo.split(" ")[0] == searchingtext) {
                //console.log (array[i]);
                return array[i];
                } else {
                //console.log (array[i].titulo.split(" ")[0] + '-------------' + searchingtext)
                }
            }
            return false;
        }
        // Sacamos todos los elementos con href del slider (no del json) y los reemplazamos
        var vinculoslista = document.querySelectorAll('.nca_book_recursos_col_short a[href]');
        for (var j = 0; j < vinculoslista.length; j++) {
            var vinculoinic = vinculoslista[j].getAttribute("href");
            //console.log(vinculoinic);
            var vinculohref = vinculoinic
            //console.log(vinculohref);
            if (textfinder(vinculohref,arrayunida)) {
                var vinculonuevo = textfinder(vinculohref,arrayunida).url;
                //console.log(vinculonuevo);
                if (vinculonuevo) {
                    vinculoslista[j].setAttribute("href",vinculonuevo);
                }
            }
        }
    },
    computed: {
        activactivofiltrada() {
            let temp = this.activactivo;
            if (this.sliderjson.actividades) {
                if (this.activactivo >= this.sliderjson.actividades.length) {
                    temp = 0;
                }
            }
            return temp;
        },
        sliderjson() {
            if (this.slider.jsonvisible) {
                return this.slider.datos;
            } else {
                return {};
            }
        },
        arrayunida() {
             let temp0 = [];
             if (this.sliderusuario.interactivas && this.sliderusuario.recursostitulo && this.sliderusuario.evaluaciones) {
                 temp0 = temp0.concat(this.sliderusuario.interactivas,this.sliderusuario.recursostitulo,this.sliderusuario.evaluaciones);
            }
            return temp0;
        },
    },
    methods: {
        slidercolorAclarado(color) {
            if (color.split("(").length > 1) {
                let valoresColor = color.split("(")[1].split(")")[0];
                valoresColor = 'rgba(' + valoresColor + ',.5)'
                return valoresColor;
            } else {
                return 'red'
            }
        },
        classactividad(index) {
            let temp1 = '';
            let temp2 = '';
            if (this.activactivofiltrada == index) {
                temp1 = ' active';
            }
            if (this.sliderjson.actividades[index].evaluable == true) {
                temp2 = ' nca_book_activ_eval';
            }
            return 'col' + temp1 + temp2;
        },
        classicono(index) {
            let temp1 = '';
            let temp2 = this.sliderjson.actividades[this.activactivofiltrada].recursos[index].tipo
            if (temp2 == 'rec') {temp1 = "fa fa-briefcase"}
            if (temp2 == 'cua') {temp1 = "fa fa-book"}
            if (temp2 == 'int') {temp1 = "fa fa-laptop"}
            if (temp2 == 'ext') {temp1 = "fa fa-external-link"}
            if (temp2 == 'eva') {temp1 = "fa fa-edit"}
            if (temp2 == 'ral') {temp1 = "fa fa-address-card"}
            if (temp2 == 'vid') {temp1 = "fa fa-film"}
            return temp1;
        },
        styleorden() {
           return 'background-color:' + this.slidercolorFijo + ';';
        },
        styleactividad(index) {
            let temp1 = '';
            let temp2 = 'background-color:' + this.slidercolorFijo + '; color:white;';
            if (this.activactivofiltrada == index) {
                return temp2;
            } else {
                return temp1;
            }
        },
        stylesesion(elems) {
            let temp1;
            temp1 = ( elems / this.sliderjson.actividades.length) * 100;
            return 'width:' + temp1 + '%;';
        },
        contentactividad(index) {
            let temp1 = '00' + (index+1);
            let temp2 = temp1.substring(temp1.length-2,temp1.length);
            return temp2;
        },
        actualizarslider(index) {
            this.activactivo = index;
        },
        activatras() {
            // mecanismo de seguridad por si hay guardado un activactivo de un slider previo con más número de actividades que el actual
            if (this.activactivofiltrada == 0) {
                this.activactivo = 0;
            }
            // mecanismo de seguridad para evitar valores negativos
            let temp1 = this.activactivo - 1;
            if (this.activactivo == 0) {
                return 0
            } else {
                return temp1;
            }
        },
        activdelante() {
            // mecanismo de seguridad por si hay guardado un activactivo de un slider previo con más número de actividades que el actual
            if (this.activactivofiltrada == 0) {
                this.activactivo = 0;
            }
            // mecanismo de seguridad para evitar valores mayores que el número de actividades del json
            let temp1 = this.activactivo + 1;
            if (this.activactivo == (this.sliderjson.actividades.length - 1) ) {
                return this.activactivo;
            } else {
                return temp1;
            }
        },
        recursourlvideo(url) {
            let temp1 = '';
            if (url && url.indexOf('www.yout') > -1 && url.split('v=')[1]) {
                var video_id = url.split('v=')[1];
                var ampersandPosition = video_id.indexOf('&');
                if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
                }
                temp1 = 'https://www.youtube.com/embed/' + video_id
            }
            return temp1
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
