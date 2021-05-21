<template>
    <div v-if="logourl" id="nca13_mnu_logo" class="row">
        <div v-if="this.rol == 'student' || this.rol == 'teacher'" style="width: 100%;" class="col">
            <img v-bind:src="logourl + logotipofiltrado + '.png'">
        </div>
        <div v-if="this.rol !== 'student' && this.rol !== 'teacher'" style="width: 100%;" class="col">
            <a v-bind:href="seccion"> 
                <img v-bind:src="logourl + logotipofiltrado + '.png'">
            </a>
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
            return this.logousuario.urlseccionactiva + '&sesskey=' + window.M.cfg.sesskey + '&edit=on';
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

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
