import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

type MediaType = 'image' | 'video';

export type GalleryCategoryId = 'cabana1' | 'cabana2' | 'cabana3' | 'cabana4' | 'exterior' | 'pileta';

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  alt: string;
  filename: string;
  category: GalleryCategoryId;
  type: MediaType;
}

export interface GalleryPayload {
  categories: Array<{ id: GalleryCategoryId; label: string; folder: string }>;
  items: GalleryItem[];
}

const IMAGE_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif', '.svg']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm', '.m4v']);

const CATEGORIES: Array<{ id: GalleryCategoryId; label: string; folder: string }> = [
  { id: 'cabana1', label: 'Cabaña 1', folder: 'cabana-1' },
  { id: 'cabana2', label: 'Cabaña 2', folder: 'cabana-2' },
  { id: 'cabana3', label: 'Cabaña 3', folder: 'cabana-3' },
  { id: 'cabana4', label: 'Cabaña 4', folder: 'cabana-4' },
  { id: 'exterior', label: 'Exterior', folder: 'exterior' },
  { id: 'pileta', label: 'Pileta', folder: 'pileta' },
];

const collator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' });

function filenameToTitle(filename: string, folder: string) {
  const base = filename.replace(/\.[^.]+$/, '');
  let clean = base;
  // Quitar prefijos típicos:
  // cabana-1-xxx -> xxx
  // exterior-xxx -> xxx
  // Si no matchea, igual devuelve algo legible.
  clean = clean.replace(new RegExp(`^${folder}-`, 'i'), '');
  clean = clean.replace(/^cabana-\d+-/i, '');
  clean = clean.replace(/^exterior-/i, '');
  clean = clean.replace(/[_-]+/g, ' ').trim();
  if (!clean) return 'Archivo';
  return clean
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function safeReadDir(dirPath: string) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries;
  } catch {
    return [];
  }
}

export const GET: APIRoute = async () => {
  const publicImagesDir = path.join(process.cwd(), 'public', 'images');

  const items: GalleryItem[] = [];

  for (const cat of CATEGORIES) {
    const folderAbs = path.join(publicImagesDir, cat.folder);
    const entries = await safeReadDir(folderAbs);

    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => name !== '.DS_Store')
      .sort((a, b) => collator.compare(a, b));

    let idx = 0;
    for (const filename of files) {
      const ext = path.extname(filename).toLowerCase();
      const isImage = IMAGE_EXTS.has(ext);
      const isVideo = VIDEO_EXTS.has(ext);
      if (!isImage && !isVideo) continue;

      idx += 1;
      const title = filenameToTitle(filename, cat.folder);
      const type: MediaType = isVideo ? 'video' : 'image';
      const src = `/images/${cat.folder}/${filename}`;

      items.push({
        id: `${cat.id}-${idx.toString().padStart(3, '0')}`,
        src,
        title,
        alt: `${title} - ${cat.label} - Mirador de Luz`,
        filename,
        category: cat.id,
        type,
      });
    }
  }

  const payload: GalleryPayload = {
    categories: CATEGORIES,
    items,
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Cache corto en dev; en prod se puede subir si querés.
      'Cache-Control': 'no-store',
    },
  });
};






