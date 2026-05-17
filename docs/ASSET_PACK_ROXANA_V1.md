# Asset Pack Roxana V1

Primer pack visual producido con el pipeline de `Spec 009 - Asset Contract Pipeline`.

## Estado

Este pack esta listo como base tecnica para integracion incremental, pero no declara arte final.

Cada dominio incluye:

- una imagen `concept`, generada para direccion visual;
- una imagen `normalized`, con transparencia real y rectangulos exactos;
- un `manifest.json`, con ids estables y coordenadas.

## Archivos

### Biblioteca

```txt
public/assets/environment/library/roxana-library.concept.png
public/assets/environment/library/roxana-library.normalized.png
public/assets/environment/library/roxana-library.manifest.json
```

Uso previsto:

- pisos 16x16;
- paredes y trims 16x16;
- estanterias y props;
- portal inactivo de Ohmdal;
- escritorio/bitacora.

### Roxana

```txt
public/assets/characters/roxana/roxana.concept.png
public/assets/characters/roxana/roxana.normalized.png
public/assets/characters/roxana/roxana.manifest.json
```

Uso previsto:

- idle en 4 direcciones;
- walk en 4 direcciones;
- reading/interact;
- frame base 32x48.

### UI

```txt
public/assets/ui/icons/roxana-icons.concept.png
public/assets/ui/icons/roxana-icons.normalized.png
public/assets/ui/icons/roxana-icons.manifest.json
```

Uso previsto:

- iconos React;
- iconos de acciones;
- bitacora;
- dialogo;
- portal/Ohmdal;
- frame base 32x32.

## Reglas de uso

- El runtime debe usar los archivos `normalized`, no los `concept`.
- El codigo debe referenciar ids del manifest, no coordenadas magicas dispersas.
- Phaser puede cargar spritesheets/atlas desde estos assets, pero la UI textual sigue viviendo en React.
- Si un asset se reemplaza visualmente, su `id` debe mantenerse salvo que cambie su funcion.

## Validacion actual

- Los manifests parsean como JSON.
- Las PNG normalizadas son divisibles por 16.
- La UI sheet usa celdas 32x32.
- El spritesheet de Roxana usa celdas 32x48.
