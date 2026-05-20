# Roxana Voice And Visual Guide

Guia corta para escribir dialogos, escenas y direccion visual sin romper la identidad del proyecto.

## Principio Central

El juego no explica primero. Hace que el jugador observe, pruebe, falle y reconozca un patron. Despues la bitacora formaliza.

## Voz General

- Clara, sobria y calida.
- Natural para 12+, sin infantilizar.
- Cercana al tono conversacional actual: argentina suave, comprensible para Iberoamerica y Espana.
- Sin jerga adolescente forzada.
- Sin chistes que rompan el misterio.
- Sin frases de curso tradicional.
- Mejor una frase precisa que tres explicaciones.

## Reglas De Dialogo

Permitido:

- Preguntar.
- Nombrar lo que cambia en el mundo.
- Dar pistas indirectas.
- Usar metaforas del lugar.
- Reaccionar al estado emocional de la escena.
- Hacer silencio.

Evitar:

- Definiciones escolares.
- Formulas en dialogo.
- Instrucciones de UI dentro de la voz del personaje.
- Explicar la solucion completa.
- Repetir el mismo hint en cada error.
- Felicitaciones condescendientes.

Ejemplos prohibidos en gameplay:

- "Esto es un circuito cerrado."
- "La ley de Ohm dice que V es igual a I por R."
- "Toca el boton rojo para abrir el menu."
- "Muy bien, aprendiste electricidad."

Ejemplos validos en gameplay:

- "El mecanismo sigue esperando algo."
- "Mira el camino completo, no solo la chispa."
- "Antes hizo ruido. Ahora no. Algo cambio."
- "No parece roto. Parece interrumpido."

## Roxana

Roxana no es tutorial, mascota ni docente frontal. Es memoria, presencia y pregunta.

En la estatua del hub, Roxana no aparece como holograma completo ni como una conciencia plenamente despierta. La primera presencia debe sentirse como inscripciones que reaccionan al jugador y forman una voz incompleta entre marmol, polvo y memoria.

### Rasgos

- Serena.
- Luminosa.
- Melancolica sin volverse triste todo el tiempo.
- Inteligente sin exhibirse.
- Afectuosa sin ser invasiva.
- Confia lentamente.

### Como Habla

- Frases breves o medianas.
- Preguntas abiertas.
- Imagenes de memoria, luz, polvo, silencio, puertas, paginas y ecos.
- Pocas certezas absolutas.
- Puede admitir que no recuerda todo.

### Banco De Tono

- "La escuela no esta vacia. Solo esta esperando que alguien vuelva a mirar."
- "Esa puerta no se abrio por fuerza. Algo la reconocio."
- "Hay recuerdos que no vuelven solos."
- "No busques una respuesta todavia. Mira que cambio."
- "La bitacora no estaba en blanco. Te estaba esperando."

## OHM / Guia De Ohmdal

OHM es el nombre provisional del automata antiguo de Ohmdal. No debe sonar moderno ni como profesor escolar.

### Rasgos

- Viejo.
- Paciente.
- Construido para servir, pero no servil.
- Tecnico-medieval.
- Levemente oxidado en su forma de comprender el mundo.
- Respeta los mecanismos porque alguna vez fueron sagrados.

### Como Habla

- Usa imagenes de forja, pulso, bronce, camino, llave, chispa, mecanismo y juramento.
- Da pistas como artesano, no como docente.
- Si el jugador falla, observa la reaccion del sistema antes de opinar.

### Banco De Tono

- "El bronce escucho algo, pero no alcanzo."
- "Ese pulso encontro pared."
- "El mecanismo no esta muerto. Esta sin camino."
- "Antiguamente, nadie despertaba una puerta a golpes."
- "La chispa volvio. Pequeña, pero volvio."

### Nombres Alternativos Posibles

- Ohm: directo, claro, educativo, facil de recordar.
- Omero: mas personaje, menos concepto directo; puede sonar antiguo y amable.
- Bronce: simple, memorable, muy ligado al cuerpo del automata.
- Voltio: mas jugueton, pero puede quedar demasiado obvio.
- Aural: suena antiguo/luminoso, menos tecnico.
- Ferrum: metalico y medieval, aunque menos conectado a electricidad.

Decision actual: mantener OHM/Ohm como placeholder hasta que el personaje tenga mas escenas y el nombre se gane solo.

## Bitacora

La bitacora tiene dos capas.

### Capa Simple

Debe ayudar a seguir jugando. Usa lenguaje claro y conectado a lo vivido.

Ejemplo:

"Cuando el camino quedo completo, el mecanismo desperto. La energia no salto de una pieza a otra: necesito una ruta cerrada."

### Capa Tecnica

Debe formalizar con precision. Puede usar conceptos, formulas, diagramas, animaciones y links.

Ejemplo:

"Un circuito electrico permite circulacion de corriente cuando existe una trayectoria cerrada entre los bornes de la fuente y la carga."

## Feedback De Error

Orden recomendado:

1. Feedback visual del mundo.
2. Sonido o animacion breve.
3. Mensaje ambiental corto si hace falta.
4. Pista narrativa despues de varios intentos.
5. Bitacora o ayuda opcional si el jugador la abre.

No usar dialogo de guia en cada error.

## Direccion Visual Global

Roxana debe sentirse artesanal, misteriosa y clara.

Reglas:

- Belleza producible antes que espectacularidad inmanejable.
- Ambientes memorables antes que mapas grandes.
- Pixel art top-down con lectura limpia.
- UI React moderna, legible y no intrusiva.
- Textos siempre comodos en desktop y mobile.
- Progreso visible en los espacios.

## Hub

Sensacion: escuela antigua, calida y misteriosa.

Elementos:

- Madera oscura.
- Piso gastado.
- Escaleras hacia balcon.
- Estatua central de Roxana.
- Archivos, estantes, carteleras y libros entre las dos escaleras.
- Puertas laterales hacia salas/mundos.
- Despacho de Roxana al norte, en balcon.
- Entrada principal desde el sur.

Paleta sugerida:

- Madera oscura.
- Ambar.
- Bronce envejecido.
- Papel viejo.
- Azul noche muy profundo.
- Luz blanca calida en restauraciones.

## Ohmdal

Sensacion: reino tecnico-medieval donde la electricidad se recuerda como magia antigua.

Elementos:

- Bronce, cobre y hierro.
- Cristales conductores.
- Cables como runas o raices.
- Puertas mecanicas.
- Automatones.
- Forjas, puentes, torres y mecanismos dormidos.

Paleta sugerida:

- Verde profundo.
- Cobre.
- Bronce.
- Dorado tenue.
- Cristal verde/amarillo luminoso.
- Sombras marron verdosas.

## Reglas Para Specs Futuras

Cada spec con contenido narrativo debe incluir:

- Voz del personaje.
- Que no puede decir.
- Que se formaliza en bitacora.
- Feedback de error.
- Evento Phaser emitido.
- Reaccion React esperada.
- Criterios de lectura en mobile.
