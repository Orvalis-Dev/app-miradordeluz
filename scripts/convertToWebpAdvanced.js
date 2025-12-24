import { execSync } from 'child_process';
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
 * Convierte una imagen a WebP usando ImageMagick
 * @param {string} inputPath - Ruta de entrada
 * @param {string} outputPath - Ruta de salida
 */
function convertWithImageMagick(inputPath, outputPath) {
  try {
    // Usar convert de ImageMagick
    execSync(`convert "${inputPath}" -quality 80 "${outputPath}"`);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Convierte una imagen a WebP usando ffmpeg
 * @param {string} inputPath - Ruta de entrada
 * @param {string} outputPath - Ruta de salida
 */
function convertWithFfmpeg(inputPath, outputPath) {
  try {
    execSync(`ffmpeg -i "${inputPath}" -c:v libwebp -quality 80 -y "${outputPath}" 2>/dev/null`);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Detecta qué herramienta está disponible
 */
function detectAvailableTool() {
  try {
    execSync('which convert', { stdio: 'ignore' });
    return 'imagemagick';
  } catch {
    try {
      execSync('which ffmpeg', { stdio: 'ignore' });
      return 'ffmpeg';
    } catch {
      return null;
    }
  }
}

/**
 * Procesa todos los directorios de imágenes
 */
async function processAllImages() {
  const tool = detectAvailableTool();

  if (!tool) {
    console.error('❌ No se encontró ImageMagick ni ffmpeg');
    console.error('   Instala uno de estos:');
    console.error('   - ImageMagick: brew install imagemagick');
    console.error('   - ffmpeg: brew install ffmpeg');
    process.exit(1);
  }

  console.log(`🛠️  Usando: ${tool === 'imagemagick' ? 'ImageMagick' : 'FFmpeg'}\n`);

  const convert = tool === 'imagemagick' ? convertWithImageMagick : convertWithFfmpeg;
  
  let totalConverted = 0;
  let totalFailed = 0;

  for (const dir of imageDirs) {
    const dirPath = path.join(basePath, dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directorio no encontrado: ${dirPath}`);
      continue;
    }

    console.log(`\n📂 Procesando: ${dir}`);
    const files = fs.readdirSync(dirPath).sort();

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

        const success = convert(inputPath, outputPath);
        
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





