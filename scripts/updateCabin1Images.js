import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Usage: node scripts/updateCabin1Images.js <directory containing the approved JPGs>
const root = fileURLToPath(new URL("../", import.meta.url));
const inputDirectory = process.argv[2];
if (!inputDirectory) throw new Error("An input directory is required.");
const updates = [
  ["56", "cocina", "Cocina y comedor"],
  ["55 3", "comedor", "Sala de estar y cocina"],
  ["58 2", "comedor-1", "Dormitorio con vista al jardín"],
  ["56 4", "living-2", "Dormitorio y acceso al baño"],
  ["57 2", "living-3", "Dormitorio con ventana"],
  ["56 3", "baño-1", "Ducha y lavabo"],
  ["57", "entrada", "Exterior y jardín"],
  ["57 4", "bano-ducha-inodoro", "Baño con ducha e inodoro"],
  ["55 5", "bano-lavabo-ducha", "Lavabo y ducha"],
  ["57 5", "exterior-galeria", "Galería exterior y jardín"],
].map(([suffix, name, title]) => ({
  source: `PHOTO-2026-07-10-11-36-${suffix}.jpg`,
  base: `cabana-1-${name}`,
  title,
}));

const folder = path.join(root, "public/images/cabana-1");
const configPath = path.join(root, "src/constants/reservasConfig.ts");
const dataPath = path.join(root, "src/data/images.ts");
const config = await fs.readFile(configPath, "utf8");
const data = await fs.readFile(dataPath, "utf8");
const configMatch = config.match(/("1": \[)([\s\S]*?)(\],)/);
const dataMatch = data.match(/(export const cabanas: Cabana\[\] = \[\s*)(\{[\s\S]*?\n  \})(,\s*\{\s*"id": 2,)/);
if (!configMatch || !dataMatch) throw new Error("Cabin metadata structure was not recognized.");

// Validate and encode every source before touching tracked assets or metadata.
const encoded = [];
for (const update of updates) {
  const input = await fs.readFile(path.join(inputDirectory, update.source));
  const metadata = await sharp(input).metadata();
  if (metadata.format !== "jpeg") throw new Error(`Expected JPEG: ${update.source}`);
  for (const [variant, width] of [["desktop", 1600], ["mobile", 800]]) {
    const buffer = await sharp(input).rotate()
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 50, effort: 6 }).toBuffer();
    encoded.push({ filename: `${update.base}-${variant}.webp`, buffer });
  }
}

const removed = "cabana-1-baño-2";
const names = [...configMatch[2].matchAll(/"([^"]+)"/g)]
  .map((match) => match[1]).filter((name) => name !== removed);
for (const update of updates.slice(7)) if (!names.includes(update.base)) names.push(update.base);
const oldCabin = JSON.parse(dataMatch[2]);
const titles = new Map(oldCabin.images.map((image) => [image.filename, image.title]));
for (const update of updates) titles.set(update.base, update.title);
const cabin = {
  ...oldCabin,
  totalImages: names.length,
  images: [...names].sort().map((base, index) => ({
    id: index + 1,
    url: `/images/cabana-1/${base}-desktop.webp`,
    url_desktop: `/images/cabana-1/${base}-desktop.webp`,
    url_mobile: `/images/cabana-1/${base}-mobile.webp`,
    title: titles.get(base),
    filename: base,
  })),
};
const eol = config.includes("\r\n") ? "\r\n" : "\n";
const nextConfig = config.replace(configMatch[0], `${configMatch[1]}${eol}${names.map((name) => `    "${name}",`).join(eol)}${eol}  ${configMatch[3]}`);
const formattedCabin = JSON.stringify(cabin, null, 2).split("\n").map((line, index) => index ? `  ${line}` : line).join(data.includes("\r\n") ? "\r\n" : "\n");
const nextData = data.replace(dataMatch[0], `${dataMatch[1]}${formattedCabin}${dataMatch[3]}`);
for (const output of encoded) {
  await fs.writeFile(path.join(folder, output.filename), output.buffer);
  console.log(`${output.filename}: ${output.buffer.length} bytes`);
}
for (const variant of ["desktop", "mobile"]) await fs.rm(path.join(folder, `${removed}-${variant}.webp`), { force: true });
await fs.writeFile(configPath, nextConfig);
await fs.writeFile(dataPath, nextData);
console.log(`Cabin 1: ${names.length} images; 7 replacements, 3 additions, 1 removal.`);
