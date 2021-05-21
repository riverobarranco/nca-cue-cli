module.exports = {
    jsonToPdf: function (json, titulotema, jsPDFelem) {

        // Creamos el objeto que contiene los textos traducidos de elementos de plantilla
        let textos = [];
        textos.push({id: 'tablaContenidos', textos: {es:'TABLA DE CONTENIDOS', en:'TABLE OF CONTENTS', eu:'EDUKIEN TAULA', ca:'TAULA DE CONTINGUTS', ca_valencia:'TAULA DE CONTINGUTS', gl:'TÁBOA DE CONTIDOS'}});
        textos.push({id: 'sesion', textos: {es:'Sesión', en:'Session', eu:'Saioa', ca:'Sessió', ca_valencia:'Sessió', gl:'Sesión'}});
        textos.push({id: 'actividad', textos: {es:'Actividad', en:'Activity', eu:'Jarduera', ca:'Activitat', ca_valencia:'Activitat', gl:'Actividade'}});
        textos.push({id: 'secuenciaDeActividades', textos: {es:'SECUENCIA DE ACTIVIDADES', en:'SEQUENCE OF ACTIVITIES', eu:'JARDUEREN HURRENKERA', ca:'SEQÜÈNCIA D\'ACTIVITATS', ca_valencia:'SEQÜÈNCIA D\'ACTIVITATS', gl:'SECUENCIA DE ACTIVIDADES'}});
        textos.push({id: 'de', textos: {es:'de', en:'of', eu:'/', ca:'de', ca_valencia:'de', gl:'de'}});
        textos.push({id: 'descripcion', textos: {es:'Descripción', en:'Description', eu:'Deskribapena', ca:'Descripció', ca_valencia:'Descripció', gl:'Descrición'}});
        textos.push({id: 'recursos', textos: {es:'Recursos', en:'Resources', eu:'Baliabideak', ca:'Recursos', ca_valencia:'Recursos', gl:'Recursos'}});
        
        // Creamos la función extractora de textos
        function textoMul(id,lang) {
        let textoTraducido = 'identificador no encontrado'
            for (let i=0; i<textos.length; i++) {
                let textoActual = textos[i];
                if (textoActual.id == id) {
                if (textoActual.textos[lang] && textoActual.textos[lang] !== '') {
                    textoTraducido = textoActual.textos[lang];
                    return textoTraducido;
                } else {
                    textoTraducido = 'traduccion no encontrada'
                    return textoTraducido;
                }
                }
            }
        }
        
        // Iniciamos el contenedor del pdf
        //var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });
        var doc = jsPDFelem
        // Ponemos el título
        let titulo = titulotema
        //let titulo = document.querySelector('#nca13-mnu-titulo').textContent
        doc.setFontSize(20)
        doc.setTextColor(40)
        doc.text(titulo, 14, 22)
        doc.setFontSize(15)
        
        // Obtenemos los datos para la tabla de contenidos
        var finalY = 10
        doc.text(textoMul('tablaContenidos',this.centralusuario.lang), 14, finalY + 25)
        let numactividad = 0;
        let tablaactividad = [];
        for (let i = 0; i < json.sesiones.length; i++) {
            let sesion = '00' + (i + 1);
            sesion = sesion.substring(sesion.length-2,sesion.length);
            let numactividades = json.sesiones[i].numactividades;
            let actividades = ""
            for (let j = 0; j < numactividades; j++) {
                actividades = actividades + json.actividades[numactividad].titulo + '\n';
                numactividad++;
            }
            tablaactividad.push([ textoMul('sesion',this.centralusuario.lang) + ' ' + sesion, actividades])
        }
        
        // Insertamos la tabla de contenidos
        doc.autoTable({
        startY: finalY + 30,
        head: [[textoMul('sesion',this.centralusuario.lang), textoMul('actividad',this.centralusuario.lang)]],
        body: tablaactividad,
        headStyles: {
            fillColor: [200, 200, 200],
            fontSize: 15,
        },
        bodyStyles: {
            fillColor: [245, 245, 245],
            textColor: 50,
        },
            alternateRowStyles: {
            fillColor: [245, 245, 245],
            textColor: 50,
        },
        })
        doc.addPage();
        
        // titulo de lista de actividades
        finalY = 10
        doc.text(textoMul('secuenciaDeActividades',this.centralusuario.lang), 14, 20)
        
        // Recorremos el documento entero para generar las tablas de actividades
        let actividadprimera = 31;
        numactividad = 0;
        for (let i = 0; i < json.sesiones.length; i++) {
            // Añadimos el número de sesion
            let sesion = '00' + (i + 1);
            sesion = sesion.substring(sesion.length-2,sesion.length);
            // Por cada actividad en esta sesión metemos su tabla de actividad
            let numactividades = json.sesiones[i].numactividades;
            for (let j = 0; j < numactividades; j++) {
            // Para configurar la altura del autotable, vemos si es la primera del grupo
            if (j == 0) {
                actividadprimera = 31
            } else {
                actividadprimera = null;
            }
            // Definimos el contenido de la tabla
            let temp1 = json.actividades[numactividad]
            let temp2 = '00' + (numactividad + 1);
            temp2 = temp2.substring(temp2.length-2,temp2.length);
            // Metemos el titulo
            doc.text(textoMul('sesion',this.centralusuario.lang) + ' ' + sesion + '   '+ textoMul('actividad',this.centralusuario.lang) + ' ' + (j + 1) + ' ' + textoMul('de',this.centralusuario.lang) + ' ' + numactividades, 14, 28)
            let temp3 = temp1.titulo;
            let temp4 = '\n' + temp1.descripcion;
                // Limpiamos el html del string de la descripcion
                temp4 = temp4.replace(/<style([\s\S]*?)<\/style>/gi, '');
                temp4 = temp4.replace(/<script([\s\S]*?)<\/script>/gi, '');
                temp4 = temp4.replace(/<\/div>/ig, '\n\n');
                temp4 = temp4.replace(/<\/li>/ig, '\n\n');
                temp4 = temp4.replace(/<li>/ig, '  *  ');
                temp4 = temp4.replace(/<\/ul>/ig, '\n\n');
                temp4 = temp4.replace(/<\/p>/ig, '\n\n');
                temp4 = temp4.replace(/<br\s*?>/gi, "\n\n");
                temp4 = temp4.replace(/<[^>]+>/ig, '');
            let recursos = "\n"
            temp1.recursos.forEach((element) => recursos = recursos + element.titulo + '\n\n' )
            doc.autoTable({
                startY: actividadprimera,
                head: [[temp2, temp3]],
                body: [
                    ['\n' + textoMul('descripcion',this.centralusuario.lang), temp4],
                    ['\n' + textoMul('recursos',this.centralusuario.lang), recursos],
                ],
                headStyles: {
                    fillColor: [200, 200, 200],
                    fontSize: 15,
                },
                bodyStyles: {
                    fillColor: [245, 245, 245],
                    textColor: 50,
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245],
                    textColor: 50,
                },
            })
            doc.addPage();
            // actualizamos el numero de actividad
            numactividad++;
            }
        }
        doc.save();
    }
}
