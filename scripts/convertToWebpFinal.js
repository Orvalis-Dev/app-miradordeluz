import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '../public/images');
const imageDirs = ['cabana-1', 'cabana-2', 'cabana-3', 'exterior', 'pileta'];
const supportedExtensions = ['.heic', '.jpg', '.jpeg', '.png', '.gif'];

/**
 * Convierte una imagen a WebP usando ImageMagick
 */
function convertImageToWebp(inputPath, outputPath) {
  try {
    const result = spawnSync('convert', [
      inputPath,
      '-quality', '80',
      '-strip',
      outputPath
    ], {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000
    });

    // Verificar si el archivo se creó y tiene contenido
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
      return { success: true, error: null };
    } else {
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      return { 
        success: false, 
        error: result.stderr || 'Archivo vacío o no se creó' 
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Procesa todos los directorios de imágenes
 */
async function processAllImages() {
  // Detectar si ImageMagick está disponible
  try {
    execSync('which convert', { stdio: 'ignore' });
  } catch {
    console.error('❌ ImageMagick no está instalado');
    console.error('   Instala con: brew install imagemagick');
    process.exit(1);
  }

  console.log('🛠️  Usando: ImageMagick (convert)\n');

  let totalConverted = 0;
  let totalFailed = 0;
  let totalSkipped = 0;

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
      
      if (!supportedExtensions.includes(ext)) {
        continue;
      }

      const inputPath = path.join(dirPath, file);
      const fileName = path.basename(file, ext);
      const outputPath = path.join(dirPath, `${fileName}.webp`);

      // No sobrescribir si ya existe y tiene contenido
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        if (stats.size > 0) {
          console.log(`⏭️  Ya existe: ${fileName}.webp (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          totalSkipped++;
          continue;
        } else {
          // Si existe pero está vacío, eliminarlo
          fs.unlinkSync(outputPath);
        }
      }

      const result = convertImageToWebp(inputPath, outputPath);
      
      if (result.success) {
        const stats = fs.statSync(outputPath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`✅ Convertido: ${fileName}.webp (${sizeMB} MB)`);
        totalConverted++;
      } else {
        console.log(`❌ Error: ${file}`);
        if (result.error) {
          console.log(`   Detalles: ${result.error.substring(0, 100)}`);
        }
        totalFailed++;
      }
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✨ Conversión completada`);
  console.log(`✅ Convertidas: ${totalConverted}`);
  console.log(`⏭️  Saltadas: ${totalSkipped}`);
  console.log(`❌ Errores: ${totalFailed}`);
  console.log(`${'='.repeat(60)}`);

  if (totalFailed > 0) {
    process.exit(1);
  }
}

// Ejecutar
processAllImages().catch(error => {
  console.error('❌ Error fatal:', error.message);
  process.exit(1);
});





