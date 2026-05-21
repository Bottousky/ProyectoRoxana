# Proyecto Roxana - Estado Alineado

**Fecha**: 2026-05-19  
**Estado**: direccion de producto consolidada para vertical slice

## Identidad

Proyecto Roxana es una aventura educativa web donde el jugador explora una antigua escuela abandonada, restaura mundos-simulacion creados por profesores del pasado y aprende ciencia, tecnologia y pensamiento tecnico experimentando, no estudiando.

El objetivo principal no es ayudar a aprobar examenes. Aprobar puede ser un efecto secundario. El objetivo central es despertar curiosidad, pensamiento tecnico y ganas de entender como funcionan las cosas.

## Audiencia

- Publico principal: estudiantes de 12 a 18 anos de Iberoamerica y Espana.
- Publico inicial de validacion: estudiantes interesados, curiosos o frustrados por materias tecnicas.
- Publico futuro: docentes, escuelas, familias y estudiantes avanzados.

## Experiencia Principal

El jugador encuentra una escuela que fue reconocida mundialmente por su vida cientifica y tecnica. Hoy esta abandonada porque la sociedad dejo de valorar el conocimiento, la pregunta y la exploracion.

La escuela funciona como hub persistente y dashboard del jugador. Desde la sala principal se accede a salas tematicas, y cada sala contiene un portal hacia un mundo-simulacion especializado.

Los mundos previstos son:

- Electronica: Ohmdal, un mundo medieval-tecnologico donde la electronica se interpreta como magia perdida.
- Programacion: un mundo de sistemas absurdos, bucles, estados olvidados y memoria rota.
- Fisica: un mundo donde las leyes dejaron de comportarse de forma estable.
- Matematica: un mundo construido sobre leyes elementales, patrones y estructuras.

El primer mundo de produccion es Electronica/Ohmdal.

## Capas Del Producto

### Juego

La capa principal. El jugador explora, prueba, falla, observa feedback del mundo, conversa con personajes y resuelve situaciones usando pensamiento tecnico.

El juego no debe sentirse como una clase. Los personajes no explican conceptos formalmente durante gameplay.

### Bitacora

La bitacora es central para la identidad, pero no debe bloquear todo avance. Funciona como ayuda memoria, registro del viaje y puente hacia la formalizacion.

La bitacora tiene dos niveles:

- Bitacora simple: resume lo vivido en lenguaje narrativo, corto y util para seguir jugando.
- Bitacora tecnica: formaliza conceptos con precision, formulas, diagramas, animaciones y links opcionales a videos.

### Estudio Opcional

La web puede tener un apartado mas tradicional para estudiar:

- videos;
- ejercicios opcionales;
- evaluaciones para logros extra;
- simuladores;
- material descargable;
- bitacoras extendidas.

Este apartado no debe contaminar la experiencia principal del juego.

## Decisiones Cerradas

- Formato: aventura narrativa web por salas.
- Plataforma: web-first, mobile horizontal desde el dia 1.
- Escuela: hub persistente y dashboard del jugador.
- Primer mundo: Electronica/Ohmdal.
- Primer concepto: circuito cerrado como condicion para que algo fluya.
- Primer objetivo publico: 1000 jugadores.
- Arte: priorizar facilidad de produccion, coherencia y belleza suficiente.
- Pipeline visual permitido: fondos por sala generados con IA, colisiones invisibles, hotspots y sprites simples.
- Bitacora: dos capas, simple y tecnica.
- Videos: opcionales, nunca necesarios para avanzar.
- Evaluaciones: opcionales y asociadas a logros o estudio.
- Monetizacion inicial: no publicidad; primero comunidad, validacion y contenido avanzado futuro.

## Direccion Narrativa

Roxana no esta presente fisicamente. Su presencia aparece a traves de recuerdos, imagenes, ecos u hologramas. La estatua central representa a Roxana y se recompone a medida que la escuela recupera vida.

La bitacora esta vacia porque es unica para cada jugador y se completa con sus conocimientos. Si existe diagnostico inicial, puede prellenarse con lo que el jugador ya sabe.

Los mundos-simulacion fueron creados por antiguos profesores, cientificos e investigadores de la escuela para ensenar, experimentar y comprobar hipotesis.

No hay antagonista tradicional. El conflicto principal es la apatia, la desconexion y la perdida de curiosidad.

La distopia debe tratarse de forma sutil: se muestra a traves de espacios abandonados, tecnologia usada sin comprension, carteles, ausencias y comentarios del mundo. Evitar discursos frontales.

La iteracion anterior de ANAXO queda capturada como material de legado en `docs/LEGACY_ANAXO_CAPTURE.md`. Sus ideas reutilizables son identidad de mundos, progreso visible, voz no escolar, estetica oscura/luminosa y contenido data-driven. Si contradice este documento o la spec activa, no se importa.

## Direccion Educativa

El aprendizaje ocurre por:

1. Problema del mundo.
2. Experimentacion.
3. Error sin castigo duro.
4. Feedback visual o narrativo.
5. Reconocimiento de patrones.
6. Resolucion.
7. Formalizacion en bitacora.
8. Profundizacion opcional.

Los dialogos de gameplay pueden hacer preguntas, reaccionar, dar pistas indirectas y usar metaforas. Las definiciones formales viven en la bitacora tecnica.

## Capa Documental Activa

La capa documental de narrativa y game design para el vertical slice vive en:

- `docs/game-bible.md`
- `docs/narrative-rules.md`
- `docs/dialogue-style.md`
- `docs/journal-design.md`
- `docs/ohmdal-story.md`
- `docs/ohmdal-curriculum.md`
- `docs/puzzle-patterns.md`

La profundidad actual debe concentrarse en Hub, despacho, Roxana, aula de Electronica, Ohmdal y OHM. Los otros mundos permanecen como canon liviano hasta nuevo aviso.

Spec activa de pacing narrativo: `specs/016-roxana-office-ohmdal-layout/`. Esta spec fija que la estatua no debe cargar exposicion, que el despacho de Roxana es una sala explorable donde se descubre la bitacora, y que Ohmdal debe presentarse como mundo habitado por humanos y automatas antes del primer puzzle.

## Direccion De Produccion

Como el equipo inicial es una sola persona sin experiencia previa en desarrollo de videojuegos ni arte, el proyecto debe optimizar para:

- alcance chico;
- salas memorables;
- sistemas simples;
- assets producibles con IA;
- contenido data-driven;
- pruebas tempranas;
- iteracion rapida.

Evitar por ahora:

- RPG grande;
- cuatro mundos completos;
- mapa abierto;
- inventario complejo;
- tienda;
- backend complejo;
- editor visual propio;
- assets finales perfectos antes de validar.

## Modelo De Negocio Futuro

La primera validacion no es vender, sino conseguir jugadores y feedback.

Posibles lineas futuras:

- capitulos avanzados pagos;
- contenidos para ingreso tecnico o facultad;
- bitacoras digitales extendidas;
- libros fisicos tipo bitacora;
- libros infantiles narrativos;
- kits de electronica;
- personajes o figuras 3D;
- guias para docentes;
- licencias institucionales en una etapa posterior.

La publicidad no es recomendable para el MVP porque ensucia la experiencia y aporta poco sin volumen grande.

## Preguntas Abiertas Controladas

- Nombre publico definitivo del proyecto y del primer capitulo.
- Nivel exacto de formalidad matematica para cada rango de edad.
- Si el movimiento final sera libre simple, tap-to-move o una combinacion.
- Como se expresara el diagnostico inicial sin sentirse como examen.
- Que canal de comunidad se usara primero despues de YouTube.
