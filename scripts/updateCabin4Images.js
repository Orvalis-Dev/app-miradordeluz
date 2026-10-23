import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Usage: node scripts/updateCabin4Images.js <directory containing the approved JPGs>
const root = fileURLToPath(new URL("../", import.meta.url));
const inputDirectory = process.argv[2];
if (!inputDirectory) throw new Error("An input directory is required.");
const updates = [
  [4, "37-00 2", "Sala de estar con ventana al jardín"],
  [5, "36-59", "Sala de estar junto al comedor"],
  [7, "36-59 2", "Dormitorio con cama individual"],
  [8, "36-50 3", "Dormitorio matrimonial con ventana"],
  [9, "36-50 2", "Dormitorio con dos camas individuales"],
  [10, "36-51", "Sala de estar con sillón y mesa"],
  [11, "36-59 4", "Sala de estar junto a la ventana"],
  [12, "37-00", "Mesada de la cocina junto a la ventana"],
  [13, "36-58", "Cama individual y estantes de madera"],
  [14, "36-59 3", "Baño y lavabo"],
  [15, "36-51 5", "Comedor junto a la cocina"],
  [16, "36-50 4", "Acceso al baño y lavabo"],
].map(([number, suffix, title]) => ({
  source: `PHOTO-2026-07-10-11-${suffix}.jpg`,
  base: `cabana-4-${number}`,
  title,
}));
if (new Set(updates.map((update) => update.source)).size !== 12) {
  throw new Error("Each approved photo must be used exactly once.");
}
const folder = path.join(root, "public/images/cabana-4");
const configPath = path.join(root, "src/constants/reservasConfig.ts");
const dataPath = path.join(root, "src/data/images.ts");
const config = await fs.readFile(configPath, "utf8");
const data = await fs.readFile(dataPath, "utf8");
const configMatch = config.match(/"4": (?:Array\.from\(\{ length: 10 \}, \(_, i\) => `cabana-4-\$\{i \+ 1\}`\)|\[[\s\S]*?\]),/);
const dataMatch = data.match(/(^  \{\r?\n    "id": 4,[\s\S]*?^  \})(\r?\n\];)/m);
if (!configMatch || !dataMatch) throw new Error("Cabin metadata structure was not recognized.");
const oldCabin = JSON.parse(dataMatch[1]);

// Decode and encode every approved input before writing any asset or metadata.
const encoded = [];
for (const update of updates) {
  const input = await fs.readFile(path.join(inputDirectory, update.source));
  if ((await sharp(input).metadata()).format !== "jpeg") {
    throw new Error(`Expected JPEG: ${update.source}`);
  }
  for (const [variant, width] of [["desktop", 1600], ["mobile", 800]]) {
    const buffer = await sharp(input).rotate()
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 50, effort: 6 }).toBuffer();
    encoded.push({ filename: `${update.base}-${variant}.webp`, buffer });
  }
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const names = numbers.map((number) => `cabana-4-${number}`);
const titles = new Map(oldCabin.images.map((image) => [image.filename, image.title]));
for (const update of updates) titles.set(update.base, update.title);
const cabin = {
  ...oldCabin,
  totalImages: names.length,
  images: names.map((base, index) => ({
    id: index + 1,
    url: `/images/cabana-4/${base}-desktop.webp`,
    url_desktop: `/images/cabana-4/${base}-desktop.webp`,
    url_mobile: `/images/cabana-4/${base}-mobile.webp`,
    title: titles.get(base),
    filename: base,
  })),
};
const configEol = config.includes("\r\n") ? "\r\n" : "\n";
const nextConfig = config.replace(configMatch[0], `"4": [${configEol}${names.map((name) => `    "${name}",`).join(configEol)}${configEol}  ],`);
const dataEol = data.includes("\r\n") ? "\r\n" : "\n";
const formattedCabin = JSON.stringify(cabin, null, 2).split("\n")
  .map((line) => `  ${line}`).join(dataEol);
const nextData = data.replace(dataMatch[0], `${formattedCabin}${dataMatch[2]}`);
for (const output of encoded) {
  const outputPath = path.join(folder, output.filename);
  const previous = await fs.readFile(outputPath).catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  // Avoid rewriting identical images, including files held by the dev server.
  if (!previous?.equals(output.buffer)) await fs.writeFile(outputPath, output.buffer);
  console.log(`${output.filename}: ${output.buffer.length} bytes`);
}
await fs.writeFile(configPath, nextConfig);
await fs.writeFile(dataPath, nextData);
console.log(`Cabin 4: ${names.length} images; 6 replacements, 6 additions, 0 removals.`);
