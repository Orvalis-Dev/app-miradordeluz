import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '../public/images');
const imageDirs = ['cabana-1', 'cabana-2', 'cabana-3', 'cabana-4', 'exterior', 'pileta'];

/**
 * Renombra las imágenes con el nombre de la carpeta
 */
function renameImagesInDirectory(dirPath, dirName) {
  try {
    const files = fs.readdirSync(dirPath);
    
    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.webp', '.heic', '.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });

    console.log(`\n📂 Procesando: ${dirName} (${imageFiles.length} imágenes)`);

    let counter = 1;

    imageFiles.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const ext = path.extname(file).toLowerCase();
      
      // Nuevo nombre: carpeta-numero.extension
      const newName = `${dirName}-${counter}${ext}`;
      const newPath = path.join(dirPath, newName);

      // No renombrar si ya tiene el nombre correcto
      if (file === newName) {
        console.log(`⏭️  Ya tiene nombre correcto: ${newName}`);
        counter++;
        return;
      }

      try {
        fs.renameSync(filePath, newPath);
        console.log(`✅ Renombrado: ${file} → ${newName}`);
        counter++;
      } catch (error) {
        console.error(`❌ Error al renombrar ${file}: ${error.message}`);
      }
    });
  } catch (error) {
    console.error(`❌ Error procesando ${dirName}: ${error.message}`);
  }
}

/**
 * Procesa todos los directorios
 */
function processAllDirectories() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     RENOMBRADO DE IMÁGENES             ║');
  console.log('╚════════════════════════════════════════╝\n');

  let totalRenamed = 0;
  let totalSkipped = 0;

  for (const dir of imageDirs) {
    const dirPath = path.join(basePath, dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directorio no encontrado: ${dirPath}`);
      continue;
    }

    renameImagesInDirectory(dirPath, dir);
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✨ Renombrado completado`);
  console.log(`${'='.repeat(50)}`);
}

// Ejecutar
try {
  processAllDirectories();
} catch (error) {
  console.error('❌ Error fatal:', error.message);
  process.exit(1);
}

