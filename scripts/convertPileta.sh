#!/bin/bash

# Script para convertir videos de pileta HEIC a WebP y MOV a MP4

PILETA_DIR="./public/images/pileta"

echo "🎬 PROCESANDO CARPETA PILETA"
echo "===================================="
echo ""

# Convertir MOV a MP4
if [ -f "$PILETA_DIR/IMG_3713.MOV" ]; then
    echo "📹 Convirtiendo MOV a MP4..."
    ffmpeg -i "$PILETA_DIR/IMG_3713.MOV" \
        -c:v libx264 \
        -crf 23 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        "$PILETA_DIR/IMG_3713.mp4" \
        -y 2>&1 | grep -E "frame|Bitrate|Speed" | tail -3
    
    echo "✅ Video convertido: IMG_3713.mp4"
    echo ""
    
    # Extraer thumbnail
    echo "🖼️  Extrayendo thumbnail del video..."
    ffmpeg -i "$PILETA_DIR/IMG_3713.MOV" \
        -ss 00:00:05 \
        -vframes 1 \
        -vf "scale=600:-1" \
        -q:v 8 \
        "$PILETA_DIR/IMG_3713-thumbnail.webp" \
        -y 2>&1 | grep -E "error|frame|written"
    
    echo "✅ Thumbnail extraído: IMG_3713-thumbnail.webp"
    echo ""
fi

# Listar archivos finales
echo "📊 RESULTADO FINAL"
echo "===================================="
ls -lh "$PILETA_DIR" | grep -E "webp|mp4|MOV" | wc -l
echo "archivos de imagen/video en pileta"
echo ""
echo "✨ ¡Procesamiento completado!"





