# Feature Specification: Ohmdal Chapter 01

**Feature Branch**: `017-ohmdal-chapter-01`

**Status**: Draft

**Input**: Expandir Ohmdal desde un umbral chico hacia un primer capítulo jugable real, con mapa más grande que el viewport, tres puzzles eléctricos conectados narrativamente y bitácora progresiva.

## Decisión de escala

Esta feature NO debe asumir que el juego final será pixel art 16x16 ni que cada sala ocupa una pantalla completa.

Target de diseño:

- viewport lógico recomendado: `640x360`;
- mapa del capítulo: referencia `1280x720`;
- grid de diseño: `32`;
- cámara con seguimiento del jugador;
- UI textual en React;
- arte placeholder permitido, pero con composición compatible con arte 2D top-down estilizado.

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

- Crear una escena o mapa nuevo para `OhmdalChapter01`.
- Usar mapa más grande que el viewport.
- Incorporar cámara con límites de mundo.
- Diseñar tres zonas/puzzles conectados.
- Mantener textos narrativos en JSON.
- Mantener bitácora en React.
- Mantener Phaser como mundo/input/colisiones/interactuables.
- Usar placeholders visuales ordenados.
- Crear o extender mensajes, diálogos y entradas de bitácora.
- Definir layout en archivo de diseño editable `.excalidraw`.

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

## Eventos propuestos

- `chapter:start`
- `chapter:complete`
- `world:item-recovered`
- `puzzle:hint`
- `puzzle:complete`
- `journal:entry-updated`
- `message:show`
- `dialogue:start`

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
