import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Usage: node scripts/updateCabin2Images.js <directory containing the approved JPGs>
const root = fileURLToPath(new URL("../", import.meta.url));
const inputDirectory = process.argv[2];
if (!inputDirectory) throw new Error("An input directory is required.");
const updates = [
  [6, "55 4", "Cocina y comedor"],
  [8, "54 3", "Acceso al baño y lavabo"],
  [12, "52", "Dormitorio con camas individuales"],
  [26, "55 2", "Fachada y jardín"],
  [27, "53 3", "Comedor junto a la cocina"],
  [28, "53 4", "Dormitorio con dos camas individuales"],
  [29, "54 2", "Dormitorio matrimonial"],
  [30, "54 4", "Balcón con vista a las sierras"],
  [31, "54", "Sala de estar y comedor"],
  [32, "55", "Vista desde el balcón"],
  [33, "51 2", "Ventana del comedor con vista al jardín"],
  [34, "52 2", "Sala de estar con techo de madera"],
  [35, "52 3", "Lavabo del baño"],
  [36, "52 4", "Sala de estar junto al balcón"],
  [37, "53 2", "Dormitorio matrimonial con ventana"],
  [38, "53", "Dormitorio de camas individuales"],
  [39, "50", "Sala de estar y acceso a los dormitorios"],
].map(([number, suffix, title]) => ({
  source: `PHOTO-2026-07-10-11-36-${suffix}.jpg`,
  base: `cabana-2-${number}`,
  title,
}));
if (new Set(updates.map((update) => update.source)).size !== 17) {
  throw new Error("Each approved photo must be used exactly once.");
}
const folder = path.join(root, "public/images/cabana-2");
const configPath = path.join(root, "src/constants/reservasConfig.ts");
const dataPath = path.join(root, "src/data/images.ts");
const config = await fs.readFile(configPath, "utf8");
const data = await fs.readFile(dataPath, "utf8");
const configMatch = config.match(/"2": (?:Array\.from\(\{ length: 25 \}, \(_, i\) => `cabana-2-\$\{i \+ 1\}`\)|\[[\s\S]*?\]),/);
const dataMatch = data.match(/(^  \{\r?\n    "id": 2,[\s\S]*?^  \})(,\r?\n  \{\r?\n    "id": 3,)/m);
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
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
  34, 35, 36, 37, 38, 39];
const names = numbers.map((number) => `cabana-2-${number}`);
const titles = new Map(oldCabin.images.map((image) => [image.filename, image.title]));
for (const update of updates) titles.set(update.base, update.title);
const cabin = {
  ...oldCabin,
  totalImages: names.length,
  images: names.map((base, index) => ({
    id: index + 1,
    url: `/images/cabana-2/${base}-desktop.webp`,
    url_desktop: `/images/cabana-2/${base}-desktop.webp`,
    url_mobile: `/images/cabana-2/${base}-mobile.webp`,
    title: titles.get(base),
    filename: base,
  })),
};
const configEol = config.includes("\r\n") ? "\r\n" : "\n";
const nextConfig = config.replace(configMatch[0], `"2": [${configEol}${names.map((name) => `    "${name}",`).join(configEol)}${configEol}  ],`);
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
for (const number of [9, 21]) {
  for (const variant of ["desktop", "mobile"]) {
    await fs.rm(path.join(folder, `cabana-2-${number}-${variant}.webp`), { force: true });
  }
}
await fs.writeFile(configPath, nextConfig);
await fs.writeFile(dataPath, nextData);
console.log(`Cabin 2: ${names.length} images; 3 replacements, 14 additions, 2 removals.`);
