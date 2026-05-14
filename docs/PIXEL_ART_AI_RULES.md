# Pixel Art AI Rules

Reglas para convertir disenos IA o 2D aprobados a pixel art para Proyecto Roxana.

## Objetivo

Preservar identidad, legibilidad y funcion al traducir personajes, props o tiles a pixel art.

## Matriz de reduccion

| Elemento | Conservar | Simplificar | Eliminar si afecta legibilidad |
| --- | --- | --- | --- |
| Silueta | Contorno, postura y proporciones principales | Bordes secundarios | Detalles que rompan lectura |
| Rostro / gesto | Orientacion, expresion dominante | Rasgos pequenos | Microdetalles faciales |
| Paleta | Colores identitarios | Matices y degradados | Variaciones que ensucien escala |
| Vestuario | Prenda, corte o color narrativo | Texturas y costuras | Decoracion sin funcion |
| Accesorios | Objeto clave de identidad | Forma y color minimos | Accesorios secundarios |
| Props | Funcion jugable | Decoracion interna | Ruido visual |
| Tiles | Lectura de suelo, muro, limite o interactivo | Textura | Patrones que compitan con player |

## Reglas para Roxana

- La version pixel art debe leerse en la resolucion base 384x216.
- Un sprite chico necesita contraste claro con el fondo.
- El player, Roxana, objetos interactivos y hazards deben distinguirse por silueta y color.
- La paleta no debe depender de degradados finos.
- Todo asset debe probarse dentro del canvas, no solo aislado.

## Criterios de aceptacion

- Se reconoce el personaje o asset a escala de juego.
- La silueta se distingue sin zoom.
- El color no se pierde sobre el fondo.
- El asset cumple una funcion concreta.
- La version pixel art no agrega detalles que no existian en la identidad aprobada.
