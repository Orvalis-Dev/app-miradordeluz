import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

// CONFIGURACIÓN ULTRA AGRESIVA PARA BAJAR DE 300KB
const FOLDERS = [
  ".",
  "exterior",
  "pileta",
  "gallery",
  "cabana-1",
  "cabana-2",
  "cabana-3",
  "cabana-4",
  "cabins-home",
];
const QUALITY = 50; // Calidad 50 para asegurar pesos bajos en imágenes complejas
const EFFORT = 6;
const MAX_WIDTH_DESKTOP = 1600; // Reducimos ligeramente de 1920 a 1600 para ganar mucha eficiencia en peso

sharp.cache(false);

async function procesarImagenes() {
  try {
    for (const folderName of FOLDERS) {
      const TARGET_FOLDER = `./public/images/${folderName}`;

      console.log(`\n📂 Procesando carpeta: ${folderName}...`);

      if (!(await fs.pathExists(TARGET_FOLDER))) {
        console.warn(
          `⚠️ Warning: La carpeta ${TARGET_FOLDER} no existe. Saltando...`
        );
        continue;
      }

      const files = await fs.readdir(TARGET_FOLDER);
      const images = files.filter((file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );

      let sourcesToUse = images.filter(
        (f) => !f.includes("-desktop") && !f.includes("-mobile")
      );
      if (sourcesToUse.length === 0) {
        sourcesToUse = images.filter((f) => f.includes("-desktop"));
      }

      if (sourcesToUse.length === 0) {
        console.log(`⚠️ No se encontraron fuentes en ${TARGET_FOLDER}`);
        continue;
      }

      console.log(
        `🚀 Re-optimización con Calidad ${QUALITY} y Ancho ${MAX_WIDTH_DESKTOP}px...`
      );

      for (const image of sourcesToUse) {
        const inputPath = path.join(TARGET_FOLDER, image);
        const filename = path.parse(image).name.replace("-desktop", "");

        try {
          const inputBuffer = await fs.readFile(inputPath);

          // Versión Desktop
          const desktopPath = path.join(
            TARGET_FOLDER,
            `${filename}-desktop.webp`
          );
          await sharp(inputBuffer)
            .resize(MAX_WIDTH_DESKTOP, null, {
              withoutEnlargement: true,
              fit: "inside",
            })
            .webp({ quality: QUALITY, effort: EFFORT })
            .toFile(`${desktopPath}.tmp`);

          // Versión Mobile
          const mobilePath = path.join(
            TARGET_FOLDER,
            `${filename}-mobile.webp`
          );
          await sharp(inputBuffer)
            .resize(800, null, { withoutEnlargement: true, fit: "inside" })
            .webp({ quality: QUALITY, effort: EFFORT })
            .toFile(`${mobilePath}.tmp`);

          await fs.move(`${desktopPath}.tmp`, desktopPath, { overwrite: true });
          await fs.move(`${mobilePath}.tmp`, mobilePath, { overwrite: true });

          const stats = await fs.stat(desktopPath);
          const sizeKB = (stats.size / 1024).toFixed(2);
          console.log(`  ✅ ${filename} -> Desktop: ${sizeKB}KB`);
        } catch (err) {
          console.error(`  ❌ Error en ${image}:`, err.message);
        }
      }
    }
    console.log(`\n✨ ¡Optimización finalizada!`);
  } catch (error) {
    console.error("Error fatal:", error);
  }
}

procesarImagenes();
