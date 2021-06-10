<template>
    <div v-if="logourl" id="nca13_mnu_logo" class="row">
        <div v-if="this.rol == 'student' || this.rol == 'teacher'" style="width: 100%;" class="col">
            <img v-bind:src="logourl + logotipofiltrado + '.png'">
        </div>
        <div v-if="this.rol !== 'student' && this.rol !== 'teacher'" v-on:click="editaSeccion" style="width:100%; cursor:pointer" class="col">
            <img v-bind:src="logourl + logotipofiltrado + '.png'">
        </div>
    </div>
</template>

<script>
export default {
    name: 'logo',
    props: {
        logousuario: {
            type: Object,
            default: function() {return {}},
        },
    },
    computed: {
        logotipo() {
        return this.logousuario.tipoactivo;
        },
        logourl() {
        return this.logousuario.urlmenulateral;
        },
        idioma() {
        return this.logousuario.lang;
        },
        seccion() {
            if (window.location.href.indexOf('section=') > -1 && window.M.cfg.sesskey && window.location.href.split('&')) {
                let urlSinSeccion = window.location.href.split('&')[0] + '&sesskey=' + window.M.cfg.sesskey + '&edit=off';
                return urlSinSeccion;
            } else {
                //return this.logousuario.urlseccionactiva + '&sesskey=' + window.M.cfg.sesskey + '&edit=on';
                let urlSinSeccion = window.location.href.split('&')[0] + '&section=1' + '&sesskey=' + window.M.cfg.sesskey + '&edit=on';
                return urlSinSeccion;
            }
        },
        rol() {
            return this.logousuario.rol
        },
        logotipofiltrado() {
        if (this.logotipo == '' || !this.logotipo) {
            return 'def';
        } else {
            if (this.idioma == 'eu') {
            return this.logotipo + '-eu';
            } else {
            return this.logotipo
            }
        }
        },
    },
    methods: {
        editaSeccion() {
            // obtenemos la url destino en función de si está o no editando y guardamos la sesión activa
            let urlSinSeccion = '';
            if (window.location.href.indexOf('section=') > -1 && window.M.cfg.sesskey && window.location.href.split('&')) {
                // aquí estamos editando un sección
                urlSinSeccion = window.location.href.split('&')[0] + '&sesskey=' + window.M.cfg.sesskey + '&edit=off';
                // guardamos en la memoria del explorador la sección activa
                if (this.logousuario.urlseccionactiva.indexOf('section=') > -1) {
                    //localStorage.setItem("tipoactivo", this.logousuario.tipoactivo);
                    //localStorage.setItem("subtipoactivo", this.logousuario.subtipoactivo);
                    //localStorage.setItem("seccionactiva", this.logousuario.urlseccionactiva);
                    //localStorage.setItem("color", this.logousuario.color);
                    //alert(this.logousuario.urlseccionactiva)
                }
                // Vamos a la url indicada en la misma pestaña
                window.open(urlSinSeccion, "_self");
            } else {
                // aquí estamos en la página inicial del curso, o sea, no estamos editando
                if (this.logousuario.urlseccionactiva !== '') {
                    urlSinSeccion = this.logousuario.urlseccionactiva  + '&sesskey=' + window.M.cfg.sesskey + '&edit=on';
                    // borramos en la memoria del explorador la sección activa
                    //alert('la seccion activa es ' + this.logousuario.urlseccionactiva)
                    localStorage.setItem("tipoactivo", this.logousuario.tipoactivo);
                    localStorage.setItem("subtipoactivo", this.logousuario.subtipoactivo);
                    localStorage.setItem("seccionactiva", this.logousuario.urlseccionactiva);
                    localStorage.setItem("color", this.logousuario.color);
                    // Vamos a la url indicada en la misma pestaña
                    window.open(urlSinSeccion, "_self");
                }
            }
        } 
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
