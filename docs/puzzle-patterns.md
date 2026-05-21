# Puzzle Patterns

## Rol De Este Documento

Define patrones repetibles para disenar puzzles de Roxana, sobre todo en mundos tecnicos como Ohmdal.

No reemplaza la spec de un puzzle puntual. La orienta.

## Regla Base

Un puzzle no es una traba arbitraria.

Es una situacion del mundo cuyo funcionamiento esta herido.

## Estructura Minima

1. Presentacion de estado roto.
2. Observacion de piezas.
3. Primera accion del jugador.
4. Feedback claro.
5. Segundo intento con mejor lectura.
6. Restauracion parcial o total.
7. Bitacora desbloqueada o ampliada.

## Patron 1 - Camino Incompleto

### Se usa para

Circuitos, puentes, puertas y mecanismos de flujo.

### Senales visibles

- brillo que se corta;
- trayecto oscuro;
- respuesta parcial;
- sonido que no termina.

### Error bueno

El jugador activa algo, ve que casi funciona y entiende que falta una conexion o retorno.

### Error malo

Nada cambia y el jugador no aprende nada.

## Patron 2 - Pieza Fuera De Lugar

### Se usa para

Sistemas modulares, bloques y componentes movibles.

### Senales visibles

- una parte vibra;
- un encastre no coincide;
- una forma no cierra.

## Patron 3 - Secuencia De Activacion

### Se usa para

Puertas, laboratorios, pruebas guiadas y ritos tecnicos.

### Riesgo

Puede volverse combinacion ciega si no hay pistas fisicas claras.

## Patron 4 - Comparacion De Estados

### Se usa para

Mundos donde el jugador ve como deberia ser algo frente a como esta.

### Recurso clave

Preview, recuerdo o demo idealizada antes de la interaccion real.

## Regla De Feedback

Cada intento debe producir al menos una de estas respuestas:

- luz;
- sonido;
- movimiento;
- mensaje ambiental corto;
- reaccion del guia;
- cambio persistente del espacio.

## Regla De Hints

Orden de ayuda recomendado:

1. feedback del mundo;
2. lectura visual;
3. comentario ambiental;
4. linea breve del guia;
5. bitacora opcional.

## Anti Patrones

Evitar:

- acertijos arbitrarios sin relacion con el mundo;
- combinaciones ciegas;
- interacciones sin feedback;
- personajes que expliquen la solucion antes del intento;
- puzzles cuyo fracaso no deje ninguna informacion nueva.

## Plantilla De Diseno De Puzzle

Cada puzzle importante deberia poder describirse con:

- herida del mundo;
- objetivo visible;
- piezas interactivas;
- primer intento probable;
- feedback de error;
- lectura correcta;
- restauracion conseguida;
- entrada de bitacora asociada.

## Regla Anti Clase

Si el puzzle necesita un personaje explicando teoria antes de que el jugador toque algo, el puzzle esta mal planteado.
