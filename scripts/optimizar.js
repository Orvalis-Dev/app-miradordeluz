import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

// CONFIGURACIÓN
const INPUT_FOLDER = "./scripts/imagenes-raw-galeria";
const OUTPUT_FOLDER = "./public/images/gallery";
const QUALITY = 80; // Calidad del WebP (0-100)

async function procesarImagenes() {
  try {
    // 1. Aseguramos que existan las carpetas
    await fs.ensureDir(OUTPUT_FOLDER);

    // 2. Leemos los archivos
    if (!(await fs.pathExists(INPUT_FOLDER))) {
      console.error(`Error: La carpeta de entrada ${INPUT_FOLDER} no existe.`);
      return;
    }

    const files = await fs.readdir(INPUT_FOLDER);
    const images = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    if (images.length === 0) {
      console.log(`⚠️ No se encontraron imágenes en ${INPUT_FOLDER}`);
      return;
    }

    console.log(`🚀 Iniciando optimización de ${images.length} imágenes...`);

    for (const image of images) {
      const inputPath = path.join(INPUT_FOLDER, image);
      const filename = path.parse(image).name; // Nombre sin extensión

      console.log(`Processing: ${image}`);

      // --- VERSIÓN DESKTOP (1920px) ---
      await sharp(inputPath)
        .resize(1920, null, {
          // null en altura mantiene el aspect ratio
          withoutEnlargement: true, // No estira si la imagen es pequeña
        })
        .webp({ quality: QUALITY })
        .toFile(path.join(OUTPUT_FOLDER, `${filename}-desktop.webp`));

      // --- VERSIÓN MOBILE (800px) ---
      // Aquí podemos hacerlas más cuadradas si quisieras, o mantener ratio
      await sharp(inputPath)
        .resize(800, null, {
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY })
        .toFile(path.join(OUTPUT_FOLDER, `${filename}-mobile.webp`));
    }

    console.log(
      `✅ ¡Listo! Imágenes optimizadas y guardadas en ${OUTPUT_FOLDER}`
    );
  } catch (error) {
    console.error("Error fatal:", error);
  }
}

procesarImagenes();
