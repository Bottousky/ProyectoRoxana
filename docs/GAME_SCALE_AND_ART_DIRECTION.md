# Game Scale And Art Direction Decision

## Estado actual

El prototipo actual usa:

- viewport Phaser: `384x216`;
- aspect ratio: `16:9`;
- tile/base grid: `16`;
- placeholders rectangulares;
- `pixelArt: true`.

Esto fue útil para validar movimiento, prompts, UI React, diálogos, bitácora, mensajes y transiciones. No debe tomarse como decisión final de arte ni de tamaño de mundo.

## Problema detectado

`384x216` funciona para una habitación placeholder, pero se siente chico para:

- exploración con lectura ambiental;
- niveles con varios puzzles conectados;
- arte no estrictamente pixel art;
- composiciones top-down 2D más elegantes;
- escenas con NPCs, objetos interactivos, caminos y zonas de descanso.

Además, el repo conserva una contradicción histórica: algunas reglas mencionan `512x288` y tiles `32x32`, mientras el runtime actual usa `384x216` y `16`.

## Decisión recomendada

A partir de las nuevas specs, separar tres conceptos:

1. **Viewport lógico**: lo que Phaser muestra antes de escalar al navegador.
2. **Tamaño del mapa/mundo**: el área jugable total. Puede ser más grande que el viewport.
3. **Estilo visual final**: pixel art, 2D estilizado, híbrido o assets generados/retocados.

La decisión de arte no debe obligar a que todos los mapas sean chicos.

## Target recomendado para el vertical slice

- viewport lógico: `640x360`;
- aspect ratio: `16:9`;
- mapas de capítulo: `1280x720` como referencia inicial;
- cámara con seguimiento suave del jugador;
- grid de diseño: `32` unidades, no necesariamente tile pixel-art final;
- UI larga siempre en React/HTML, no en Phaser.

`512x288` sigue siendo una alternativa válida si se decide volver a pixel art más puro. Para arte top-down 2D no estrictamente pixel art, `640x360` da más aire sin abandonar mobile.

## Regla práctica

No crear nuevos mapas importantes como salas completas de `384x216` salvo que sean habitaciones pequeñas intencionales.

Para hubs, mundos y capítulos, diseñar pensando en:

- viewport: lo que ve el jugador;
- mapa: lo que explora;
- cámara: cómo se revela el espacio;
- UI: superpuesta sin tapar interacciones críticas.

## Implicación para Spec 017

`Spec 017 - Ohmdal Chapter 01` debe diseñarse como un mapa de capítulo más grande que el viewport, no como una sala única.

La implementación puede migrar en etapas:

1. mantener el prototipo `384x216` funcionando;
2. agregar constantes de escala/viewport nuevas;
3. crear escena/mapa nuevo con mundo `1280x720`;
4. activar cámara que sigue al jugador;
5. mover Ohmdal 1 a la nueva escala;
6. dejar las escenas viejas como compatibilidad temporal o migrarlas luego.

## Criterio de aceptación

Una decisión de arte futura no debe obligar a rediseñar toda la arquitectura de mapas. El runtime debe soportar placeholders, mapas navegables y assets finales más grandes con cámara.
