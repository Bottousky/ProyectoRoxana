# Spec 008 - Roxana Library Hub

## Objetivo

Definir el primer Hub jugable real de Proyecto Roxana: el despacho/libreria de Roxana dentro de la biblioteca central.

Esta spec no implementa el mapa completo del juego. Su objetivo es reemplazar la sala placeholder por un espacio pequeno, legible y extensible que permita probar exploracion, interaccion, bitacora, dialogo y acceso bloqueado hacia Ohmdal.

## Intencion del espacio

El despacho/libreria de Roxana debe sentirse como:

- un refugio dentro de una biblioteca abandonada;
- un centro de memoria danada, no una oficina comun;
- un lugar donde el conocimiento esta presente pero incompleto;
- un tutorial diegetico para movimiento, inspeccion y lectura;
- el punto de partida hacia Ohmdal.

El jugador debe entender, sin explicacion larga, que Roxana vive o permanece alli, que la bitacora es importante y que hay un acceso a otro mundo todavia inestable.

## Alcance

- Convertir `HubScene` en el despacho/libreria inicial.
- Mantener assets placeholder simples.
- Mantener resolucion base 384x216.
- Crear un layout jugable con zonas reconocibles.
- Agregar colisiones simples.
- Agregar un sistema inicial de interactuables.
- Agregar prompts contextuales desde Phaser hacia React.
- Agregar tres interactuables minimos:
  - Roxana;
  - escritorio/bitacora central;
  - portal o puerta hacia Ohmdal bloqueado.
- Mantener dialogos y textos fuera de Phaser.
- Mantener bitacora en React.
- Preparar el layout para reemplazo futuro por Tiled sin reescribir la UI.

## Fuera de alcance

- Arte final.
- Tiled obligatorio.
- Cinematicas.
- Backend.
- Login.
- Tienda.
- Guardado persistente.
- Inventario completo.
- Sistema completo de quests.
- Portal funcional hacia Ohmdal.
- Puzzles de Ohmdal.
- Audio final.

## Decisiones tecnicas

- El mapa puede construirse inicialmente en codigo con rectangles/placeholders.
- Las zonas solidas deben estar representadas como datos simples, no dispersas en logica procedural dificil de reemplazar.
- El player sigue siendo placeholder.
- Roxana sigue siendo placeholder.
- El texto visible de dialogos, bitacora y objetos inspeccionables vive en JSON o en componentes React, no en Phaser.
- Phaser puede mostrar labels minimos de debug/placeholders solo si no reemplazan UI narrativa final.
- React renderiza paneles, dialogos, bitacora y cualquier texto largo.
- Phaser emite eventos para interaccion y prompts.
- Zustand mantiene estado liviano de UI.
- Si se usan assets visuales generados por IA, deben seguir `Spec 009 - Asset Contract Pipeline`: PNG normalizado + manifest JSON + mapa semantico o Tiled.

## Layout propuesto

La sala debe ocupar el espacio jugable completo de 384x216, con margen de paredes y zonas caminables claras.

### Zonas

1. **Entrada del jugador**
   - Ubicacion sugerida: zona inferior izquierda o centro inferior.
   - Funcion: spawn claro, sin obstaculos inmediatos.

2. **Zona de Roxana**
   - Ubicacion sugerida: cerca del escritorio, no bloqueando la entrada.
   - Funcion: primer NPC guia.

3. **Escritorio / bitacora central**
   - Ubicacion sugerida: lateral superior o centro superior.
   - Funcion: anclar la bitacora como objeto diegetico.

4. **Estanterias**
   - Ubicacion sugerida: bordes superior/laterales.
   - Funcion: dar identidad de libreria y crear limites fisicos.

5. **Portal / puerta hacia Ohmdal**
   - Ubicacion sugerida: lateral derecho o fondo superior.
   - Funcion: promesa del siguiente mundo, bloqueada por ahora.

6. **Zona libre central**
   - Funcion: permitir moverse, probar controles y leer prompts sin friccion.

## Interactuables

### Roxana

**Funcion:** activar el dialogo inicial de guia.

**Trigger:** jugador cerca + `E`, `Enter`, `Space` o boton mobile interactuar.

**Resultado esperado:**

- Phaser emite `dialogue:start`.
- React muestra `DialogueBox`.
- Movimiento queda bloqueado durante dialogo.
- React emite `dialogue:complete`.
- Phaser restaura movimiento.

**Contenido:** usar o extender `src/content/dialogues/roxana-intro.json`.

### Escritorio / bitacora central

**Funcion:** reforzar que la bitacora es el lugar de explicacion formal y registro.

**Trigger:** jugador cerca + interactuar.

**Resultado esperado:**

- React abre `JournalPanel`.
- Si se necesita texto contextual corto, debe venir de contenido separado.
- No debe abrir dialogo de Roxana salvo que la spec de narrativa lo pida.

**Contenido inicial sugerido:**

- una entrada central existente;
- una nueva entrada opcional sobre "El Hub";
- ningun tutorial escolar.

### Portal / puerta hacia Ohmdal bloqueado

**Funcion:** mostrar el objetivo futuro sin permitir cambio de mundo todavia.

**Trigger:** jugador cerca + interactuar.

**Resultado esperado:**

- React muestra un mensaje corto o panel contextual.
- El mensaje comunica que el acceso no esta estable.
- No cambia de escena.
- No inicia puzzles.

**Texto narrativo sugerido, no definitivo:**

