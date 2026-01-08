import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

// CONFIGURACIÓN
const CABINS = [1, 2, 3, 4];
const QUALITY = 75; // Calidad del WebP (0-100)

async function procesarImagenes() {
  try {
    for (const cabinNum of CABINS) {
      const INPUT_FOLDER = `./scripts/cabin-${cabinNum}-raw`;
      const OUTPUT_FOLDER = `./public/images/cabin-${cabinNum}`;

      console.log(`\n📂 Procesando Cabaña ${cabinNum}...`);

      // 1. Aseguramos que existan las carpetas
      await fs.ensureDir(OUTPUT_FOLDER);

      // 2. Leemos los archivos
      if (!(await fs.pathExists(INPUT_FOLDER))) {
        console.warn(
          `⚠️ Warning: La carpeta de entrada ${INPUT_FOLDER} no existe. Saltando...`
        );
        continue;
      }

      const files = await fs.readdir(INPUT_FOLDER);
      const images = files.filter((file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );

      if (images.length === 0) {
        console.log(`⚠️ No se encontraron imágenes en ${INPUT_FOLDER}`);
        continue;
      }

      console.log(`🚀 Iniciando optimización de ${images.length} imágenes...`);

      for (const image of images) {
        const inputPath = path.join(INPUT_FOLDER, image);
        const filename = path.parse(image).name; // Nombre sin extensión

        console.log(`  Processing: ${image}`);

        // --- VERSIÓN DESKTOP (1920px) ---
        await sharp(inputPath)
          .resize(1920, null, {
            withoutEnlargement: true,
          })
          .webp({ quality: QUALITY })
          .toFile(path.join(OUTPUT_FOLDER, `${filename}-desktop.webp`));

        // --- VERSIÓN MOBILE (800px) ---
        await sharp(inputPath)
          .resize(800, null, {
            withoutEnlargement: true,
          })
          .webp({ quality: QUALITY })
          .toFile(path.join(OUTPUT_FOLDER, `${filename}-mobile.webp`));
      }

      console.log(`✅ Cabaña ${cabinNum} completada.`);
    }

    console.log(`\n✨ ¡Proceso finalizado con éxito!`);
  } catch (error) {
    console.error("Error fatal:", error);
  }
}

procesarImagenes();
