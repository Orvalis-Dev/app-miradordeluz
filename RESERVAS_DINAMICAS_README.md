# Sistema de Reservas Dinámico - Mirador de Luz

## Descripción General

Se ha implementado un sistema de **reservas dinámico** que permite tener 4 páginas de reserva individuales (una para cada cabaña) usando una única página Astro con parámetros de consulta (query params).

## Estructura de URLs

```
/reservas?cabana=1  →  Cabaña Nº1
/reservas?cabana=2  →  Cabaña Nº2
/reservas?cabana=3  →  Cabaña Nº3
/reservas?cabana=4  →  Cabaña Nº4
```

## Cambios Realizados

### 1. Archivo: `src/pages/reservas.astro`

#### Cambios principales:

- **Lectura dinámica de parámetros**: Se lee el parámetro `?cabana=X` de la URL
  ```typescript
  const url = new URL(Astro.request.url);
  const cabanaId = url.searchParams.get("cabana") ?? "1";
  ```

- **Configuración centralizada de 4 cabañas**:
  ```typescript
  const cabanasConfig = {
    "1": { nombre: "Cabaña Nº1", ... },
    "2": { nombre: "Cabaña Nº2", ... },
    "3": { nombre: "Cabaña Nº3", ... },
    "4": { nombre: "Cabaña Nº4", ... },
  };
  ```

- **Carga dinámica de imágenes locales**:
  ```typescript
  const images = [
    `/images/${imageFolder}/cabaña-${cabanaId}-portada.webp`,
    `/images/${imageFolder}/cabaña-${cabanaId}-habitacion.webp`,
    `/images/${imageFolder}/cabaña-${cabanaId}-cocina-comedor.webp`,
    `/images/${imageFolder}/cabaña-${cabanaId}-baño.webp`,
    `/images/${imageFolder}/cabaña-${cabanaId}-living.webp`,
  ];
  ```

- **Títulos dinámicos**: El `<h1>` se centra automáticamente y muestra el nombre de la cabaña seleccionada
  ```html
  <h1 class="text-3xl font-extrabold text-[#1E1E1E] mt-3 text-center">
    {cabana.nombre}
  </h1>
  ```

- **Link "Volver atrás"**: Redirecciona a `/#nuestras-cabanas`
  ```html
  <a href="/#nuestras-cabanas" aria-label="Volver atrás">
    ← Volver atrás
  </a>
  ```

- **Amenidades dinámicas**: Usa `cabana.caracteristicas` para mostrar las amenidades específicas de cada cabaña

### 2. Archivo: `src/components/react/SectionCabanasMiradorDeLuzV3.tsx`

#### Cambio:
- Se agregó `id="nuestras-cabanas"` a la sección para que el link "Volver atrás" funcione correctamente:
  ```typescript
  <section className="w-full bg-stone-100 pt-[50px] pb-0" id="nuestras-cabanas">
  ```

## Información de Cabañas

Cada cabaña tiene la siguiente configuración en `reservas.astro`:

| Propiedad | Cabaña 1 | Cabaña 2 | Cabaña 3 | Cabaña 4 |
|-----------|----------|----------|----------|----------|
| Nombre | Cabaña Nº1 | Cabaña Nº2 | Cabaña Nº3 | Cabaña Nº4 |
| Capacidad | 4 personas | 6 personas | 4 personas | 6 personas |
| Precio Base | 85,000 | 110,000 | 98,000 | 135,000 |
| Carpeta de Imágenes | cabana-1 | cabana-2 | cabana-3 | cabana-4 |

## Características por Cabaña

### Cabaña Nº1 (4 personas)
- Cama Matrimonial
- Smart TV 43"
- Vista a montañas
- Cochera

### Cabaña Nº2 (6 personas)
- 2 Dormitorios
- Smart TV 43"
- Cocina equipada
- Cochera

### Cabaña Nº3 (4 personas)
- Cama Matrimonial
- Smart TV 43"
- Cocina completa
- Cochera

### Cabaña Nº4 (6 personas)
- 2 Dormitorios
- Smart TV 43"
- Cocina completa
- Cochera

## Flujo de Navegación

1. **Usuario está en `index.astro`** → Ve la sección "Nuestras Cabañas"
2. **Usuario hace clic en "Reservar"** → Se redirecciona a `/reservas?cabana=1` (o 2, 3, 4)
3. **Página de reservas carga dinámicamente**:
   - ✅ Título correcto (centrado)
   - ✅ Imágenes locales de la cabaña seleccionada
   - ✅ Descripción dinámicas
   - ✅ Amenidades específicas
   - ✅ Precio base correcto
4. **Usuario hace clic en "Volver atrás"** → Se redirecciona a `/#nuestras-cabanas` (vuelve a la sección de cabañas)

## Rutas de Imágenes

Las imágenes se cargan desde `/public/images/cabana-x/`:

```
/public/images/
├── cabana-1/
│   ├── cabaña-1-portada.webp
│   ├── cabaña-1-habitacion.webp
│   ├── cabaña-1-cocina-comedor.webp
│   ├── cabaña-1-baño.webp
│   ├── cabaña-1-living.webp
│   └── ... (más imágenes)
├── cabana-2/
│   └── ... (mismo patrón)
├── cabana-3/
│   └── ... (mismo patrón)
└── cabana-4/
    └── ... (mismo patrón)
```

## Accesibilidad

- ✅ Links con `aria-label` descriptivos
- ✅ Imágenes con `alt` text dinámico
- ✅ Contraste de colores adecuado (4.5:1)
- ✅ Navegación por teclado completa

## Testing

Para verificar que el sistema funciona correctamente:

1. Navega a `/` (página principal)
2. Ve a la sección "Nuestras Cabañas"
3. Haz clic en "Reservar" en cualquier cabaña
4. Verifica que:
   - ✅ El título es correcto
   - ✅ Las imágenes son de la cabaña seleccionada
   - ✅ Las amenidades coinciden
   - ✅ El link "Volver atrás" funciona

## Notas Técnicas

- La página usa `Astro.redirect("/")` si no existe una cabaña válida
- Las imágenes se filtran usando `.filter((img) => img)` para casos donde no existan archivos
- Los precios se calculan dinámicamente según temporadas
- Los títulos se centran con `text-center` en Tailwind CSS







