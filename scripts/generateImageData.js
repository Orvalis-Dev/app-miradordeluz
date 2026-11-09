import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, "../public/images");
const outputPath = path.join(__dirname, "../src/data/images.ts");

function filenameToPrettyTitle(filename) {
  let name = filename.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  name = name.replace(/-(desktop|mobile)$/i, "");
  name = name.replace(/^cabana-\d+-/, "");
  name = name.replace(/^exterior-/, "");
  name = name.replace(/^pileta-/, "");
  name = name.replace(/^imagen-/, "");
  name = name.replace(/-/g, " ");
  return (
    name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Imagen"
  );
}

function extractCabanaNumber(folderName) {
  const match = folderName.match(/cabana-(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function generateTypeScriptFile(allData) {
  const cabanasArray = Object.values(allData)
    .filter((d) => typeof d.id === "number")
    .sort((a, b) => a.id - b.id);
  const extraData = Object.values(allData).filter(
    (d) => typeof d.id !== "number"
  );

  let content =
    "// AUTO-GENERADO por scripts/generateImageData.js\n// No editar manualmente\n\nexport interface GalleryImage {\n  id: number;\n  url: string; // Desktop fallback\n  url_desktop: string;\n  url_mobile: string;\n  title: string;\n  filename: string;\n}\n\nexport interface Cabana {\n  id: number | string;\n  nombre: string;\n  totalImages: number;\n  images: GalleryImage[];\n}\n\nexport const cabanas: Cabana[] = " +
    JSON.stringify(cabanasArray, null, 2) +
    ";\n";

  extraData.forEach((data) => {
    const varName = data.id + "Images";
    content +=
      "\nexport const " +
      varName +
      ": Cabana = " +
      JSON.stringify(data, null, 2) +
      ";\n";
  });

  content += `\nexport function getCabanaById(id: number | string): Cabana | undefined {\n  if (id === 'exterior') return (typeof exteriorImages !== 'undefined') ? (exteriorImages as any) : undefined;\n  return cabanas.find(c => c.id === id || c.id === Number(id));\n}`;

  return content;
}

async function generateImageData() {
  console.log(" Iniciando escaneo de imágenes...");
  const allData = {};
  const TARGET_DIRS = [
    "exterior",
    "pileta",
    "gallery",
    "cabana-1",
    "cabana-2",
    "cabana-3",
    "cabana-4",
  ];

  for (const dir of TARGET_DIRS) {
    const dirPath = path.join(basePath, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs
      .readdirSync(dirPath)
      .filter((file) => /\.webp$/i.test(file));
    const groups = {};

    files.forEach((file) => {
      const isDesktop = file.includes("-desktop");
      const isMobile = file.includes("-mobile");
      if (!isDesktop && !isMobile) return;

      const baseName = file.replace(/-(desktop|mobile)\.webp$/i, "");
      if (!groups[baseName]) groups[baseName] = {};
      if (isDesktop) groups[baseName].desktop = file;
      if (isMobile) groups[baseName].mobile = file;
    });

    const images = Object.keys(groups).map((baseName, index) => {
      const group = groups[baseName];
      return {
        id: index + 1,
        url: "/images/" + dir + "/" + (group.desktop || group.mobile),
        url_desktop: "/images/" + dir + "/" + (group.desktop || group.mobile),
        url_mobile: "/images/" + dir + "/" + (group.mobile || group.desktop),
        title: filenameToPrettyTitle(baseName),
        filename: baseName,
      };
    });

    const cabanaNum = extractCabanaNumber(dir);
    allData[dir] = {
      id: cabanaNum || dir,
      nombre: cabanaNum
        ? "Cabaña " + cabanaNum
        : dir.charAt(0).toUpperCase() + dir.slice(1),
      totalImages: images.length,
      images: images,
    };
    console.log(" " + dir + ": " + images.length + " imágenes");
  }

  const code = generateTypeScriptFile(allData);
  fs.writeFileSync(outputPath, code);
  console.log(" src/data/images.ts actualizado");
}

generateImageData();
