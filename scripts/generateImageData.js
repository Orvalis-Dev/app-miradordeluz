import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '../public/images');
const outputPath = path.join(__dirname, '../src/data/images.ts');

/**
 * Convierte nombres de archivos a títulos legibles
 * Ejemplo: cabana-1-portada.webp → Portada
 */
function filenameToPrettyTitle(filename) {
  // Quitar extensión
  let name = filename.replace(/\.webp$/i, '');
  
  // Quitar prefijo de cabaña (cabana-X-)
  name = name.replace(/^cabana-\d+-/, '');
  name = name.replace(/^exterior-/, '');
  
  // Reemplazar guiones con espacios
  name = name.replace(/-/g, ' ');
  
  // Capitalizar primera letra de cada palabra
  name = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return name;
}

/**
 * Extrae el número de cabaña del nombre de la carpeta
 */
function extractCabanaNumber(folderName) {
  const match = folderName.match(/cabana-(\d+)/);
  return match ? parseInt(match[1]) : null;
}

/**
 * Genera datos de imágenes desde los archivos reales
 */
function generateImageData() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║   GENERANDO DATOS DE IMÁGENES AUTOMÁTICAMENTE       ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  const cabanasData = {};

  try {
    const directories = fs.readdirSync(basePath);

    directories.forEach((dir) => {
      const dirPath = path.join(basePath, dir);
      const stats = fs.statSync(dirPath);

      if (!stats.isDirectory()) return;

      const cabanaNum = extractCabanaNumber(dir);
      if (!cabanaNum && dir !== 'exterior') return;

      console.log(`📂 Leyendo: ${dir}`);

      const files = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.webp'))
        .sort();

      const images = files.map((file, index) => ({
        id: index + 1,
        url: `/images/${dir}/${file}`,
        title: filenameToPrettyTitle(file),
        filename: file
      }));

      cabanasData[dir] = {
        id: cabanaNum || 'exterior',
        nombre: cabanaNum ? `Cabaña ${cabanaNum}` : 'Exterior',
        totalImages: images.length,
        images: images
      };

      console.log(`   ✅ ${images.length} imágenes encontradas\n`);
    });

    // Generar archivo TypeScript
    const typeScriptCode = generateTypeScriptFile(cabanasData);
    fs.writeFileSync(outputPath, typeScriptCode);

    console.log(`✅ Archivo generado: ${outputPath}\n`);
    console.log('📊 Resumen:');
    Object.entries(cabanasData).forEach(([dir, data]) => {
      console.log(`   ${data.nombre}: ${data.totalImages} imágenes`);
    });

    console.log('\n═══════════════════════════════════════════════════');
    console.log('✨ Datos generados correctamente');
    console.log('═══════════════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Genera el código TypeScript
 */
function generateTypeScriptFile(cabanasData) {
  const cabanasArray = Object.values(cabanasData);

  let code = `// AUTO-GENERADO por scripts/generateImageData.js
// No editar manualmente

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  filename: string;
}

export interface Cabana {
  id: number | string;
  nombre: string;
  totalImages: number;
  images: GalleryImage[];
}

export const cabanas: Cabana[] = ${JSON.stringify(cabanasArray, null, 2)};

// Helpers útiles

export function getCabanaById(id: number | string): Cabana | undefined {
  return cabanas.find(c => c.id === id);
}

export function getImageUrl(cabanaid: number | string, imageId: number): string | undefined {
  const cabana = getCabanaById(cabanaid);
  const image = cabana?.images.find(img => img.id === imageId);
  return image?.url;
}

export function getAllCabanaImages(cabanaid: number | string): GalleryImage[] {
  return getCabanaById(cabanaid)?.images || [];
}

export function getCabanaStats() {
  return {
    totalCabanas: cabanas.length,
    totalImages: cabanas.reduce((sum, c) => sum + c.totalImages, 0),
    byCategory: cabanas.map(c => ({
      nombre: c.nombre,
      cantidad: c.totalImages
    }))
  };
}
`;

  return code;
}

// Ejecutar
generateImageData().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});





