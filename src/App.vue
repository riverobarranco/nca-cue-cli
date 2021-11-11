<template>
  <botoncolapsa v-bind:lateralvisible="datosusuario.lateralvisible" @toglea-estado="togleaestadolateral()"></botoncolapsa>
  <div id="app-ltrl">
    <logo v-bind:logousuario="datosusuario"></logo>
    <iconos v-bind:iconosurl="datosusuario.urlmenulateral" v-bind:iconostipos="tipos" v-bind:iconoslang="datosusuario.lang" @activa-tipo="activatipo"></iconos>
    <botones v-bind:botonestipo="datosusuario.tipoactivo" v-bind:botonessubtipos="tipoactivosubtipos" v-bind:botonestitulo="tipoactivotitulo" v-bind:botonesccaa="datosusuario.ccaa" @activa-subtipo="activasubtipo"></botones>
    <lista @activa-seccion="cargaseccion" v-bind:listasubtipo="datosusuario.subtipoactivo" v-bind:listatitulo="subtipoactivotitulo" v-bind:listaunidades="subtipoactivounidades" v-bind:listarecursos="subtipoactivorecursos" v-bind:listacolor="subtipoactivocolor"></lista>
  </div>
  <menucentral @genera-pdf="generapdf" v-bind:centralusuario="datosusuario"></menucentral>
</template>

<script>
import botoncolapsa from './components/botoncolapsa.vue'
import logo from './components/logo.vue'
import iconos from './components/iconos.vue'
import botones from './components/botones.vue'
import lista from './components/lista.vue'
import menucentral from './components/menucentral.vue'
import axios from 'axios';
import { jsonToPdf } from './assets/jsonToPdf2/sliderpdf';

