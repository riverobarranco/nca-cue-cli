SISTEMA DE VISUALIZACIÓN DE NCA 1-3
===================================

Conceptos generales
-------------------

La visualización de los cursos 1º a 3º del NCA se ha resuelto mediante
una etiqueta en la sección 0 que usando VUE.js “pinta” la pantalla según
la unidad que esté consultando el usuario. No se utilizarán menús, sino
que estos se generarán automáticamente en función de los elementos
existentes en cada unidad.

El código que utiliza esta solución se incorporará a un filtro Moodle,
de manera que se puedan hacer modificaciones en vivo para corregir
errores o incorporar modificaciones o mejoras a la interfaz.

En el momento de la carga inicial de la página, se hace un barrido por
todas las secciones (en la pantalla de inicio en el DOM hay información
de todas) y rellena un objeto javascript que contiene la información del
curso y que se vincula a los componentes de VUE.

Cuando el usuario selecciona una unidad concreta (pe: proyecto 01) en el
menú lateral, se hace una consulta a la sección correspondiente y dibuja
los elementos de la misma automáticamente en la pantalla. 

En el caso de que haya un elemento SLDR.JS. en esa sección, el sistema 
hará una consulta a la herramienta getSliders para recuperar el json del
slider del mismo nombre que el elemento. Si lo encuentra lo pintará y 
actualizará las url de los recursos usando el nombre como referencia.

En el caso de que haya un elemento SLDR.PF. en esa sección, el sistema
hará una consulta al propio elemento y extraerá su HTML (es un recurso
tipo página web), y lo llevará a la pantalla.

Organización general del curso por unidades didácticas
------------------------------------------------------

Los elementos de curso están organizados por “unidades didácticas”, cada
una en una sección. El nombre de la sección nos dice que tipo de
contenido es y el área/proyecto al que pertenece e indica al JS en que
parte del menú colocar esa sección. El campo descripción nos dará el
nombre que verá el usuario en formato multi-idioma.

  Categoría   Subcategoría                 Unidad didáctica
  ----------- ---------------------------- ------------------------
  ACG         ACG                          01
  PRO         P01-P12                      01
  SEM         MAT                          01-99 (los necesarios)
              SOC                          01-99 (los necesarios)
              NAT                          01-99 (los necesarios)
              ENG                          01-99 (los necesarios)
              ENC (inglés Cataluña)        01-99 (los necesarios)
              CAS                          01-99 (los necesarios)
              CSC (castellano Cataluña)    01-99 (los necesarios)
              CSE (castellano Euskadi)     01-99 (los necesarios)
              EUS                          01-99 (los necesarios)
              CAT (catalán Baleares)       01-99 (los necesarios)
              CTC (catalán Cataluña)       01-99 (los necesarios)
              GAL (gallego)                01-99 (los necesarios)
              VAL (valenciano)             01-99 (los necesarios)
  TLL         ERE                          01-99 (los necesarios)
              EVL (educación en valores)   01-99 (los necesarios)
              EFE (educación física)       01-99 (los necesarios)
              PLA (plástica)               01-99 (los necesarios)
              MUS                          01-99 (los necesarios)
              WKP (wake up)                01-99 (los necesarios)
              INT (interdisciplinar)       01-99 (los necesarios)
  CRR         CRR (cierre)                 01

Ejemplo:

SEM-ENG-03 = Tercer seminario de Inglés

En el modelo de datos contenido en el Javascript se pueden establecer
nuevas subcategorías (áreas) y definir las comunidades autónomas donde
se ve cada una. Existe por tanto un filtro por CCAA a nivel de
subcategoría.

La única excepción a la regla de nomenclatura de unidades didácticas es
para las secciones que incluyen recursos generales. Estos son recursos
que afectan a todas las unidades didácticas de una Subcategoría (por
ejemplo, documentación para usar en todos los proyectos). Las secciones
que contienen estos recursos tienen el nombre “REC-REC-(número)”.

Sección Mooddle: Unidad didáctica
---------------------------------

