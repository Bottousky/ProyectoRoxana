# Spec 024 - Ohmdal Chapter 1 Closure

## Objetivo

Cerrar el capitulo 1 de Ohmdal con compuerta de archivo habilitada al terminar la trilogia de puzzles, recuperacion de `bobina_memoria_de_ohmdal` y retorno al Hub con reconocimiento.

## Alcance

- Evento `world:item-recovered`.
- Persistencia de items recuperados en progreso local.
- Archivo habilitado luego de puzzle 3.
- Interaccion de bobina que retorna al Hub.
- Mensaje de reconocimiento en Hub al volver con la bobina.

## Criterios de aceptacion

1. Sin completar puzzle 3 no se puede recuperar bobina.
2. Al recuperar bobina se persiste progreso y retorno al Hub.
3. Hub reconoce el retorno con item.
