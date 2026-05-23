# Feature Specification: Ohmdal Chapter 01

**Feature Branch**: `017-ohmdal-chapter-01`

**Status**: Draft

**Input**: Expandir Ohmdal desde un umbral chico hacia un primer capítulo jugable real, con mapa más grande que el viewport, tres puzzles eléctricos conectados narrativamente y bitácora progresiva.

## Decisión de escala y Rediseño Global

El juego adopta de forma global y nativa la resolución de `640x360` para su viewport lógico.

- **Viewport lógico global**: `640x360` (relación de aspecto 16:9).
- **Rediseño nativo de escenas existentes**: Los mapas de la oficina (`roxana-office.map.json`), el aula (`electronics-classroom.map.json`) y el vestíbulo (`roxana-library-hub.map.json`) se rediseñan en sus coordenadas y colisiones a `640x360` de forma nativa para evitar zooms de cámara y mantener la nitidez.
- **Mapa de Ohmdal Capítulo 1**: Lienzo nativo de `1280x720` con cámara que sigue al jugador y respeta los límites del mapa.
- **Grid de diseño**: `32` unidades.

Ver `docs/GAME_SCALE_AND_ART_DIRECTION.md`.

## Objetivo

Convertir Ohmdal en el primer capítulo jugable del vertical slice.

El jugador debe llegar desde la escuela, entrar a un distrito inicial de Ohmdal, observar un mundo roto, resolver tres problemas eléctricos encadenados y volver al Hub con un objeto/conocimiento recuperado.

## Intención de experiencia

Ohmdal debe sentirse como:

- un mundo medieval-fantasy donde la electricidad fue heredada como magia;
- una ciudad de talleres, autómatas y servicios públicos detenidos;
- un lugar que no está destruido por guerra, sino interrumpido por pérdida de comprensión;
- un espacio donde el jugador aprende observando consecuencias;
- un primer mundo que enseña circuito cerrado, continuidad, interruptor/carga y lectura de sistema sin clase directa.

## Alcance

- Adaptar la resolución global del motor a `640x360` y rediseñar los mapas legacy para ajustarlos nativamente a esta escala.
- Crear una escena o mapa nuevo para `OhmdalChapter01`.
- Usar mapa más grande que el viewport con cámara de seguimiento.
- Diseñar tres zonas/puzzles conectados utilizando la arquitectura de **puzzles híbridos** (Phaser para activación y reacción visual; React para la interfaz interactiva).
- Implementar el **ciclo pedagógico de 3 fases** (exploración en bitácora -> feedback metafórico de OHM ante fallos -> formalización en bitácora al completar).
- Mantener textos narrativos en JSON y la bitácora en React.
- Usar placeholders visuales ordenados y definir el layout en `.excalidraw`.

## Fuera de alcance

- Arte final.
- Tileset final.
- Backend.
- Login.
- Tienda.
- Sistema completo de inventario.
- Combate.
- Voces/audio final.
- Mundo completo de Ohmdal.
- Puzzles avanzados de Ley de Ohm formal.
- Evaluaciones escolares obligatorias.

## Mapa propuesto

Mapa de referencia: `1280x720`.

Zonas:

1. **Umbral de llegada**
   - Entrada desde escuela.
   - OHM presenta tono y observa el estado roto.
   - No tutorial directo.

2. **Patio de servicios**
   - Puzzle 1: circuito abierto.
   - Objetivo: restaurar una puerta/mecanismo público.
   - Concepto: continuidad/circuito cerrado.

3. **Calle de talleres**
   - Puzzle 2: selección de camino/conductor.
   - Objetivo: alimentar un autómata de taller.
   - Concepto: continuidad material y rutas conductoras.

4. **Plaza de la fuente**
   - Puzzle 3: distribución simple.
   - Objetivo: encender fuente/puerta de retorno.
   - Concepto: fuente, interruptor, carga y retorno como sistema.

5. **Archivo de bronce**
   - Cierre narrativo.
   - Objeto recuperado: `bobina_memoria_de_ohmdal`.
   - Desbloquea retorno al Hub y entrada de bitácora final.

## User Stories

### US1 - Entrar a un Ohmdal explorable

El jugador cruza desde el aula/portal y aparece en un mapa más grande que una pantalla, con cámara que sigue al personaje.

**Acceptance:**

- El mapa no cabe entero en el viewport.
- El jugador puede recorrer al menos tres zonas conectadas.
- La cámara no muestra fuera de los límites del mapa.
- El room label indica `Ohmdal - Capítulo 1`.

### US2 - Resolver circuito abierto

El jugador observa una línea de bronce interrumpida y debe restaurar continuidad.

**Acceptance:**

- Hay al menos dos inspectables antes del puzzle.
- El puzzle no se presenta como ejercicio escolar.
- Al resolverlo, se actualiza la bitácora `ohmdal_closed_circuit`.
- El mundo reacciona visualmente con luz/mecanismo activo.

### US3 - Elegir un camino conductor

El jugador encuentra un autómata de taller detenido y varias rutas posibles. Algunas no transmiten el pulso.

**Acceptance:**

- El jugador debe probar/observar materiales o rutas.
- La solución se basa en continuidad material, no en adivinar.
- OHM da pistas indirectas.
- Se desbloquea una etapa de bitácora sobre caminos conductores.

