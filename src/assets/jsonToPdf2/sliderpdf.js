import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const htmlToPdfmake = require('html-to-pdfmake');

function jsonToPdf(json, titulotema, lang){

    const textos = {
        'tablacontenidos': {es:'TABLA DE CONTENIDOS', en:'TABLE OF CONTENTS', eu:'EDUKIEN TAULA', ca:'TAULA DE CONTINGUTS', ca_valencia:'TAULA DE CONTINGUTS', gl:'TÁBOA DE CONTIDOS'},
        'sesion': {es:'Sesión', en:'Session', eu:'Saioa', ca:'Sessió', ca_valencia:'Sessió', gl:'Sesión'},
        'actividad': {es:'Actividad', en:'Activity', eu:'Jarduera', ca:'Activitat', ca_valencia:'Activitat', gl:'Actividade'},
        'secuenciaDeActividades': {es:'SECUENCIA DE ACTIVIDADES', en:'SEQUENCE OF ACTIVITIES', eu:'JARDUEREN HURRENKERA', ca:'SEQÜÈNCIA D\'ACTIVITATS', ca_valencia:'SEQÜÈNCIA D\'ACTIVITATS', gl:'SECUENCIA DE ACTIVIDADES'},
        'de': {es:'de', en:'of', eu:'/', ca:'de', ca_valencia:'de', gl:'de'},
        'descripcion': {es:'Descripción', en:'Description', eu:'Deskribapena', ca:'Descripció', ca_valencia:'Descripció', gl:'Descrición'},
        'recursos': {es:'Recursos', en:'Resources', eu:'Baliabideak', ca:'Recursos', ca_valencia:'Recursos', gl:'Recursos'},
    };
    const textorecursos = {
        rec: {  es: 'Recursos didácticos',en: 'Didactic resources',eu: 'Irakaslearen Baliabideak',ca: 'Recursos didàctics',ca_valencia: 'Recursos didàctics',gl: 'Recursos didácticos'},
        cua: {  es: 'Cuaderno',en: 'Student\'s book',eu: 'Ikaslearen koadernoa',ca: 'Quadern alumnat',ca_valencia: 'Quadern alumnat',gl: 'Caderno alumnado'},
        ral: {  es: 'Recursos del alumno',en: 'Student\'s resources',eu: 'Ikaslearen baliabideak',ca: 'Recursos alumnat',ca_valencia: 'Recursos alumnat',gl: 'Recursos alumnado'},
        int: {  es: 'Interactiva',en: 'Interactiv',eu: 'interaktiboa',ca: 'Interactiva',ca_valencia: 'Interactiva',gl: 'Interactiva'},
        ext: {  es: 'Externa',en: 'External',eu: 'kanpokoa',ca: 'Externa',ca_valencia: 'Externa',gl: 'Externa'},
        eva: {  es: 'Evaluación',en: 'Assesment',eu: 'Ebaluazioa',ca: 'Avaluació',ca_valencia: 'Avaluació',gl: 'Avaliación'},
        vid: {  es: 'Vídeo',en: 'Video',eu: 'Bideoa',ca: 'Vídeo',ca_valencia: 'Vídeo',gl: 'Vídeo'},
        mat: {  es: 'Material',en: 'Material',eu: 'Materiala',ca: 'Material',ca_valencia: 'Material',gl: 'Material'},
    }
    var docDefinition = {
        pageOrientation: 'portrait',
        content: [
            {
            text: titulotema.toUpperCase(),
            style: 'header'
            }
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 15,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            sectionheader: {
                bold: true,
                fontSize: 15,
                margin: [0, 0, 0, 10]
            },
            link: {
                color: 'blue'
            },
            normal:{
                fontsize: 10
            },
            table: {
                fontsize: 10,
                margin: [0, 0, 0, 35]
            },
            tableheader: {
                bold: true,
                fontSize: 14,
                color: 'white'
            },
            'html-p': {
                margin: [0, 0, 0, 5],
            }
        }
    };

    // creamos tabla de contenidos
    docDefinition.content.push({text: textos.tablacontenidos[lang], style: 'subheader'});

    let toc = { style: 'table',
                table: {
                    widths: [80, '*'],
                    dontBreakRows: true,
                    body: [
                        [
                            { fillColor: '#888888',
                              border: [false, false, false, false],
                              text: textos.sesion[lang],
                              style: 'tableheader'
                            },
                            { fillColor: '#888888',
                              border: [false, false, false, false],
                              text: textos.actividad[lang],
                              style: 'tableheader'
                            }
                        ]
                    ]
                }
            };
    let act = 0
    for (let ses = 0; ses < json.sesiones.length; ses++) {
        let numeroses = ses + 1;
        let row = [
            {
                border: [false, true, false, true],
                text: `${textos.sesion[lang]} ${numeroses.toLocaleString('es-ES', {minimumIntegerDigits: 2})}`,
                linkToDestination: `S${numeroses.toLocaleString('es-ES', {minimumIntegerDigits: 2})}`,
                style: 'link'
            },

        ];
        let listaActividades = {border: [false, true, false, true],  style: 'normal', stack: []};
        for (let i = 0; i < json.sesiones[ses].numactividades; i++){
            let laActividad = {
                text: json.actividades[act].titulo,
                linkToDestination: `A${(act+1).toLocaleString('es-ES', {minimumIntegerDigits: 2})}`,
                style: 'link'
            };
            listaActividades.stack.push(laActividad);
            act++;
        }
        row.push(listaActividades);
        toc.table.body.push(row);
    }
    docDefinition.content.push(toc);

    // insertamos el contenido
    act = 0
    for (let ses = 0; ses < json.sesiones.length; ses++) {
        // insertar cabecera de sesión en nueva página
        let numeroses = ses + 1;
        let cabecera = 	{
            text: `${textos.secuenciaDeActividades[lang]} - ${textos.sesion[lang]} ${numeroses.toLocaleString('es-ES', {minimumIntegerDigits: 2})}`,
            pageBreak: 'before',
            style: 'sectionheader',
            id: `S${numeroses.toLocaleString('es-ES', {minimumIntegerDigits: 2})}`
        };
        docDefinition.content.push(cabecera);
        for (let i = 0; i < json.sesiones[ses].numactividades; i++){
            // insertar actividad act
            let numactividad = act + 1;
            let actividad = { style: 'table',
                table: {
                    widths: [80, '*'],
                    dontBreakRows: false,
                    headerRows: 1,
                    body: [
                        [
                            { fillColor: '#888888',
                            border: [false, false, false, false],
                            text: numactividad.toLocaleString('es-ES', {minimumIntegerDigits: 2}),
                            style: 'tableheader',
                            id: `A${numactividad.toLocaleString('es-ES', {minimumIntegerDigits: 2})}`
                            },
                            { fillColor: '#888888',
                            border: [false, false, false, false],
                            text: json.actividades[act].titulo,
                            style: 'tableheader'
                            }
                        ]

                    ]
                }
            };
            let descripcion = [
                            {
                                border: [false, true, false, true],
                                text: textos.descripcion[lang],
                            }
                        ];
            descripcion.push(htmlToPdfmake(json.actividades[act].descripcion));
            actividad.table.body.push(descripcion);
            if (json.actividades[act].recursos.length > 0){
                let recursos = [
                    {
                        border: [false, true, false, true],
                        text: textos.recursos[lang],
                    }
                ];
                let listarecursos = {ul: [ ]};
                for (const recurso of json.actividades[act].recursos){
                    let elrecurso = { text: `(${textorecursos[recurso.tipo][lang]}) - ${recurso.titulo}`};
                    if (recurso.tipo == 'vid' || recurso.tipo == 'ext'){
                        elrecurso.link = recurso.url;
                        elrecurso.style = 'link';
                    }
                    listarecursos.ul.push(elrecurso);
                }
                recursos.push(listarecursos);
                actividad.table.body.push(recursos);
            }
            docDefinition.content.push(actividad);
            act++
        } 
    }
    pdfMake.createPdf(docDefinition).download(titulotema + '.pdf');
}

export { jsonToPdf };