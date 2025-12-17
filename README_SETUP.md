# Setup del Frontend - Astro + React + Tailwind

## ✅ Instalación Completada

El proyecto frontend ya está completamente configurado con:

- ✅ Astro 4.x instalado
- ✅ React 18+ integrado
- ✅ Tailwind CSS 4.x configurado
- ✅ TypeScript configurado (strict mode)
- ✅ Estructura de directorios creada
- ✅ Utilidades y helpers creados
- ✅ Layout base y componentes iniciales
- ✅ Página de inicio (index.astro)

## Verificar Instalación

### 1. Iniciar Servidor de Desarrollo

```bash
cd "/Users/santiagonievaglembocki/Desktop/Proyecto/Mirador de Luz/app-miradordeluz"

npm run dev
```

El servidor debería iniciar en: http://localhost:4321

### 2. Verificar que Funciona

Abre http://localhost:4321 en tu navegador. Deberías ver:

- Header con navegación
- Hero section con título "Mirador de Luz"
- Sección de cabañas (placeholder)
- Sección de características
- Footer

## Estructura Creada

```
app-miradordeluz/
├── src/
│   ├── components/
│   │   ├── astro/              ✅ Componentes estáticos
│   │   │   ├── Header.astro    ✅ Creado
│   │   │   └── Footer.astro    ✅ Creado
│   │   └── react/              ✅ Para componentes interactivos
│   ├── layouts/
│   │   └── Layout.astro        ✅ Layout base creado
│   ├── pages/
│   │   ├── index.astro         ✅ Landing page creada
│   │   ├── cabanas/            ✅ Para páginas de detalle
│   │   └── reservas/           ✅ Para confirmaciones
│   ├── utils/
│   │   ├── api.ts              ✅ Helper para API calls
│   │   ├── types.ts            ✅ TypeScript interfaces
│   │   └── formatters.ts       ✅ Formateo de datos
│   ├── constants/
│   │   └── config.ts           ✅ Configuración del sitio
│   ├── styles/
│   │   └── global.css          ✅ Estilos globales (Tailwind)
│   └── env.d.ts                ✅ Types de variables entorno
├── public/
│   └── images/                 ✅ Para assets estáticos
├── .env                        ✅ Variables de entorno
├── .env.example                ✅ Ejemplo de variables
├── .env.production             ✅ Variables de producción
├── astro.config.mjs            ✅ Configuración de Astro
├── tsconfig.json               ✅ Configuración TypeScript
└── package.json                ✅ Dependencias instaladas
```

## Configuración Actual

### Variables de Entorno (`.env`)

```env
PUBLIC_API_URL=http://localhost:8000
```

Cambia esto cuando tengas la API Laravel corriendo.

### Astro Config

Ya configurado con:

- Output: static (SSG)
- Prefetch: hover strategy
- React integration
- Tailwind CSS via Vite plugin

## Próximos Pasos

### 1. Crear Componentes React Interactivos

Cuando necesites componentes con estado (calendario, formularios):

```bash
# Crear nuevo componente React
touch src/components/react/CalendarioDisponibilidad.tsx
```

Ejemplo de estructura:

```typescript
import { useState } from "react";
import type { FC } from "react";

interface Props {
  cabanaId: number;
}

const CalendarioDisponibilidad: FC<Props> = ({ cabanaId }) => {
  const [fechaInicio, setFechaInicio] = useState("");

  return <div className="p-4">{/* Tu componente */}</div>;
};

export default CalendarioDisponibilidad;
```

### 2. Usar en Páginas Astro

```astro
---
import CalendarioDisponibilidad from '../components/react/CalendarioDisponibilidad';
---

<CalendarioDisponibilidad
  cabanaId={1}
  client:visible
/>
```

### 3. Conectar con API Laravel

Cuando el backend esté listo, usa el helper `fetchApi`:

