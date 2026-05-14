# AI Creative Pipeline

Pipeline de uso de IA para direccion creativa, assets y documentacion visual de Proyecto Roxana.

## Regla base

La IA no decide la direccion del proyecto. La spec, la biblia visual y los criterios de aceptacion deciden. La IA ayuda a explorar, sintetizar, documentar, iterar y producir variantes controladas.

## Orden de trabajo

1. **Spec**
   Definir objetivo, alcance, fuera de alcance, reglas narrativas, reglas tecnicas y QA.

2. **Nucleo narrativo**
   Describir funcion del personaje, mundo o asset dentro del gameplay. Para Roxana: guia emocional, IAmemoria, biblioteca abandonada, pistas indirectas.

3. **Identidad visual**
   Separar lo inalterable de lo variable:
   - silueta;
   - proporcion;
   - paleta;
   - gesto;
   - accesorios esenciales;
   - materiales;
   - atmosfera;
   - errores prohibidos.

4. **Imagen base o referencia madre**
   Generar o seleccionar una base solo cuando la identidad este clara. La imagen se aprueba por continuidad y utilidad, no por impacto estetico aislado.

5. **Character sheet / biblia visual**
   Documentar vistas, proporciones, paleta, variantes permitidas, expresiones, poses, accesorios y mundo compatible.

6. **Pixel art perceptual**
   Traducir el diseno aprobado a pixel art sin perder reconocimiento. Reducir detalle, no identidad.

7. **Asset de produccion**
   Crear sprites, props, tiles, UI o escenas con funcion clara. Cada asset debe declarar uso, escala, formato, estados y restricciones.

8. **Integracion tecnica**
   Incorporar assets al repo solo cuando tengan nombre estable, formato correcto y criterio de reemplazo.

9. **QA visual**
   Revisar legibilidad, continuidad, escala 384x216, coherencia con Roxana y funcionamiento dentro del gameplay.

10. **Contrato de asset**
   Ninguna imagen entra al runtime solo por verse bien. Tilesets, spritesheets, atlas de objetos e icon sheets deben tener manifest JSON que declare recortes, ids, escala, categorias, colisiones e interacciones cuando correspondan.

## Criterios de aceptacion para assets IA

- Tiene una funcion concreta en gameplay, UI, narrativa o documentacion.
- Conserva identidad visual aprobada.
- Se lee en escala reducida.
- No tapa UI ni afecta legibilidad.
- Tiene nombre y ubicacion coherente.
- No reemplaza una decision de diseno que aun no fue especificada.
- No entra al repo como asset final si la spec solo permite placeholders.
- Tiene manifest si se va a usar en Phaser o React como asset recortable.

## Material fuera de alcance actual

- Cinematicas generadas con IA.
- Material 3D.
- Trailer, reels o piezas de marketing.
- Assets finales de mundo completo.

Estos pueden volver con specs dedicadas.
