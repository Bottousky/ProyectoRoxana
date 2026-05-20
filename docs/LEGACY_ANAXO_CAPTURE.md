# Legacy Anaxo Capture

Material capturado desde `C:\YO\Proyectos\Anaxo\docs` para rescatar narrativa, estetica, tono y reglas de produccion utiles para Proyecto Roxana.

Este documento no convierte a Roxana en ANAXO. Funciona como traduccion selectiva: que se reutiliza, que se adapta y que queda fuera del MVP actual.

## Que Se Reutiliza

### Identidad De Producto

- La experiencia no debe sentirse como curso gamificado. Es una aventura donde aprender ocurre por exploracion, patron, error y restauracion.
- Los videos son apoyo y profundizacion, nunca requisito para avanzar.
- El contenido educativo es producto central, no material secundario.
- La web aloja varias capas: juego, bitacora, videos, ejercicios opcionales y comunidad futura.

### Rol De Roxana

- Roxana debe sentirse importante, no una mascota ni un tutorial.
- Su presencia es luminosa, calida, serena y algo sagrada.
- Roxana hace preguntas buenas antes que explicar respuestas.
- En la nueva continuidad, Roxana puede funcionar como ultima directora, memoria de la escuela y presencia atrapada entre estatua, ecos, imagenes y bitacora.
- La estatua del hub puede ser el ancla visual de su recuperacion progresiva.

### Mundos Como Identidades Fuertes

Los mundos de la iteracion anterior sirven como semilla de identidad:

- Arithmos: matematica como cosmos estructurado por patrones, numeros, formas y equilibrio.
- Physika: mundo donde las leyes fisicas se volvieron inestables.
- Codex: mundo de sistemas, memoria, estados, bucles y errores logicos.
- Circuit/Ohmdal: electronica como magia perdida dentro de un reino mecanico-medieval.

Para el MVP solo se activa Ohmdal. Los otros mundos quedan como direccion futura, no como alcance.

### Progreso Visible

El progreso debe verse en el mundo, no solo en barras, badges o menues.

Aplicado a Roxana:

- La escuela se limpia, se ilumina y se llena de vida.
- La estatua de Roxana recupera presencia.
- Las salas dejan de parecer cerradas o muertas.
- Los mundos simulacion muestran restauraciones permanentes.
- Un objeto recuperado de cada mundo vuelve al hub y cambia su atmosfera.

### Dialogo Sin Clase

Los documentos de ANAXO refuerzan una regla que ya es central en Roxana:

- El dialogo de gameplay no explica formalmente conceptos cientificos.
- Los personajes guian con observacion, preguntas, metaforas y reacciones.
- La bitacora es el lugar de la explicacion formal.
- Los errores no deben castigar ni humillar. Deben informar.
- Evitar repeticion con bancos de frases por contexto.

### Contenido Como Datos

Se mantiene la direccion:

- Dialogos en JSON/Markdown, no hardcodeados en escenas.
- Bitacora separada de la logica.
- Puzzles definidos con reglas reutilizables.
- Event Bus tipado entre Phaser y React.
- Specs antes de features nuevas.

## Que Se Adapta

### Nombre Y Marca

ANAXO puede quedar como legado interno o inspiracion, pero el proyecto actual debe mantener Proyecto Roxana como eje.

Nombres reutilizables posibles:

- Arithmos para el mundo de matematica.
- Codex para programacion, si no confunde con el entorno de desarrollo.
- Physika para fisica.
- Ohmdal para electronica.

Decision actual: estos nombres quedan como referencia valida, no como canon cerrado. Si aparece un nombre mejor durante el desarrollo, se evalua sin deuda.

### Estetica General

ANAXO era mas plataforma oscura/cosmica. Roxana necesita una mezcla distinta:

- Hub: escuela antigua, calida, misteriosa, con madera, polvo, bronce, papel, luz ambar y sombras suaves.
- Ohmdal: reino tecnico-medieval, cobre, verde profundo, cristal luminoso, mecanismos, automatones, cableado como runas.
- Arithmos futuro: cosmos matematico, azul profundo, blanco, dorado, geometria luminosa.
- Codex futuro: sistemas rotos, bucles, terminales, estaciones, memoria, ruido digital.
- Physika futuro: biomas inestables, fuerzas visibles, cascadas invertidas, trayectorias absurdas.

La regla global es que cada mundo se reconozca por una captura de pantalla sin leer texto.

### Voz Latinoamericana

ANAXO proponia tuteo neutro para toda Latinoamerica. Roxana apunta a Iberoamerica y Espana, pero nace desde una voz argentina.

Decision actual:

- Narrativa base cercana al tono conversacional actual: calida, clara, argentina suave, sin volverse localista.
- Evitar voseo fuerte si vuelve menos natural la lectura para Iberoamerica y Espana.
- Permitir algun giro natural rioplatense en contenido tuyo, videos o piezas de comunicacion externa.
- No usar jerga adolescente forzada.

### Diagnostico

El sistema de diagnostico de Arithmos sirve como idea, pero no debe parecer examen inicial en el MVP.

Para Roxana:

- El diagnostico puede ser una escena opcional de "lectura de la bitacora".
- Si el jugador ya sabe algo, la bitacora puede recuperar paginas iniciales.
- No bloquear el inicio con preguntas largas.

## Que No Se Trae Al MVP

- Plataforma completa con backend, pagos, tienda o instituciones.
- Cuatro mundos implementados.
- Arithmos completo con decenas de niveles.
- Three.js hero cinematics como requisito.
- Diagnosticos adaptativos extensos.
- Sistemas premium.
- Editor visual de contenido.
- Personajes secundarios complejos fuera de Ohmdal.

## Reglas De Produccion Derivadas

- Cada spec nueva debe declarar si toma elementos de este legado.
- Si una decision del legado contradice `docs/PROJECT_STATE.md`, gana `PROJECT_STATE.md`.
- Si contradice la spec activa, gana la spec activa.
- Si contradice la regla narrativa de Roxana, se descarta.
- El legado inspira direccion, no define alcance.

## Material Reusable Para Specs Futuras

### Hub

- Escuela como lugar que no murio por catastrofe, sino por abandono de la curiosidad.
- Restauracion fisica y emocional: luz, limpieza, gente, sonidos, objetos que vuelven.
- Roxana como memoria que no sabe si puede confiar en el jugador, pero espera.

### Ohmdal

- Electronica como magia antigua mal entendida.
- OHM como automata viejo, paciente y tecnico-medieval.
- Mecanismos dormidos que despiertan cuando el jugador restaura caminos de energia.
- Primer capitulo centrado en observar que algo necesita un camino completo para fluir.

### Arithmos Futuro

- Matematica como realidad fisica, no como simbolos escolares.
- Ecuaciones rotas como grietas, estructuras restauradas con luz.
- Guia AXIOM: preciso, paciente, no condescendiente, solitario.
- Progreso como cosmos que recupera coherencia.

### Dialogo

- Frases cortas.
- Preguntas antes que respuestas.
- Sin explicaciones directas.
- Sin "muy bien campeon" ni celebraciones infantiles.
- Si el jugador falla varias veces, primero feedback visual; luego pista suave.

## Preguntas Abiertas

- Confirmar si los nombres Arithmos, Physika, Codex y Ohmdal quedan como canon futuro.
- Confirmar si OHM es el nombre definitivo del guia de Ohmdal o si sera otro automata. Por ahora queda provisional.
- Confirmar si ANAXO queda solo como legado interno o podria nombrar la plataforma futura.
