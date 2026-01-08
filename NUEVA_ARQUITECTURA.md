# Nueva Arquitectura y Rediseño de Software - Mirador de Luz

Como Arquitecto Senior, he transformado la estructura del proyecto para pasar de un modelo de "crecimiento orgánico" a una arquitectura escalable, mantenible y profesional basada en **Atomic & Domain Driven Design**.

## 1. Justificación de la Reestructuración

### El Problema Anterior

- **Duplicación de Código (VIOLACIÓN DRY):** Existían archivos estáticos para cada cabaña (`reserva-cabana-1.astro`, etc.), lo que multiplicaba el esfuerzo de mantenimiento.
- **Contaminación de Componentes:** La carpeta `src/components/react` mezclaba UI genérica (iconos), lógica de negocio (formularios) y bloques de página (secciones).
- **Dificultad de Navegación:** El uso de rutas relativas complejas (`../../../../`) hacía que mover un archivo fuera una tarea propensa a errores.

### La Solución Implementada

- **Enrutamiento Dinámico:** Se unificó la lógica en `/reserva/[id].astro`, permitiendo que el sistema escale a N cabañas sin tocar el código de páginas.
- **Separación de Preocupaciones (SoC):** Se categorizaron los componentes según su responsabilidad.
- **Abstracción de Rutas (Path Aliases):** Implementación de alias `@components`, `@constants`, etc., para desacoplar la ubicación física de los archivos de su uso.

---

## 2. Nueva Estructura de Directorios

```text
src/
├── components/
│   ├── common/            # UI Pura: Reutilizable, sin lógica de negocio (Icons, Modals).
│   ├── layout/            # Estructura: Elementos fijos (Navbar, Footer, Hero).
│   ├── sections/          # Composición: Bloques de contenido de la Landing Page.
│   ├── domain/            # Negocio: Componentes con lógica específica (Booking, Gallery).
│   └── astro/             # Componentes exclusivos del servidor (.astro).
├── pages/
│   ├── reserva/
│   │   └── [id].astro     # Ruta dinámica única para todas las cabañas.
│   └── ...
├── constants/             # Configuración centralizada de datos.
└── ...
```

---

## 3. Decisiones Técnicas Clave

### A. Rutas Dinámicas vs Estáticas

**Por qué:** Astro es excelente generando páginas estáticas. Al usar `getStaticPaths` en `[id].astro`, mantenemos el rendimiento de una web estática pero con la limpieza de una aplicación dinámica.

### B. Path Aliases (`@/*`)

**Por qué:** Permite reestructurar carpetas internas sin romper los cientos de imports en el proyecto. Es el estándar en proyectos profesionales de React/Next.js/Astro.

### C. Redirecciones Legacy

**Por qué:** Se configuraron redirecciones en `astro.config.mjs` para asegurar que el SEO actual y los links compartidos por clientes (`/reserva-cabana-1`) no se rompan (Error 404), redirigiéndolos transparentemente a la nueva estructura.

---

## 4. Beneficios Inmediatos

1.  **Mantenibilidad:** Si cambias el diseño de la página de reserva, solo editas un archivo, no cuatro.
2.  **Escalabilidad:** Añadir una nueva cabaña ahora solo requiere agregar un objeto al array en `constants/cabanas.ts`.
3.  **Onboarding:** Un nuevo desarrollador entenderá dónde buscar cada cosa en menos de 5 minutos gracias a la nomenclatura de carpetas basada en dominios.

---

**Arquitecto de Software Senior**
_Enero 2026_