Dentro de cada sección de unidad didáctica colocaremos los elementos
necesarios para la misma. Para identificar cada elemento y su función se
ha optado por un sistema de nomenclatura estricto que proporciona toda
la información de configuración del mismo.

  01.3.SEM.MAT-MUL-0-SI-EVAL.01.
  ------------------------------------------------------- -------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------- ---------------------------- ------------------------------------------
  01.3.SEM.MAT
  Unidad, Curso, categoría y subcategoría del elemento.

  **POSIBLES VALORES DE TIPO DE ELEMENTO**                                                                      
  ------------------------------------------------------------------------------------------------------------- ------- -------------------------------------------------------------------
  Recurso (carpeta de archivos desplegado con botón “+”)                                                        RECU.
  Interactiva.                                                                                                  INTE.
  Elemento de calificación (tarea)                                                                              EVAL.
  Slider profesor / imagen alumno (este elemento no es una “herramienta externa”, sino un recurso página web.   SLDR.

  **CÓDIGOS DE IDIOMA DE RECURSOS**
  ----------------------------------- ------------
  CAS
  ENG
  EUS
  CAT
  VAL
  GAL

  **CÓDIGOS DE COMUNIDADES AUTÓNOMAS**
  -------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  0
  1
  2
  3
  4
  5
  6
  7
  8
  9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19

Tanto los cursos como las actividades y los sliders llevan incorporado
un sistema de filtros. Los cursos pueden hacerse visibles en función de
CCAA, y las actividades y sliders en función del idioma y la CCAA.
Además si hacemos un elemento oculto el alumno no lo verá.

Es importante tener en cuenta la jerarquía del sistema de filtros.
Primero se filtra por CCAA y luego por lengua. La idea es que si
introducimos una CCAA distinta es porque el contenido es distinto porque
dicha CCAA tiene diferente currículo. Cuando filtramos por lengua,
hacemos el MISMO contenido pero en diferente idioma.

Cuando un elemento tiene un nombre determinado, por ejemplo “INTE.02”,
TODAS las interactivas con ese nombre final pero distinta lengua, deben
ser iguales aunque su lengua sea distinta. Si queremos una interactiva
de contenido distinto, es porque se trata de una interactiva para otra
CCAA, y entonces tenemos que poner el número de la CCAA en la que
queremos que reemplace a la original común. Es decir, no debemos
diferenciar actividades distintas por lengua, sino por CCAA. Las
actividades comunes a todos (las que tienen de ccaa un 0) sólo se pueden
reemplazar por otra con el mismo nombre y distinta CCAS, pero no se
pueden ocultar sin reemplazarlas.

El slider y la imagen de alumno ahora se guardan no como etiqueta, sino
como página web, para aligerar la carga del curso completo y filtrarlo
cómodamente.

A la hora de poner los url a los vínculos del slider, en el caso de que
queramos vincular a un recurso de la unidad didáctica, pondremos el
nombre del recurso, no la url como en 4-6. La programación reconstruirá
los vínculos en vivo, y esto permitirá modificar el slider incluso
cuando esté distribuido ya a los centros.

Sección Mooddle: Recursos Generales
-----------------------------------

Como se ha comentado previamente, las secciones cuyo nombre comienza por
“REC-REC”, contendrán recursos generales que se verán en todas las
subcategorías correspondientes. La nomenclatura para los recursos
generales es la siguiente:

  3.PRO-MUL-0-SI-RECGEN.RT.
  -------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------- ----------------------------------------------------------------------------------- ------------------ -----------------------------
  3.PRO
  Curso, categoría y subcategoría del elemento. Si no se pone subcategoría se pone en todas.

El uso de textos en formato multilenguaje en el curso.
------------------------------------------------------

A lo largo de todo el curso los elementos de texto se introducen en los
campos “descripción” de cada elemento. Dejamos los nombres como índices
de los elementos, y los ocultaremos al usuario final. De esta manera,
podremos usar el filtro multilenguaje con comodidad al no tener límite
en el número de caracteres a usar.

Los títulos de las unidades didácticas se guardan en la descripción de
la sección correspondiente.

Los nombres “visibles” de cada elemento se guardan en la descripción del
mismo. La descripción de cada elemento siempre será visible y contendrá
dos partes separadas por un espacio:

  01.1.PRO.39.A. Asamblea animales
  ------------------------------------------------------------------------------ ---------------------------------------------------------------------------------------------------
  01.1.PRO.39.A.
  Unidad, curso, Subcategoría, Actividad, Orden de actividad (si es necesario)
  Esta parte orienta al profesor en dónde se sitúa el elemento

En la página de Contenidos
--------------------------

En la página de contenidos, los elementos originales de cada unidad
didáctica se guardarán en la misma sección que en proyectonca y con el
mismo nombre y descripción. Se ha programado que al cargar un LTI de
contenidos se oculte el nombre y se ponga la descripción de tamaño
grande, sustituyendo de forma efectiva la descripción por el nombre.

En el supuesto de que se desee dar instrucciones en una tarea, dichas
instrucciones se escribirán en los párrafos siguientes al del nombre.
Esos párrafos no se agrandarán de tamaño y se verán normalmente.

PROCESO DE DIGITALIZACIÓN DE NCA 1-3
====================================

FASE 0: DOCUMENTACIÓN EN DRIVE
------------------------------

Se acude al drive y se abre la página de carga de datos.

Se identifican el número de interactivas. Si hay que elaborarlas se
crean las subtareas en Jira y se asigna responsable de las mismas.

Se identifican los elementos de calificación.

FASE 1: MATERIALES EN LA PÁGINA DE CONTENIDOS
---------------------------------------------

Se acude a la sección correspondiente de la unidad didáctica (ver
[vínculo](https://onedrive.live.com/edit.aspx?cid=ec91e1091e50baca&page=view&resid=EC91E1091E50BACA!72128&parId=EC91E1091E50BACA!72127&app=Excel)
para averiguar)

Se cargan los materiales de carpeta en su lugar (Guia, Recursos,
Evaluación, Cuaderno). No olvidar meterlos en carpetas por idioma.

En el caso de que haya elementos rescatados del curso 20-21, revisar su
relación con el material nuevo. Borrar y renombrar los elementos
necesarios.

Se crean las interactivas. Si son complejas y aún no existen, se habla
con el responsable para crear interactivas vacías (cuestionarios o H5P o
lo que sea) y avanzar en el proceso. En esas interactivas vacías el
responsable de la interactiva la completará.

Se crean los elementos de evaluación. Se configuran adecuadamente,
dejando las rúbricas preparadas en multi-idioma en caso necesario.

FASE 2: ELEMENTOS EN LA PÁGINA DE PROYECTONCA
---------------------------------------------

Nota general: Para la creación de elementos nuevos, se recomienda usar
el bloque “bolsa de recursos” y dejarse allí un tipo de cada elemento ya
preconfigurado

Se acude a la sección correspondiente del curso en proyectonca (ver
[vínculo](https://onedrive.live.com/edit.aspx?cid=ec91e1091e50baca&page=view&resid=EC91E1091E50BACA!72128&parId=EC91E1091E50BACA!72127&app=Excel)
para averiguar)

Se edita la **descripción** de la sección para poner el nombre de la
unidad didáctica en mi idioma. Si no hay nada puesto se pone la
secuencia de cadenas mlang (se puede descargar la siguiente
[herramienta](https://1drv.ms/u/s!Asq6UB4J4ZHshdRlYqGKPc42_IQmYg?e=9uJoTv)
de Víctor que facilita la tarea mucho). HACERLO EN HTML!

En el caso de que haya elementos rescatados del curso 20-21, revisar su
relación con el material nuevo. Borrar y renombrar los elementos
necesarios.

Se crean los recursos para las interactivas nuevas. No olvidar el
IDnumber que debe ser el mismo que el nombre (salvo que sea una
actividad preexistente del curso 20-21, en ese caso, dejarlo como está).
No olvidar la descripción en multilenguaje.

Se crean los recursos para los elementos de evaluación nuevos. No
olvidar el IDnumber que debe ser el mismo que el nombre (salvo que sea
una actividad preexistente del curso 20-21, en ese caso, dejarlo como
está). No olvidar la descripción en multilenguaje.

Se crea un recurso página web y se mete el slider en él. No olvidar
meter los nombres de los elementos de la unidad en lugar de su url
cuando la macro nos las pida.

Se crea un recurso página web y se pone la imagen de alumno en él. La
mejor manera de hacerlo es copiar uno preexistente y reemplazar la
imagen actual por otra con el mismo nombre en la ventana de “gestionar
ficheros”. Así no tendremos que tocar nada.

FASE 3: VINCULACIÓN DE ELEMENTOS POR LTI
----------------------------------------

Accedemos a la herramienta de
[gestionlti.sallenet.org](https://gestionlti.sallenet.org/home)

Seleccionamos el curso en el que estamos trabajando, y en el formulario
de búsqueda metemos la unidad didáctica en la que estamos trabajando.
(por ejemplo, “08.5.CAS”)

Los elementos de carpeta (Guia, Recursos profesorado, Evaluación, y
Cuaderno) ya estarán publicados y enlazados. Los dejamos como están.

El resto de elementos los publicaremos.

Abrimos la sección correspondiente en la página de proyectonca.org y
activamos edición. Editaremos todos los elementos (salvo los de carpeta)
e introduciremos la url de inicio y si es necesario la key.



# nca-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
