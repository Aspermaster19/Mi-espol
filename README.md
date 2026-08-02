# Mi Espol App (réplica) — Paso 1: Calendario

Este paquete contiene la primera pantalla (calendario) de la app, lista para publicar en GitHub Pages.

## Archivos
- `index.html` — estructura de la página
- `style.css` — todos los estilos (colores, tamaños, layout)
- `script.js` — lógica (calendario dinámico, fecha de hoy automática, selección de días)

## Cómo publicarlo en GitHub Pages

1. Entra a **github.com** y crea una cuenta si no tienes.
2. Click en **"New repository"**.
   - Nombre sugerido: `mi-espol-app`
   - Marca **Public**
   - Click **Create repository**
3. Dentro del repo recién creado, click en **"Add file" → "Upload files"**.
4. Arrastra los 3 archivos de este paquete (`index.html`, `style.css`, `script.js`).
5. Click **"Commit changes"** (botón verde abajo).
6. Ve a **Settings** (pestaña del repo, arriba) → en el menú izquierdo click **Pages**.
7. En **"Branch"** selecciona `main` y carpeta `/ (root)` → click **Save**.
8. Espera 1-2 minutos, recarga la página de Settings → Pages. Ahí te aparece el link:
   `https://tu-usuario.github.io/mi-espol-app/`
9. Abre ese link en Safari de tu iPhone → toca compartir → **"Añadir a pantalla de inicio"**.

## Para actualizar cambios después
1. Entra al repo en GitHub.
2. Click en el archivo que quieras editar (ej. `style.css`).
3. Click en el ícono de lápiz (✎) arriba a la derecha del archivo.
4. Edita, luego **"Commit changes"**.
5. El sitio se actualiza solo en 1-2 minutos (mismo link de siempre).

## Estado actual
✅ Pantalla del calendario (header, grid de días, agenda del día, nav inferior visual)
⬜ Pantalla de detalle del Gimnasio (Fecha, Horario editable, Contacto, etc.)
⬜ Overlay del código QR
⬜ Conexión entre pantallas (tocar la tarjeta del gym → abrir detalle)

Vamos agregando cada pieza a medida que aprobamos el diseño.
