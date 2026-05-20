# Roxana - Vertical Slice 0.1

**Fecha**: 2026-05-19  
**Objetivo**: construir una primera experiencia publicable, corta y pulida, que demuestre la fantasia educativa.

## Nombre Interno

**Capitulo 1 - El circuito dormido**

## Hipotesis A Validar

Un jugador de 12 a 18 anos puede sentir curiosidad por electronica si primero vive un problema narrativo y experimental, y recien despues recibe una formalizacion opcional en la bitacora.

## Alcance De 1 Mes

La meta de 1 mes no es tener un producto completo. Es tener algunos niveles o salas 100% jugables que muestren el corazon de la experiencia.

Incluye:

- entrada o pantalla inicial simple;
- sala principal de la escuela;
- estatua apagada de Roxana;
- despacho de Roxana;
- descubrimiento de la bitacora vacia;
- antesala del mundo de electronica;
- primer puzzle de circuito abierto/cerrado;
- primera entrada de bitacora simple;
- primera entrada de bitacora tecnica opcional;
- persistencia minima de progreso;
- eventos basicos de analytics.

No incluye:

- cuatro mundos;
- tienda;
- monetizacion;
- editor de contenido;
- inventario complejo;
- evaluaciones formales obligatorias;
- backend complejo si bloquea el avance.

## Alcance De 6 Meses

La meta de 6 meses es publicar una version 0.1 interesante y jugable.

Incluye:

- escuela como hub reconocible;
- despacho de Roxana;
- bitacora visual atractiva;
- antesala de Electronica/Ohmdal;
- primer mundo o seccion de Ohmdal;
- 3 a 5 puzzles de electronica;
- guia propio del mundo;
- restauracion parcial de la escuela;
- videos opcionales desde bitacora o estudio;
- ejercicios opcionales para logros;
- progreso persistente;
- analytics de aprendizaje y avance;
- landing o pagina publica;
- feedback de jugadores.

## Primer Puzzle

### Fantasia

Un mecanismo del mundo esta dormido. Hay una fuente, caminos conductores, una interrupcion y una carga o mecanismo final. El jugador no recibe la frase "esto es un circuito cerrado"; debe descubrir que la energia necesita un camino completo.

### Regla Oculta

Para que el mecanismo despierte, debe existir una trayectoria cerrada entre la fuente y la carga.

### Feedback

- Si el circuito esta abierto, el mecanismo responde debilmente o no responde.
- Si el jugador prueba una configuracion incorrecta, el mundo reacciona sin castigar con vidas.
- Si el camino se cierra, aparecen luz, sonido, movimiento o recomposicion.
- El guia reacciona con preguntas o asombro, no con definiciones.

### Bitacora Simple

Idea esperada:

> La energia no alcanza con estar cerca. Necesita un camino completo para llegar y volver. Cuando el camino se corta, el mecanismo queda dormido.

### Bitacora Tecnica

Debe formalizar:

- circuito electrico cerrado;
- fuente;
- conductor;
- carga;
- interrupcion o circuito abierto;
- corriente como circulacion en una trayectoria cerrada;
- preparacion para Ley de Ohm y Kirchhoff sin adelantarlas demasiado.

## Progresion Inicial De Electronica

1. Circuito cerrado: para fluir debe existir camino completo.
2. Resistencia: no todos los caminos permiten el mismo flujo.
3. Ley de Ohm basica: relacion entre tension, corriente y resistencia.
4. Serie y paralelo: caminos y distribucion.
5. Kirchhoff basico: conservacion en nodos y mallas.

## Salas Minimas

- Sala principal de escuela: identidad, misterio, estatua de Roxana y puertas.
- Despacho de Roxana: descubrimiento de bitacora y primera conexion emocional.
- Antesala de Electronica: umbral a Ohmdal y preparacion del primer sistema.
- Sala/puzzle de circuito dormido: primera experiencia experimental.

## Direccion Visual

La prioridad es lograr algo lindo, coherente y producible.

Se permite:

- fondos completos por sala generados con IA;
- capas separadas para foreground si algo debe tapar al personaje;
- colisiones invisibles;
- hotspots interactivos;
- sprites simples con animaciones minimas;
- irregularidad visual moderada si permite avanzar.

Se debe evitar:

- tilesets enormes como requisito inicial;
- mapas grandes genericos;
- depender de arte final perfecto antes de validar;
- texto complejo dentro del canvas.

## Analytics Minimos

- `started_game`
- `entered_school`
- `opened_roxana_office`
- `found_bitacora`
- `opened_bitacora`
- `entered_electronics_room`
- `started_puzzle_closed_circuit`
- `failed_puzzle_closed_circuit`
- `completed_puzzle_closed_circuit`
- `opened_light_entry`
- `opened_formal_entry`
- `clicked_video`
- `completed_optional_exercise`
- `finished_demo`

## Criterios De Terminado

- Un jugador puede iniciar, explorar, encontrar la bitacora, entrar a la antesala de electronica y resolver el primer puzzle.
- El juego se entiende sin ver videos.
- La bitacora simple ayuda a recordar lo vivido.
- La bitacora tecnica permite estudiar con mas precision.
- El primer puzzle ensena por observacion y feedback.
- Los dialogos no explican formalmente el concepto.
- Funciona en desktop y mobile horizontal.
- La experiencia se puede mostrar publicamente sin pedir disculpas por el estado del prototipo.