export default {
  name: 'App',
  components: {
    botoncolapsa,
    logo,
    iconos,
    botones,
    lista,
    menucentral,
  },
  data() {
      return {
        datosusuario: {
          lateralvisible: true,  //esto es el elemento que marca la visibilidad o no del menú lateral
          tipoactivo: "",
          subtipoactivo: "",
          subtipoactivorotulo: "",
          subtipoactivoimagen: "",
          subtipoactivorotulito: "",
          sliderjsonvisible: false,  // esto es para marcar si se inyecta el slider desde html o desde el json. hay que añadir esa consulta a la orden.
          //slideractivactivo: 0, // esto es la actividad activa en el slider
          urlmenulateral: "",
          urlseccionactiva:"",
          ccaa: "datoccaa",
          lang: "datolang",
          rol: "datorol",
          recursosglobales: [], // esto es el array con los recursos relativos al NCA al completo, aparecerán botones en la portada de bienvenida.
          recursostitulo: [],
          interactivas: [],
          slider: [],
          evaluaciones: [],
          urliconoinsertado: "",
          urlsliderfiltrado: "",
          color: "lightgray",
          estado: 0,
          introbienvenida: {
              es: "Bienvenido",
              eu: "Ongietorri",
              ca: "Benvingut",
              gl: "Benvido",
              ca_valencia: "Benvingut",
              en: "Welcome",                  
          },
          intromensaje: {
              es: "Pulse sobre un tipo de contenido para comenzar",
              eu: "Egin klik hasteko eduki mota batean",
              ca: "Premi sobre un tipus de contingut per començar",
              gl: "Fai clic nun tipo de contido para comezar",
              ca_valencia: "Premi sobre un tipus de contingut per començar",
              en: "Click on any content type to begin", 
          },
        },
        sliderjson : {  // esto es para el slider dinámico
        },
        datos: {
          acg: {
              nom: "ACG",
              titulo: {
                  es: "Acogidas",
                  eu: "Harrera",
                  ca: "Acollides",
                  gl: "Acollidas",
                  ca_valencia: "Acollides",
                  en: "Welcome",
              },
              hijos: {
                  acg: {
                      nom: "ACG",
                      color: "rgb(166,202,236)",
                      subtitulo: {
                          es: "REC. ACOGIDAS",
                          eu: "HARRERA",
                          ca: "ACOLLIDA",
                          gl: "ACOLLIDA",
                          ca_valencia: "ACOLLIDA",
                          en: "WELCOME",
                      },
                      unidades: [],
                      recursos: [],
                  }
              }
          },
          pro: {
              nom: "PRO",
              titulo: {
                  es: "Proyectos",
                  eu: "Proiektua",
                  ca: "Projectes",
                  gl: "Proxectos",
                  ca_valencia: "Projectes",
                  en: "Projects",
              },
              hijos: {
                  p01: {
                      nom: "01",
                      color: "rgb(231,18,124)",
                      subtitulo: {
                          es: "PROYECTO 01",
                          eu: "01 PROIEKTUA",
                          ca: "PROJECTE 01",
                          gl: "PROXECTO 01",
                          ca_valencia: "PROJECTE 01",
                          en: "PROJECT 01",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p02: {
                      nom: "02",
                      color: "rgb(81,175,65)",
                      subtitulo: {
                          es: "PROYECTO 02",
                          eu: "02 PROIEKTUA",
                          ca: "PROJECTE 02",
                          gl: "PROXECTO 02",
                          ca_valencia: "PROJECTE 02",
                          en: "PROJECT 02",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p03: {
                      nom: "03",
                      color: "rgb(241,133,28)",
                      subtitulo: {
                          es: "PROYECTO 03",
                          eu: "03 PROIEKTUA",
                          ca: "PROJECTE 03",
                          gl: "PROXECTO 03",
                          ca_valencia: "PROJECTE 03",
                          en: "PROJECT 03",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p04: {
                      nom: "04",
                      color: "rgb(110,67,35)",
                      subtitulo: {
                          es: "PROYECTO 04",
                          eu: "04 PROIEKTUA",
                          ca: "PROJECTE 04",
                          gl: "PROXECTO 04",
                          ca_valencia: "PROJECTE 04",
                          en: "PROJECT 04",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p05: {
                      nom: "05",
                      color: "rgb(90,43,134)",
                      subtitulo: {
                          es: "PROYECTO 05",
                          eu: "05 PROIEKTUA",
                          ca: "PROJECTE 05",
                          gl: "PROXECTO 05",
                          ca_valencia: "PROJECTE 05",
                          en: "PROJECT 05",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p06: {
                      nom: "06",
                      color: "rgb(143,146,144)",
                      subtitulo: {
                          es: "PROYECTO 06",
                          eu: "06 PROIEKTUA",
                          ca: "PROJECTE 06",
                          gl: "PROXECTO 06",
                          ca_valencia: "PROJECTE 06",
                          en: "PROJECT 06",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p07: {
                      nom: "07",
                      color: "rgb(192,211,80)",
                      subtitulo: {
                          es: "PROYECTO 07",
                          eu: "07 PROIEKTUA",
                          ca: "PROJECTE 07",
                          gl: "PROXECTO 07",
                          ca_valencia: "PROJECTE 07",
                          en: "PROJECT 07",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p08: {
                      nom: "08",
                      color: "rgb(32,103,54)",
                      subtitulo: {
                          es: "PROYECTO 08",
                          eu: "08 PROIEKTUA",
                          ca: "PROJECTE 08",
                          gl: "PROXECTO 08",
                          ca_valencia: "PROJECTE 08",
                          en: "PROJECT 08",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  p09: {
                      nom: "09",
                      color: "rgb(194,27,45)",
                      subtitulo: {
                          es: "PROYECTO 09",
                          eu: "09 PROIEKTUA",
                          ca: "PROJECTE 09",
                          gl: "PROXECTO 09",
                          ca_valencia: "PROJECTE 09",
                          en: "PROJECT 09",
                      },
                      unidades: [],
                      recursos: [],
                  },
//                  p10: {
//                      nom: "10",
//                      color: "rgb(183,158,203)",
//                      subtitulo: {
//                          es: "PROYECTO 10",
//                          eu: "10 PROIEKTUA",
//                          ca: "PROJECTE 10",
//                          gl: "PROXECTO 10",
//                          ca_valencia: "PROJECTE 10",
//                          en: "PROJECT 10",
//                      },
//                      unidades: [],
//                      recursos: [],
//                  },
//                  p11: {
//                      nom: "11",
//                      color: "rgb(74,157,215)",
//                      subtitulo: {
//                          es: "PROYECTO 11",
//                          eu: "11 PROIEKTUA",
//                          ca: "PROJECTE 11",
//                          gl: "PROXECTO 11",
//                          ca_valencia: "PROJECTE 11",
//                          en: "PROJECT 11",
//                      },
//                      unidades: [],
//                      recursos: [],
//                  },
//                  p12: {
//                      nom: "12",
//                      color: "rgb(43,58,140)",
//                      subtitulo: {
//                          es: "PROYECTO 12",
//                          eu: "12 PROIEKTUA",
//                          ca: "PROJECTE 12",
//                          gl: "PROXECTO 12",
//                          ca_valencia: "PROJECTE 12",
//                          en: "PROJECT 12",
//                      },
//                      unidades: [],
//                      recursos: [],
//                  },
              }
          },
          sem: {
              nom: "SEM",
              titulo: {
                  es: "Seminarios",
                  eu: "Mintegia",
                  ca: "Seminaris",
                  gl: "Seminarios",
                  ca_valencia: "Seminaris",
                  en: "Seminars",
              },
              hijos: {
                  mat: {
                      nom: "MAT",
                      color: "rgb(243,146,0)",
                      subtitulo: {
                          es: "MATEMÁTICAS",
                          eu: "MATEMATIKA",
                          ca: "MATEMÀTIQUES",
                          gl: "MATEMÁTICAS",
                          ca_valencia: "MATEMÀTIQUES",
                          en: "MATHS",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  soc: {
                      nom: "SOC",
                      color: "rgb(40,53,131)",
                      subtitulo: {
                          es: "C. SOCIALES",
                          eu: "GIZARTE ZIENTZIAK",
                          ca: "C.S.C.M. SOCIAL",
                          gl: "CIENCIAS SOCIAIS",
                          ca_valencia: "CIÈNCIES SOCIALS",
                          en: "SOCIAL SCIENCE",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  nat: {
                      nom: "NAT",
                      color: "rgb(63,165,53)",
                      subtitulo: {
                          es: "C. NATURALES",
                          eu: "NATUR ZIENTZIAK",
                          ca: "C.N.C.M. NATURAL",
                          gl: "CIENCIAS NATURAIS",
                          ca_valencia: "CIÈNCIES NATURALS",
                          en: "NATURAL SCIENCE",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Inglés para toda España salvo para Cataluña
                  eng: {
                      nom: "ENG",
                      color: "rgb(183,20,82)",
                      ccaa: ["1","2","3","4","5","6","7","8","10","11","12","13","14","15","16","17","18","19"],  //Cataluña no tiene este inglés
                      subtitulo: {
                          es: "ENGLISH LANGUAGE",
                          eu: "ENGLISH LANGUAGE",
                          ca: "ENGLISH LANGUAGE",
                          gl: "ENGLISH LANGUAGE",
                          ca_valencia: "ENGLISH LANGUAGE",
                          en: "ENGLISH LANGUAGE",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Inglés para Cataluña
                  enc: {
                      nom: "ENG",
                      color: "rgb(183,20,82)",
                      ccaa: ["9"],  //Cataluña tiene este inglés
                      subtitulo: {
                          es: "ENGLISH LANGUAGE CAT",
                          eu: "ENGLISH LANGUAGE CAT",
                          ca: "ENGLISH LANGUAGE CAT",
                          gl: "ENGLISH LANGUAGE CAT",
                          ca_valencia: "ENGLISH LANGUAGE CAT",
                          en: "ENGLISH LANGUAGE CAT",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Castellano en general, salvo Cataluña
                  cas: {
                      nom: "CAS",
                      color: "rgb(236,179,127)",
                      ccaa: ["1","2","3","4","5","6","7","8","10","11","12","13","14","15","16","17","18","19"], //Cataluña no tiene este castellano
                      subtitulo: {
                          es: "LENGUA CASTELLANA",
                          eu: "LENGUA CASTELLANA",
                          ca: "LENGUA CASTELLANA",
                          gl: "LENGUA CASTELLANA",
                          ca_valencia: "LENGUA CASTELLANA",
                          en: "LENGUA CASTELLANA",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Castellano de Euskadi
                  cse: {
                      nom: "CAS",
                      color: "rgb(236,179,127)",
                      ccaa: ["16"], 
                      subtitulo: {
                          es: "LENGUA CASTELLANA EUS",
                          eu: "LENGUA CASTELLANA EUS",
                          ca: "LENGUA CASTELLANA EUS",
                          gl: "LENGUA CASTELLANA EUS",
                          ca_valencia: "LENGUA CASTELLANA EUS",
                          en: "LENGUA CASTELLANA EUS",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Castellano de Cataluña
                  csc: {
                      nom: "CAS",
                      color: "rgb(236,179,127)",
                      ccaa: ["9"], 
                      subtitulo: {
                          es: "LENGUA CASTELLANA CAT",
                          eu: "LENGUA CASTELLANA CAT",
                          ca: "LENGUA CASTELLANA CAT",
                          gl: "LENGUA CASTELLANA CAT",
                          ca_valencia: "LENGUA CASTELLANA CAT",
                          en: "LENGUA CASTELLANA CAT",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  eus: {
                      nom: "EUS",
                      color: "rgb(202,158,103)",
                      ccaa: ["16"],
                      subtitulo: {
                          es: "EUSKARA",
                          eu: "EUSKARA",
                          ca: "EUSKARA",
                          gl: "EUSKARA",
                          ca_valencia: "EUSKARA",
                          en: "EUSKARA",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // catalán en Baleares
                  cat: {
                      nom: "CAT",
                      color: "rgb(202,158,103)",
                      ccaa: ["4"],
                      subtitulo: {
                          es: "LLENGUA CATALANA (BAL)",
                          eu: "LLENGUA CATALANA (BAL)",
                          ca: "LLENGUA CATALANA (BAL)",
                          gl: "LLENGUA CATALANA (BAL)",
                          ca_valencia: "LLENGUA CATALANA (BAL)",
                          en: "LLENGUA CATALANA (BAL)",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Catalán en Cataluña
                  ctc: {
                      nom: "CAT",
                      color: "rgb(202,158,103)",
                      ccaa: ["9"],
                      subtitulo: {
                          es: "LLENGUA CATALANA",
                          eu: "LLENGUA CATALANA",
                          ca: "LLENGUA CATALANA",
                          gl: "LLENGUA CATALANA",
                          ca_valencia: "LLENGUA CATALANA",
                          en: "LLENGUA CATALANA",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  gal: {
                      nom: "GAL",
                      color: "rgb(202,158,103)",
                      ccaa: ["12"],
                      subtitulo: {
                          es: "LINGUA GALEGA",
                          eu: "LINGUA GALEGA",
                          ca: "LINGUA GALEGA",
                          gl: "LINGUA GALEGA",
                          ca_valencia: "LINGUA GALEGA",
                          en: "LINGUA GALEGA",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  val: {
                      nom: "VAL",
                      color: "rgb(202,158,103)",
                      ccaa: ["10"],
                      subtitulo: {
                          es: "VALENCIÀ",
                          eu: "VALENCIÀ",
                          ca: "VALENCIÀ",
                          gl: "VALENCIÀ",
                          ca_valencia: "VALENCIÀ",
                          en: "VALENCIÀ",
                      },
                      unidades: [],
                      recursos: [],
                  },
              }
          },
          tll: {
              nom: "TLL",
              titulo: {
                  es: "Talleres",
                  eu: "Tailerra",
                  ca: "Tallers",
                  gl: "Obradoiros",
                  ca_valencia: "Tallers",
                  en: "Workshops",
              },
              hijos: {
                  // Educación Religiosa Escolar
                  ere: {
                      nom: "ERE",
                      color: "rgb(239,179,175)",
                      subtitulo: {
                          es: "ERE",
                          eu: "ERLIJIOA",
                          ca: "ERE",
                          gl: "ERE",
                          ca_valencia: "ERE",
                          en: "ERE",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Educación en valores, visible en Andalucía
//                  evl: {
//                      nom: "EVL",
//                      color: "rgb(117,97,87)",
//                      ccaa: ["1"],
//                      subtitulo: {
//                          es: "EDUC. VALORES",
//                          eu: "EDUC. VALORES",
//                          ca: "EDUC. VALORES",
//                          gl: "EDUC. VALORES",
//                          ca_valencia: "EDUC. VALORES",
//                          en: "EDUC. VALORES",
//                      },
//                      unidades: [],
//                      recursos: [],
//                  },
                  efe: {
                      nom: "EF",
                      color: "rgb(0,159,227)",
                      subtitulo: {
                          es: "EDUCACIÓN FÍSICA",
                          eu: "GORPUTZ HEZKUNTZA",
                          ca: "EDUCACIÓ FÍSICA",
                          gl: "EDUCACIÓN FÍSICA",
                          ca_valencia: "EDUCACIÓ FÍSICA",
                          en: "PHYSICAL EDUCATION",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  pla: {
                      nom: "PLA",
                      color: "rgb(250,186,74)",
                      subtitulo: {
                          es: "PLÁSTICA",
                          eu: "PLASTIKA",
                          ca: "PLÀSTICA",
                          gl: "PLÁSTICA",
                          ca_valencia: "PLÀSTICA",
                          en: "ARTS AND CRAFTS",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Música para todas las ccaa salvo cataluña
                  mus: {
                      nom: "MUS",
                      color: "rgb(120,62,144)",
                      ccaa: ["1","2","3","4","5","6","7","8","10","11","12","13","14","15","16","17","18","19"],  //Cataluña no tiene esta música
                      subtitulo: {
                          es: "MÚSICA",
                          eu: "MUSIKA",
                          ca: "MÚSICA",
                          gl: "MÚSICA",
                          ca_valencia: "MÚSICA",
                          en: "MUSIC",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  // Música para cataluña
                  msc: {
                      nom: "MSC",
                      color: "rgb(120,62,144)",
                      ccaa: ["9"],
                      subtitulo: {
                          es: "MÚSICA CAT",
                          eu: "MUSIKA CAT",
                          ca: "MÚSICA CAT",
                          gl: "MÚSICA CAT",
                          ca_valencia: "MÚSICA CAT",
                          en: "MUSIC CAT",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  wkp: {
                      nom: "WKP",
                      color: "rgb(83,165,73)",
                      subtitulo: {
                          es: "WAKE UP",
                          eu: "WAKE UP",
                          ca: "WAKE UP",
                          gl: "WAKE UP",
                          ca_valencia: "WAKE UP",
                          en: "WAKE UP",
                      },
                      unidades: [],
                      recursos: [],
                  },
                  int: {
                      nom: "INT",
                      color: "rgb(202,23,23)",
                      subtitulo: {
                          es: "T. INTERDISCIPLINARES",
                          eu: "DIZIPLINARTEKO T.",
                          ca: "T. INTERDISCIPLINARIS",
                          gl: "O. INTERDISCIPLINARES",
                          ca_valencia: "T. INTERDISCIPLINARIS",
                          en: "INTERDISCIPLINARY W.",
                      },
                      unidades: [],
                      recursos: [],
                  },
              },
          },
          crr: {
              nom: "CRR",
              titulo: {
                  es: "Cierres",
                  eu: "Itxiera",
                  ca: "Tancaments",
                  gl: "Peches",
                  ca_valencia: "Tancaments",
                  en: "Enclosures",
              },
              hijos: {
                  crr: {
                      nom: "CRR",
                      color: "rgb(0,161,154)",
                      subtitulo: {
                          es: "REC. CIERRES",
                          eu: "ITXIERA",
                          ca: "TANCAMENTS",
                          gl: "PECHES",
                          ca_valencia: "TANCAMENTS",
                          en: "ENCLOSURE RES.",
                      },
                      unidades: [],
                      recursos: [],
                  }
              }
          },
        }
      }
  },
  beforeCreate() {
    // esto es para corregir un problema con los estilos de la página nueva
    let encabezado = document.querySelector('#page-header');
    if (encabezado) {
      encabezado.style.height = 'unset'
    }
    // cargamos el css del filtro de sallenet. Allí hay que dejar el archivo style.css de la carpeta assets
    // ANULADO PORQUE TARDA UN POCO Y SE VEN LOS ELEMENTOS DESCOLOCADOS AL PRINCIPIO
    //var cssId = 'myCss';  // you could encode the css path itself to generate id..
    //if (!document.getElementById(cssId))
    //{
    //    var head  = document.getElementsByTagName('head')[0];
    //    var link  = document.createElement('link');
    //    link.id   = cssId;
    //    link.rel  = 'stylesheet';
    //    link.type = 'text/css';
    //    link.href = '../filter/sallenet/_styles.css';
    //    link.media = 'all';
    //    head.appendChild(link);
    //}
  },
  mounted() {
    window.addEventListener('DOMContentLoaded', () => {
      // carga principal por defecto
      this.cargaUsuario();
      this.cargaPrincipal();
    });
  },
  computed: {
    tipos() {
      return Object.keys(this.datos);
    },
    subtipos() {
      if (this.datosusuario.tipoactivo && this.tipos) {
        if (this.tipos.indexOf(this.datosusuario.tipoactivo) > -1) {
          let temp1 = this.datosusuario.tipoactivo;
          let temp2 = this.datos[temp1];
          let temp3 = temp2.hijos;
          let temp4 = Object.keys(temp3);
          return temp4;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    tipoactivotitulo() {
      if(this.datosusuario.tipoactivo && this.datosusuario.lang) {
          if (this.datos[this.datosusuario.tipoactivo].titulo[this.datosusuario.lang]) {
              return this.datos[this.datosusuario.tipoactivo].titulo[this.datosusuario.lang]
          } else {
              return 'null'
          }
      } else {
        return 'null'
      }
    },
    tipoactivosubtipos() {
      if (this.tipos && this.datosusuario.tipoactivo) {
        let temp0 = [];
        let temp1 = Object.keys(this.datos[this.datosusuario.tipoactivo].hijos);
        for (let i=0; i < temp1.length; i++) {
          let temp2 = this.datos[this.datosusuario.tipoactivo].hijos[temp1[i]];
          let temp3 = {customkey: temp1[i], nombre: temp2.nom, color: temp2.color, ccaa: temp2.ccaa};
          temp0.push(temp3);
        }
        return temp0;
      } else {
        return [];
      }
    },
    subtipoactivotitulo() {
      if(this.datosusuario.tipoactivo && this.datosusuario.subtipoactivo && this.datosusuario.lang && this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo]) {
        return this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo].subtitulo[this.datosusuario.lang]
      } else {
        return null
      }
    },
    subtipoactivocolor() {
      let colorsalida = 'null'
      if(this.datosusuario.tipoactivo && this.datosusuario.subtipoactivo && this.datosusuario.lang && this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo]) {
          if (this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo].color) {
              colorsalida = this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo].color;
          }
      }
      return colorsalida;
    },
    subtipoactivorecursos() {
      if (this.subtipos && this.datosusuario.subtipoactivo) {
        let temp0 = [];
        let temp1 = this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo];
        if (temp1) {
          let temp2 = temp1.recursos;
          for (let i=0; i < temp2.length; i++) {
            let temp3 = temp2[i];
            let temp4 = {texto: temp3.texto, url: temp3.url};
            temp0.push(temp4);
          }
          return temp0;
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    subtipoactivounidades() {
      if (this.tipoactivosubtipos && this.datosusuario.subtipoactivo) {
        let temp0 = [];
        let temp1 = this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo];
        if (temp1) {
          let temp2 = temp1.unidades;
          for (let i=0; i < temp2.length; i++) {
            let temp3 = temp2[i];
            let temp4 = {texto: temp3.texto, url: temp3.url, orden: temp3.orden};
            temp0.push(temp4);
          }
          return temp0;
        } else {
          return [];
        }
      } else {
        return [];
      }
    },

  },
  methods: {
    togleaestadolateral() {
      this.datosusuario.lateralvisible = !this.datosusuario.lateralvisible;
      if (this.datosusuario.lateralvisible) {
        document.querySelector("#page").dataset.lateralvisible = 'true';
        document.querySelector("#app-ltrl").dataset.lateralvisible = 'true';
      } else {
        document.querySelector("#page").dataset.lateralvisible = 'false';
        document.querySelector("#app-ltrl").dataset.lateralvisible = 'false';
      }
    },
    cargaelemento(urlcarga, funcionexito) {

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          sessionStorage.respuesta = this.responseText;
          funcionexito(this.responseText);
        } else {
          console.log('error')
        }
      }
      xhttp.open("GET", urlcarga, !1);
      xhttp.send();
    },
    cargaUsuario() {
        // Obtenemos la url base para las imagenes;
        if (document.querySelector("#app")) {
          let rutaImagen1 = document.querySelector("#app").dataset.url;
          this.datosusuario.urlmenulateral = rutaImagen1;
        }
        
        // Cargamos los datos de usuario como variable para poder editarlos en la función
        let datosusuario = this.datosusuario;

        // Obtenemos el dato de CCAA. Ojo, esta llamada no es relativa, sino absoluta al estar dentro el htmlrequest;
        //datosusuario.ccaa = "error" // Ponemos un valor por defecto en caso de que no funcione el get
        axios.get("../filter/sallenet/getIdCCAA.php")
          .then(function (response) {
            // handle success
            datosusuario.ccaa = response.data.id_ccaa;
            console.log(response.data.id_ccaa);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
          // always executed
          //if (datosusuario.ccaa == "error") {
          //  datosusuario.ccaa = "13"
          //}
          });
        //datosusuario.ccaa = "13"
        console.log('el número de ccaa es ');
        console.log(this.datosusuario.ccaa);

        // Obtenemos el dato de idioma.;
        if (document.querySelector('[lang]').getAttribute('lang')) {
          this.datosusuario.lang = document.querySelector('[lang]').getAttribute('lang');
        }
        // Corrección del idioma valenciano
        if (this.datosusuario.lang == "ca-valencia") {
          this.datosusuario.lang = "ca_valencia";
        }
        console.log('el idioma del usuario es ');
        console.log(this.datosusuario.lang);

        // Obtenemos el rol del usuario;
        //datosusuario.rol = "error";
        let url = window.location.origin;
        url = url.indexOf(".dev.") > -1 ? url + "/lsms" : url
        axios.get(url + "/filter/sallenet/getRoles.php")
          .then(function (response) {
            // handle success
            let roles = response.data;
            // por defecto, lo pone como estudiante
            datosusuario.rol = "student";
            // si es profesor sin permiso de edición, lo pone como profesor sin permiso de edición.
            if (roles.indexOf( "teacher" ) > -1 ){
                datosusuario.rol = "teacher";
            }
            // si es profesor editor, administrador, manager, lo pone como profesor editor.
            if (roles.indexOf( "siteadmin" ) > -1 || roles.indexOf( "editingteacher" ) > -1 || roles.indexOf( "manager" ) > -1){
                datosusuario.rol = "editingteacher";
            }
            console.log(datosusuario.rol);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
            //if (datosusuario.rol == "error") {
            //  datosusuario.rol = "editingteacher"
            //}
          });
        //datosusuario.rol = "teacher"
        console.log('el rol del usuario es ');
        console.log( this.datosusuario.rol)
    },
    cargaPrincipal() {
      // Tras el page load;
      let culo;
      let temp1;
      let temp2;
      let temp3;
      let temp4;
      let temp5;
      let temp6;
      let tempIndex;

      // Oculta la intro si la edición está desactivada. Modificaciones de estilo en función de si está o no la edición activa.
      let estaeditando = document.querySelectorAll('.editing_move').length;
      if (estaeditando > 0) {
          this.datosusuario.estado = 1;
          if (document.querySelector("#blockslider")) {
            document.querySelector("#blockslider").style.display = "block";  // mostramos el div de bloques para tener a mano la bolsa de recursos
          }
      } else if ( document.querySelector("#section-0") && document.querySelectorAll('.topics li[id^=section-]').length > 0 && document.querySelector("#section-0")) {
          document.querySelector("#section-0").style.borderBottom = "none"; // Ocultamos el borde inferior de la sección 0
          document.querySelectorAll('.topics li[id^=section-]').forEach((elem) => elem.style.display = "none"); // Ocultamos las unidades si no está editando
          document.querySelector("#section-0").style.display = "block";
      } else {
          console.log('no ha encontrado elementos html como la sección 0 o similares en el DOM')
      }

      // sacamos la url inicial
      let urlinic = window.location.href
      if (urlinic.includes("course/view.php")) {
        while ( urlinic.includes("&")) {
          urlinic = urlinic.substr( 0, urlinic.lastIndexOf( "&" ) );
        }
      }
        
      // barremos el curso para sacar las secciones
      culo = document.querySelectorAll('.course-content .topics li.section');
      console.log(culo);

      // barremos el curso sin sección para sacar el número de elementos y generar el menu;
      for (let i=1; i<culo.length; i++) {
        
        console.log('interpolación ' + i);
        if (culo[i].querySelector('.section-title a')) {
          // sacamos el titulo, la descripción y la url del elemento;
          temp1 = culo[i].querySelector('.section-title a').href;
          temp2 = culo[i].querySelector('.section-title a').innerText;
          temp2 = temp2.split(" ")[0]; // por si acaso eliminamos texto tras el espacio
          // sacamos los elementos titulo y subtitulo si existen
          if (temp2.split("-")[0] && temp2.split("-")[1]) {
            temp3 = temp2.split("-")[0].toLowerCase();
            temp4 = temp2.split("-")[1].toLowerCase();
            tempIndex = temp2.split("-")[2];
            tempIndex = tempIndex.substring(0, 2); // dejamos sólo los dos primeros caracteres
          } else {
            console.log('el título de una sección no está bien escrito ' + temp2)
            continue;
          }
          console.log(temp1 + ' ' + temp2 + ' ' + temp3 + ' ' + temp4)
          // sacamos el nombre convencional si existe en la descripción
          if (culo[i].querySelector('.summary div')) {
            temp2 = culo[i].querySelector('.summary div').innerText;
          }
          if (culo[i].querySelector('.summarytext div.no-overflow')) {
            if (culo[i].querySelector('.summarytext div.no-overflow').innerText !== "") {
              temp2 = culo[i].querySelector('.summarytext div.no-overflow').innerText;
            }
          }
          // comparamos los datos con la estructura de datos y rellenamos sus elementos unidad
          if (temp3 && Object.keys(this.datos).indexOf(temp3) !== -1) {
            temp5 = this.datos[temp3];
            if (temp4 && Object.keys(temp5.hijos).indexOf(temp4) !== -1) {
              temp6 = temp5.hijos[temp4];
              temp6.unidades.push({ texto: temp2, url: temp1, orden: tempIndex });
              console.log('el texto es ' + temp2 + ', la url es ' + temp1 + ', y el orden es ' + tempIndex);
            }
          }
          // comparamos los datos con la estructura de datos y rellenamos sus elementos recurso
          if (temp3.includes("rec")) {
            this.cargarecursos(temp1);
          }
        } else {
          console.log('encontrada seccion sin título')
        }
      }
      
      // esta parte permite volver a secciones visitadas previamente después de editar
      if (localStorage.getItem("seccionactiva") && localStorage.getItem("seccionactiva") !== "null" && window.location.href.indexOf('section=') == -1) {
        if ( localStorage.getItem("tipoactivo") &&
             localStorage.getItem("subtipoactivo") &&
             localStorage.getItem("seccionactiva")
             //localStorage.getItem("color")
            ) {
          //this.datosusuario.tipoactivo = localStorage.getItem("tipoactivo");
          this.activatipo(localStorage.getItem("tipoactivo"));
          this.activasubtipo(localStorage.getItem("subtipoactivo"));
          this.cargaseccion(localStorage.getItem("seccionactiva"));
          //this.datosusuario.color = localStorage.getItem("color");
          this.datosusuario.subtipoactivo = localStorage.getItem("subtipoactivo");
          localStorage.setItem("tipoactivo", null);
          localStorage.setItem("subtipoactivo", null);
          localStorage.setItem("seccionactiva", null);
          //localStorage.setItem("color", null)
        }
      }

      // Fin de carga principal

    },
    cargarecursos(urldestino) {
      // definimos variables para usar globalmente
      let datos = this.datos;
      let recursosglobales = this.datosusuario.recursosglobales;
      // hacemos la consulta para actualizar los valores del slider y lo guardamos en el explorador
      axios.get(urldestino)
      .then(function (response) {
      // handle success
          // Definimos variables
          var eInt = document.createElement("div");
          var culoInt;
          var temp1Int;
          var temp2Int;
          var temp3Int;
          var temp4Int;
          var temp5Int;
          var temp6Int;
          var temp7Int;
          var temp8Int;

          // Rescatamos datos
          eInt.id = "fooInt";
          eInt.innerHTML = response.data;
          culoInt = eInt.querySelectorAll(".single-section .activity");
          // barremos las actividades de la seccion de recursos     
          for (let j=0; j<culoInt.length; j++) {
            if (culoInt[j].querySelector("a") && culoInt[j].querySelector("a .instancename") && culoInt[j].querySelector('.contentafterlink') ) {
              temp1Int = culoInt[j].querySelector('a').href;
              temp2Int = culoInt[j].querySelector('a .instancename').innerText;
              if (culoInt[j].querySelector('.contentafterlink')){
                temp3Int = culoInt[j].querySelector('.contentafterlink').innerText;
              } else {
                temp3Int = temp2Int;
              }
              console.log(temp1Int + ' ' + temp2Int + ' ' + temp3Int);
              if (temp2Int.split("-").length > 1) { 
                  temp4Int = temp2Int.split("-")[0].split(".")[1].toLowerCase();
                  // comparamos los datos con la estructura de datos y rellenamos sus elementos unidad
                  if (temp2Int.split("-")[0].split(".").length == 3) {
                      temp5Int = temp2Int.split("-")[0].split(".")[2].toLowerCase();
                      // aqui se meten los recursos específicos de cada grupo de seminarios, talleres, etc.
                      if (temp4Int && Object.keys(datos).indexOf(temp4Int) !== -1) {
                          temp6Int = datos[temp4Int];
                          if (temp5Int && Object.keys(temp6Int.hijos).indexOf(temp5Int) !== -1) {
                          temp7Int = temp6Int.hijos[temp5Int];
                          temp7Int.recursos.push({ texto: temp3Int, url: temp1Int });
                          console.log('texto: ' + temp3Int + ', y la url es ' + temp1Int);
                          }
                      }
                  }
                  // aqui se meten los recursos globales para mostrar en la pantalla de bienvenida
                  if (temp4Int == "nca" && temp2Int.split("-").length > 4) {
                      if (temp2Int.split("-")[4].split(".")[0] == "RECGEN") {
                      temp8Int = temp2Int.split("-")[4].split(".")[1];
                      recursosglobales.push({ texto: temp3Int, url: temp1Int, tipo: temp8Int});
                      console.log('texto: ' + temp3Int + ', y la url es ' + temp1Int + ', y el tipo es ' + temp8Int);
                      console.log(recursosglobales);
                      }
                  }
                  // en el caso de que ese nivel de jerarquía sólo tenga 2 elems, los guarda en todos los elems hijos de ese
                  if (temp2Int.split("-")[0].split(".").length == 2) {
                      console.log('temp4Int es ' + temp4Int);
                      if (temp4Int && Object.keys(datos).indexOf(temp4Int) !== -1) {
                          temp6Int = datos[temp4Int];
                          temp7Int = Object.keys(temp6Int.hijos);
                          for (let k=0; temp7Int.length > k; k++) {
                              temp6Int.hijos[temp7Int[k]].recursos.push({ texto: temp3Int, url: temp1Int });
                              console.log('texto: ' + temp3Int + ', y la url es ' + temp1Int);
                          }
                      }
                  }
              }
            }
          }
      })
      .catch(function (error) {
        console.log(error)
      }) //handle error
      .then(function () {}); // always executed
        console.log('carga recursos');
    },
    activatipo(tip) {
      if (this.tipos.indexOf(tip) > -1) {
        this.datosusuario.tipoactivo = tip
      }
    },
    activasubtipo(subtip) {
      if (this.subtipos.indexOf(subtip) > -1) {
        this.datosusuario.subtipoactivo = subtip;
        console.log('el valor de datosusuario es ' + this.datosusuario.subtipoactivo)
        console.log(this.datos[this.datosusuario.tipoactivo].hijos[this.datosusuario.subtipoactivo])
        //if (localStorage.getItem('color') && localStorage.getItem('color') !== 'null') {
        //  this.datosusuario.color = localStorage.getItem('color')
        //}
      } 
    },
    cargaseccion (urldestino) {
      let datosusuario = this.datosusuario;
      let subtipoactivotitulo = this.subtipoactivotitulo;
      let subtipoactivocolor = this.subtipoactivocolor;

      // Actualizamos el valor de la sección activa para permitir el aceso si es profesor
      datosusuario.urlseccionactiva = urldestino;
      // hacemos la consulta para actualizar los valores del slider y lo guardamos en el explorador
      axios.get(urldestino)
      .then(function (response) {
      // handle success
          //Definimos variables
          var e = document.createElement("div");
          var tit1;
          var tit2;
          var tit3;
          var temp1;
          var temp2;
          var temp3;
          var temp4;
          var temp5;
          var temp6;
          var temp7;
          var elems = [];
          var listarec = [];
          var listaint = [];
          var listaeval = [];
          var sldr = [];
          //var img;

          // montamos el resultante de la consulta en un div no visible llamado "e"
          e.id = "fooInt";
          e.innerHTML = response.data;

          // obtenemos la descripción de la sección
          if (e.querySelector(".single-section ul.topics .content .summary div:first-child")) {
              if (e.querySelector(".single-section ul.topics .content .summary div:first-child").innerText.replace(/(\r\n|\n|\r)/gm, "")) {
                  tit1 =  e.querySelector(".single-section ul.topics .content .summary div:first-child").innerText.replace(/(\r\n|\n|\r)/gm, "");
              } else {
                  tit1 = "";
              }
          } else {
              tit1 = "";
          }
          console.log("el nombre de la sección es ");
          console.log(tit1);
          // obtenemos el nombre de la sección
          if (e.querySelector(".single-section ul.topics h3.sectionname a:first-child").innerText.replace(/(\r\n|\n|\r)/gm, "")){
              tit2 =  e.querySelector(".single-section ul.topics h3.sectionname a:first-child").innerText.replace(/(\r\n|\n|\r)/gm, "");
              datosusuario.subtipoactivoimagen = tit2.split("-")[0].toLowerCase() + "-" + tit2.split("-")[1].toLowerCase() + "-" + tit2.split("-")[2] + ".png";
          } else {
              tit2 = "";
          }
          // Asignamos el valor del título en función de si existe o no descripción y nombre
          if (tit1 !== "") {
              tit3 = tit1;
          } else {
              tit3 = tit2;
          }
          console.log("el título de la sección es ");
          console.log(tit3);
          // barremos las actividades de la seccion de recursos sacamos sus datos relevantes
          elems = e.querySelectorAll(".single-section .activity");
          for (let j=0; j<elems.length; j++) {
              temp1 = elems[j];
              // sacamos los datos relevantes ´solo si cumple todas las condiciones necesarias para que funcione bien la extraccion
              if (temp1.querySelector("a") && temp1.querySelector("a .instancename") ) {
                  temp2 = temp1.querySelector('a').href;
                  temp3 = temp1.querySelector('a .instancename').innerText;
                  if (temp1.querySelector('.contentafterlink')){
                      temp4 = temp1.querySelector('.contentafterlink').innerText;
                  } else {
                      temp4 = temp3;
                  }
                  console.log("los datos del elemento son ");
                  console.log(temp2);
                  console.log(temp3);
                  console.log(temp4);
                  // filtramos el elemento si es recurso, interactiva o slider-alumno, pero antes comprobamos la sintaxis
                  if (temp3.split("-").length > 4) {
                      temp5 = temp3.split("-")[4];
                      if (temp5.split(".").length > 1) {
                          temp6 = temp5.split(".")[0];
                          temp7 = temp5.split(".")[1];
                          console.log(temp5);
                          if (temp6 == "RECU") {
                              listarec.push({texto: temp4, url: temp2, indice: temp7, titulo: temp3});
                          }
                          if (temp6 == "INTE") {
                              listaint.push({texto: temp4, url: temp2, indice: temp7, titulo: temp3});
                          }
                          if (temp6 == "SLDR") {
                              sldr.push({texto: temp4, url: temp2, indice: temp7, titulo: temp3});
                          }
                          if (temp6 == "ICON") {
                              var icn = {texto: temp4, url: temp2, indice: temp7, titulo: temp3};
                          }
                          if (temp6 == "EVAL") {
                              listaeval.push({texto: temp4, url: temp2, indice: temp7, titulo: temp3});
                          }
                      }
                  }
              }
          }
          // Con los datos extraidos actualizamos los valores de la app
          datosusuario.estado = 1;
          datosusuario.recursostitulo = listarec;
          datosusuario.interactivas = listaint;
          datosusuario.evaluaciones = listaeval;
          datosusuario.slider = sldr;
          datosusuario.subtipoactivorotulo = tit3;
          datosusuario.subtipoactivorotulito = subtipoactivotitulo;
          datosusuario.color = subtipoactivocolor;
          datosusuario.urliconoinsertado = null
          if (icn) {
            datosusuario.urliconoinsertado = icn.url;
          } else {
            datosusuario.urliconoinsertado = null;
          }
      })
      .catch(function (error) {
          console.log(error)
      }) //handle error
      .then(function () {}); // always executed
    },
    generapdf(json) {
      // Obtenemos el título de la unidad (no está en el json) y le juntamos el código de la misma
      let titulo = document.querySelector('#nca13-mnu-titulo').textContent;
      let codigounidad = '';
      if (this.datosusuario.slider) {
        if (this.datosusuario.slider.length > 0) {
          codigounidad = this.datosusuario.slider[0].titulo.split("-")[0];  // cualquiera de los sliders tendrá el primer miembro igual y será el código de la unidad.
          titulo = codigounidad + ' ' + titulo;
        }
      }
      // invocamos la función externa
      jsonToPdf(json, titulo, this.datosusuario.lang)
    },
  },
}
</script>

<style >

  .show-enter-active,
  .show-leave-active {
    transition: all 0.5s ease-out;
  }

  .show-enter-to {
    transform: translateX(-285px);
  }

  .show-leave-to {
    transform: translateX(0px);
  }

</style>
