#!/bin/bash

# Batch image optimization script
# Usage: ./scripts/batch-optimize-images.sh [quality]
# Example: ./scripts/batch-optimize-images.sh 85

set -e

# Default quality
DEFAULT_QUALITY=90
QUALITY="${1:-$DEFAULT_QUALITY}"

# Check if optimize-image.sh exists
OPTIMIZE_SCRIPT="scripts/optimize-image.sh"
if [ ! -f "$OPTIMIZE_SCRIPT" ]; then
    echo "❌ Error: $OPTIMIZE_SCRIPT not found"
    exit 1
fi

# Make sure the optimize script is executable
chmod +x "$OPTIMIZE_SCRIPT"

echo "🚀 Batch Image Optimization"
echo "   Quality: $QUALITY"
echo "   Output: public/FOR_PRODUCTION/"
echo ""

# Find all image files in public directory (excluding FOR_PRODUCTION)
IMAGE_EXTENSIONS="jpg jpeg png webp tiff tif bmp"
TOTAL_COUNT=0
PROCESSED_COUNT=0
SKIPPED_COUNT=0

echo "🔍 Scanning for images..."

# Use a simpler approach to find and count images
TEMP_FILE_LIST=$(mktemp)
find public -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.tiff" -o -iname "*.tif" -o -iname "*.bmp" \) ! -path "*/FOR_PRODUCTION/*" > "$TEMP_FILE_LIST"

TOTAL_COUNT=$(wc -l < "$TEMP_FILE_LIST" | tr -d ' ')

if [ "$TOTAL_COUNT" -eq 0 ]; then
    echo "📂 No images found in public directory"
    rm "$TEMP_FILE_LIST"
    exit 0
fi

echo "📊 Found $TOTAL_COUNT images to process"
echo ""

# Process each image from the temp file list
while IFS= read -r file; do
    if [ -f "$file" ]; then
        PROCESSED_COUNT=$((PROCESSED_COUNT + 1))
        FILENAME=$(basename "$file")
        BASENAME_NO_EXT=$(basename "$file" | sed 's/\.[^.]*$//')
        
        echo "[$PROCESSED_COUNT/$TOTAL_COUNT] Processing: $FILENAME"
        
        # Check if output files already exist
        WEBP_EXISTS=false
        JPEG_EXISTS=false
        AVIF_EXISTS=false
        
        if [ -f "public/FOR_PRODUCTION/${BASENAME_NO_EXT}.webp" ]; then
            WEBP_EXISTS=true
        fi
        if [ -f "public/FOR_PRODUCTION/${BASENAME_NO_EXT}.jpg" ]; then
            JPEG_EXISTS=true
        fi
        if [ -f "public/FOR_PRODUCTION/${BASENAME_NO_EXT}.avif" ]; then
            AVIF_EXISTS=true
        fi
        
        # Skip if all formats already exist
        if [ "$WEBP_EXISTS" = true ] && [ "$JPEG_EXISTS" = true ] && [ "$AVIF_EXISTS" = true ]; then
            echo "   ⏭️  Skipping (already optimized - all formats exist)"
            SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
            echo ""
            continue
        fi
        
        # Get relative path for the optimize script (remove public/ prefix)
        RELATIVE_PATH=${file#public/}
        
        # Run optimization with the full relative path
        if ./"$OPTIMIZE_SCRIPT" "$RELATIVE_PATH" "" "$QUALITY"; then
            echo "   ✅ Completed"
        else
            echo "   ❌ Failed"
        fi
        
        echo ""
    fi
done < "$TEMP_FILE_LIST"

# Clean up temp file
rm "$TEMP_FILE_LIST"

echo "🎉 Batch optimization complete!"
echo "   Total images: $TOTAL_COUNT"
echo "   Processed: $((PROCESSED_COUNT - SKIPPED_COUNT))"
echo "   Skipped: $SKIPPED_COUNT"
echo "   📁 Output: public/FOR_PRODUCTION/"
echo ""
echo "   💡 Tip: Use different quality settings for different image types:"
echo "      Photos: ./scripts/batch-optimize-images.sh 85"
echo "      Graphics: ./scripts/batch-optimize-images.sh 95"