### US4 - Restaurar la plaza

El jugador combina fuente, interruptor, carga y retorno para activar la plaza.

**Acceptance:**

- El puzzle usa elementos ya vistos.
- El resultado abre el acceso al archivo de bronce.
- Se desbloquea una entrada técnica opcional más formal.
- No se usa fórmula de Ley de Ohm como requisito de gameplay.

### US5 - Volver al Hub con objeto recuperado

El jugador obtiene una bobina/memoria y vuelve al Hub.

**Acceptance:**

- El regreso queda disponible solo después de completar la plaza.
- El Hub puede reconocer que Ohmdal fue restaurado parcialmente.
- Se emite evento de progreso persistible.
- No se implementa inventario completo; basta con progreso/beat narrativo.

## Reglas narrativas

- OHM no explica ciencia de forma directa.
- OHM observa, recuerda mal, sugiere y reacciona.
- Los habitantes pueden estar ausentes, detenidos o insinuados por objetos.
- La electricidad se percibe culturalmente como magia heredada.
- La bitácora traduce la experiencia a conceptos formales.
- Todo mensaje de puzzle debe sonar como consecuencia del mundo, no consigna escolar.

## Arquitectura de Puzzles Híbridos

Los puzzles utilizan una integración estrecha pero desacoplada entre Phaser y React:
1. **Inicio**: El jugador interactúa en el mapa 2D de Phaser. Phaser congela su movimiento y emite el evento `puzzle:start` con el ID del puzzle.
2. **Interfaz (React Overlay)**: React captura el evento y despliega un overlay a pantalla completa con estética premium (drag & drop, trazos de conexión, animaciones CSS).
3. **Interacciones y Fallos**: Si el jugador comete un error, React emite `puzzle:fail`. Phaser reproduce un sonido o desencadena un diálogo dinámico donde OHM aporta pistas metafóricas indirectas.
4. **Resolución**: Al completarse, React emite `puzzle:complete`. Phaser cierra el overlay de React, ejecuta una animación secuencial (flujo de energía iluminando el bronce en el mapa -> activación física o apertura del elemento del mapa) y desbloquea el movimiento del jugador.

## Ciclo Pedagógico de 3 Fases (Bitácora y Narrativa)

- **Fase 1: Exploración (Observación)**: Inspeccionar el entorno en Phaser antes de resolver desbloquea anotaciones preliminares en la bitácora (`material_observation`).
- **Fase 2: Experimentación (Feedback del error)**: Al fallar en el puzzle interactivo de React, se activan comentarios dinámicos e indirectos de OHM para reorientar al jugador sin explicar de forma académica.
- **Fase 3: Formalización (Conclusión)**: Al resolver el puzzle, la bitácora de React se actualiza desbloqueando la formalización técnica del concepto (`formalization`).

## Eventos de Comunicación Phaser <-> React

- `chapter:start` (Phaser -> React)
- `chapter:complete` (Phaser -> React)
- `world:item-recovered` (Phaser -> React)
- `puzzle:start` (Phaser -> React: abre el overlay interactivo del puzzle y congela movimiento)
- `puzzle:fail` (React -> Phaser: emite cuando el jugador coloca materiales erróneos para activar pistas de OHM)
- `puzzle:complete` (React -> Phaser: cierra el overlay, inicia animaciones en el mapa y devuelve movimiento)
- `journal:entry-unlocked` / `journal:entry-updated` (Phaser -> React)
- `message:show` (Phaser <-> React)
- `dialogue:start` (Phaser -> React)

## Contenido requerido

### Diálogos

- `ohmdal-chapter-01-intro.json`
- `ohmdal-conductive-path-hint.json`
- `ohmdal-plaza-restored.json`
- `ohmdal-chapter-01-exit.json`

### Mensajes

- `ohmdal-chapter-01.json`

### Bitácora

Extender `src/content/journal/ohmdal.json` con:

- etapas para circuito cerrado;
- entrada nueva `ohmdal_conductive_paths`;
- entrada opcional `ohmdal_system_flow`.

## Criterios de aceptación técnicos

- `npm run lint` pasa.
- `npm run build` pasa.
- La escena no hardcodea textos narrativos largos.
- El mapa usa datos externos o estructura migrable a Tiled.
- El runtime soporta mundo más grande que viewport.
- Desktop y mobile siguen funcionando.
- UI React no tapa puzzles críticos.
- El jugador no atraviesa sólidos.
- El progreso de puzzles se puede persistir con el store existente o extensión mínima.

## Riesgos

- Migrar escala y puzzle al mismo tiempo puede romper demasiado.
- Si el arte cambia, assets pixel-perfect podrían quedar descartados.
- Si el mapa es demasiado grande, se pierde foco del vertical slice.
- Si hay demasiada narrativa antes del primer puzzle, se vuelve lento.
- Si los puzzles son demasiado abstractos, se sienten escolares.

## Recomendación de implementación

Implementar en dos PRs:

1. **PR A - Escala/cámara/mapa grande**
   - Agregar soporte de viewport `640x360`.
   - Crear escena nueva con mapa grande placeholder.
   - Validar movimiento, cámara, colisiones, prompts.

2. **PR B - Capítulo jugable**
   - Agregar puzzles, mensajes, diálogos, bitácora y progreso.
   - Mantener todo bajo la spec 017.