```typescript
import { fetchApi } from "../utils/api";
import type { Cabana } from "../utils/types";

// En componente Astro (build time)
const { data: cabanas } = await fetchApi<Cabana[]>("/api/cabanas");

// En componente React (runtime)
useEffect(() => {
  const fetchData = async () => {
    const response = await fetchApi<Cabana[]>("/api/cabanas");
    setCabanas(response.data);
  };
  fetchData();
}, []);
```

## Comandos Disponibles

```bash
# Desarrollo
npm run dev                 # Servidor de desarrollo (puerto 4321)

# Build
npm run build              # Construir para producción

# Preview
npm run preview            # Previsualizar build de producción

# Astro CLI
npx astro add react        # Agregar integración
npx astro check            # Verificar TypeScript
npx astro telemetry disable # Deshabilitar telemetría
```

## Tips de Desarrollo

### Hot Module Replacement (HMR)

Los cambios se reflejan automáticamente:

- Componentes Astro: Refresh completo
- Componentes React: HMR (sin perder estado)
- Estilos Tailwind: Instantáneo

### TypeScript

El proyecto usa `strict` mode. Todos los componentes React deben:

- Definir interfaces para Props
- Tipar estados y funciones
- Evitar `any`

### Tailwind CSS

Clases utilitarias ya disponibles:

- Mobile-first: `class="p-4 md:p-6 lg:p-8"`
- Colors: `bg-blue-600`, `text-gray-900`
- Layout: `container mx-auto`, `flex`, `grid`

### Debugging

```typescript
// En componentes Astro (servidor/build)
console.log("Build time:", data); // Aparece en terminal

// En componentes React (cliente)
console.log("Runtime:", data); // Aparece en DevTools
```

## Verificación de Funcionamiento

### Checklist

- [ ] `npm run dev` inicia sin errores
- [ ] Navegador abre en http://localhost:4321
- [ ] Se ve el header "Mirador de Luz"
- [ ] Hero section con fondo gris (placeholder)
- [ ] Sección "Nuestras Cabañas" visible
- [ ] Footer con links y contacto
- [ ] No hay errores en la consola

### Si hay Problemas

#### Puerto 4321 ocupado

```bash
npm run dev -- --port 3000
```

#### Error de TypeScript

```bash
npx astro check
# Corregir errores mostrados
```

#### Error con Tailwind

```bash
# Verificar que global.css existe
cat src/styles/global.css

# Debería contener:
# @import "tailwindcss";
```

## Integración con Backend

Cuando Laravel esté corriendo:

1. Verifica que el backend responda:

```bash
curl http://localhost:8000/api/health
```

2. Actualiza `.env` si es necesario:

```env
PUBLIC_API_URL=http://localhost:8000
```

3. Prueba la conexión desde el frontend:

```typescript
// En navegador console (DevTools)
fetch("http://localhost:8000/api/health")
  .then((r) => r.json())
  .then(console.log);
```

## SEO y Optimización para Buscadores

Antes de cada deploy a producción, revisa el checklist completo de SEO:

📋 **[SEO_CHECKLIST.md](./SEO_CHECKLIST.md)**

Este documento incluye:

- Metadatos globales y por página
- Datos estructurados (JSON-LD, LodgingBusiness, BreadcrumbList, FAQ)
- Consistencia de datos locales (NAP)
- Optimización de imágenes y performance
- Accesibilidad web
- Core Web Vitals (LCP, FID, CLS)
- Medición y monitoreo en Google Search Console

**Recomendación**: Ejecutar `npm run build` y luego `npx lighthouse` en la URL de preview antes de producción.

## Recursos

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Google Search Central](https://developers.google.com/search)
- [Web.dev Performance](https://web.dev/performance)

## Ayuda

Si encuentras problemas, consulta:

1. `ESPECIFICACIONES.md` - Documentación detallada
2. `../GUIA_DESARROLLO.md` - Guía de desarrollo completa
3. `../.cursorrules/frontend-astro.mdrules` - Reglas del proyecto
4. `SEO_CHECKLIST.md` - Checklist de SEO y optimización