> El marco vibra como si recordara otro lugar, pero todavia no encuentra la forma de abrirse.

El texto final debe vivir en JSON si se implementa.

## Sistema inicial de interactuables

El Hub necesita una capa pequena y extensible para objetos interactivos.

### Tipo base propuesto

```ts
type InteractableKind = "dialogue" | "journal" | "blocked_gate" | "inspect";

type Interactable = {
  id: string;
  kind: InteractableKind;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  prompt: string;
  payload?: {
    dialogueId?: string;
    journalEntryId?: string;
    messageId?: string;
    targetWorldId?: string;
  };
};
```

Esto es una propuesta de contrato, no una implementacion obligatoria. La implementacion puede ajustar nombres si mantiene separacion de responsabilidades.

## Eventos Phaser <-> React

### Eventos existentes a conservar

- `dialogue:start`
- `dialogue:complete`
- `hud:prompt`
- `input:virtual-direction`
- `input:interact`

### Eventos propuestos

- `interaction:start`
  - Phaser informa que se activo un interactuable.
  - Puede ser usado para analytics/local debug futuro, no obligatorio para UI inmediata.

- `journal:open`
  - Phaser solicita que React abra la bitacora en una entrada o seccion.

- `message:show`
  - Phaser solicita que React muestre texto corto de inspeccion o acceso bloqueado.

Si se agregan estos eventos, deben estar tipados en `src/game/types/events.ts`.

## Contenido necesario

### Dialogos

- Mantener `roxana_intro`.
- Opcional: agregar dialogo breve si Roxana reacciona al portal bloqueado.

### Bitacora

- Mantener entrada central existente.
- Opcional: agregar entrada `central_hub_libreria` para explicar formalmente la funcion del Hub.

### Mensajes de inspeccion

Crear contenido separado si se implementan mensajes:

- escritorio/bitacora;
- portal bloqueado;
- estanterias si se vuelven interactuables.

## Reglas narrativas

- Roxana no debe explicar conceptos cientificos directamente.
- El Hub debe sugerir misterio, memoria y observacion.
- La bitacora puede contener explicacion formal.
- El portal a Ohmdal debe sentirse como promesa, no como feature rota.
- Los prompts deben ser cortos y funcionales.

## Reglas visuales

- Placeholder no significa desordenado.
- Cada objeto principal debe tener silueta y color distinguible.
- El jugador debe distinguir caminable vs solido.
- El portal debe leerse como algo diferente a una pared comun.
- La UI React no debe tapar permanentemente el centro de juego.
- En mobile, D-pad y prompts no deben ocultar interactuables criticos.

## Reglas de arquitectura

- No hardcodear dialogos narrativos dentro de escenas Phaser.
- No renderizar bitacora dentro de Phaser.
- No introducir backend.
- No introducir login.
- No introducir tienda.
- No agregar assets finales.
- No crear una escena gigante con toda la logica mezclada.
- Los interactuables deben poder crecer hacia Tiled o datos externos.
- Las escenas Phaser deben seguir siendo adaptadores de mundo/render/input.

## Criterios de aceptacion

- La app abre en navegador.
- El Hub ya no parece una sala generica: se reconoce como despacho/libreria placeholder.
- El canvas mantiene 384x216 y aspect ratio 16:9.
- El player puede moverse sin atravesar paredes/estanterias principales.
- Roxana se puede interactuar y abre dialogo React.
- El movimiento se bloquea durante el dialogo de Roxana.
- Al completar el dialogo, el movimiento vuelve.
- El escritorio/bitacora se puede interactuar y abre `JournalPanel`.
- El portal/puerta hacia Ohmdal se puede interactuar y muestra estado bloqueado.
- Los prompts contextuales cambian segun el interactuable cercano.
- En desktop funciona teclado.
- En mobile siguen funcionando controles tactiles.
- Dialogos, bitacora y mensajes no quedan hardcodeados como texto narrativo en Phaser.
- `npm run lint` pasa.
- `npm run build` pasa.

## QA esperado

1. Ejecutar `npm run lint`.
2. Ejecutar `npm run build`.
3. Abrir `http://localhost:3000`.
4. Verificar que el mapa se ve como libreria/despacho placeholder.
5. Mover jugador con WASD y flechas.
6. Probar colisiones contra estanterias/paredes principales.
7. Interactuar con Roxana.
8. Confirmar que el player no se mueve durante dialogo.
9. Completar/cerrar dialogo.
10. Confirmar que el player vuelve a moverse.
11. Interactuar con escritorio/bitacora.
12. Confirmar que se abre/cierra la bitacora React.
13. Interactuar con portal/puerta bloqueada.
14. Confirmar que no cambia de escena y muestra mensaje.
15. Revisar viewport mobile o angosto.

## Riesgos

- Meter demasiada narrativa antes de tener interacciones solidas.
- Convertir placeholders en arte semi-final prematuro.
- Acoplar interactuables a una escena especifica y dificultar Tiled.
- Tapar el playfield con UI persistente.
- Resolver el portal como cambio de escena antes de tener Ohmdal especificado.

## Notas para implementacion futura

- Si el layout en codigo empieza a crecer, mover datos de solidos/interactuables a archivos dedicados.
- Si se decide usar Tiled, esta spec debe actualizarse con nombres de layers y object properties.
- El portal hacia Ohmdal deberia conectarse luego con una spec propia de transicion de mundo.
- Esta spec debe implementarse antes de puzzles reales de Ohmdal.
