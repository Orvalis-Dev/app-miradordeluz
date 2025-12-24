import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '../public/images');

// Directorio que contienen imágenes
const imageDirs = ['cabana-1', 'cabana-2', 'cabana-3', 'exterior', 'pileta'];

// Extensiones de imagen soportadas
const supportedExtensions = ['.heic', '.jpg', '.jpeg', '.png', '.gif'];

/**
 * Convierte imágenes a formato WebP
 * @param {string} inputPath - Ruta de la imagen de entrada
 * @param {string} outputPath - Ruta de salida del WebP
 */
async function convertImageToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Error convertendo ${inputPath}:`, error.message);
    return false;
  }
}

/**
 * Procesa todos los directorios de imágenes
 */
async function processAllImages() {
  let totalConverted = 0;
  let totalFailed = 0;

  for (const dir of imageDirs) {
    const dirPath = path.join(basePath, dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directorio no encontrado: ${dirPath}`);
      continue;
    }

    console.log(`\n📂 Procesando: ${dir}`);
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      
      // Solo procesar archivos de imagen soportados (excepto WebP)
      if (supportedExtensions.includes(ext)) {
        const inputPath = path.join(dirPath, file);
        const fileName = path.basename(file, ext);
        const outputPath = path.join(dirPath, `${fileName}.webp`);

        // No sobrescribir si ya existe
        if (fs.existsSync(outputPath)) {
          console.log(`⏭️  Saltando (ya existe): ${fileName}.webp`);
          continue;
        }

        const success = await convertImageToWebp(inputPath, outputPath);
        
        if (success) {
          console.log(`✅ Convertido: ${fileName}.webp`);
          totalConverted++;
        } else {
          console.log(`❌ Error: ${file}`);
          totalFailed++;
        }
      }
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✨ Conversión completada`);
  console.log(`✅ Convertidas: ${totalConverted}`);
  console.log(`❌ Errores: ${totalFailed}`);
  console.log(`${'='.repeat(50)}`);
}

// Ejecutar
processAllImages().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});





