#!/bin/bash

# Image optimization script
# Usage: ./scripts/optimize-image.sh input.jpg [width] [quality]
# Example: ./scripts/optimize-image.sh image.jpg 800 85

set -e

# Default values
DEFAULT_WIDTH=""  # Empty = keep original dimensions
DEFAULT_QUALITY=90  # Good quality for web (0-100)

# Get arguments
INPUT_FILE="$1"
WIDTH="${2:-$DEFAULT_WIDTH}"
QUALITY="${3:-$DEFAULT_QUALITY}"

# Auto-prepend public/ if path doesn't already start with public/
if [[ "$INPUT_FILE" != public/* ]] && [[ "$INPUT_FILE" != /* ]]; then
    INPUT_FILE="public/$INPUT_FILE"
fi

# Check if input file is provided
if [ -z "$INPUT_FILE" ]; then
    echo "Usage: $0 input.jpg [width] [quality]"
    echo ""
    echo "Examples:"
    echo "  $0 image.jpg                   # From public/, original dimensions, quality 85"
    echo "  $0 image.jpg 800               # 800px width, quality 85"
    echo "  $0 image.jpg 600 75            # 600px width, quality 75"
    echo ""
    echo "Output: public/FOR_PRODUCTION/[filename].[format]"
    echo "Formats: WebP (modern), JPEG (fallback)"
    echo ""
    echo "Quality: 0-100 (higher = better quality, larger file)"
    echo "Recommended: 75-85 for photos, 90-95 for graphics"
    exit 1
fi

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Error: File '$INPUT_FILE' not found"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "❌ Error: ImageMagick not found. Please install it first:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt install imagemagick"
    exit 1
fi

# Get file extension and basename
EXTENSION="${INPUT_FILE##*.}"
BASENAME=$(basename "$INPUT_FILE" | sed 's/\.[^.]*$//')
OUTPUT_DIR="public/FOR_PRODUCTION"

# Create FOR_PRODUCTION directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🖼️  Optimizing image..."
echo "   Input: $INPUT_FILE"
if [ -n "$WIDTH" ]; then
    echo "   Width: ${WIDTH}px (maintaining aspect ratio)"
else
    echo "   Dimensions: Original (no scaling)"
fi
echo "   Quality: $QUALITY"
echo ""

# Get original file size
ORIGINAL_SIZE=$(stat -f%z "$INPUT_FILE" 2>/dev/null || stat -c%s "$INPUT_FILE" 2>/dev/null)
ORIGINAL_KB=$((ORIGINAL_SIZE / 1024))

echo "📊 Original size: ${ORIGINAL_KB}KB"
echo ""

# Get image dimensions for processing decisions
DIMENSIONS=$(magick identify -format "%wx%h" "$INPUT_FILE")
WIDTH_PIXELS=$(echo $DIMENSIONS | cut -d'x' -f1)
HEIGHT_PIXELS=$(echo $DIMENSIONS | cut -d'x' -f2)

echo "📏 Original dimensions: $DIMENSIONS"

# Build resize parameter with smart capping
RESIZE_PARAM=""
if [ -n "$WIDTH" ]; then
    # User specified width
    RESIZE_PARAM="-resize ${WIDTH}x"
    echo "🔧 Resizing to: ${WIDTH}px width"
else
    # Auto-cap large images to 3840px max dimension
    if [ "$WIDTH_PIXELS" -gt 3840 ] || [ "$HEIGHT_PIXELS" -gt 3840 ]; then
        if [ "$WIDTH_PIXELS" -gt "$HEIGHT_PIXELS" ]; then
            RESIZE_PARAM="-resize 3840x"
            echo "🔧 Auto-capping width to: 3840px (was ${WIDTH_PIXELS}px)"
        else
            RESIZE_PARAM="-resize x3840"
            echo "🔧 Auto-capping height to: 3840px (was ${HEIGHT_PIXELS}px)"
        fi
    else
        echo "🔧 Keeping original dimensions"
    fi
fi

# Generate WebP (modern format)
WEBP_OUTPUT="${OUTPUT_DIR}/${BASENAME}.webp"
echo "🔄 Creating WebP... (this may take a moment for large images)"
magick "$INPUT_FILE" $RESIZE_PARAM -quality $QUALITY -strip -define webp:method=6 "$WEBP_OUTPUT"

# Generate optimized JPEG (fallback)
JPEG_OUTPUT="${OUTPUT_DIR}/${BASENAME}.jpg"
echo "🔄 Creating optimized JPEG..."
magick "$INPUT_FILE" $RESIZE_PARAM -quality $QUALITY -strip -interlace Plane "$JPEG_OUTPUT"

# Generate AVIF if supported (most modern format)
AVIF_OUTPUT="${OUTPUT_DIR}/${BASENAME}.avif"
echo "🔄 Creating AVIF (if supported)..."
if magick "$INPUT_FILE" $RESIZE_PARAM -quality $QUALITY -strip "$AVIF_OUTPUT" 2>/dev/null; then
    AVIF_SIZE=$(stat -f%z "$AVIF_OUTPUT" 2>/dev/null || stat -c%s "$AVIF_OUTPUT" 2>/dev/null)
    AVIF_KB=$((AVIF_SIZE / 1024))
    AVIF_COMPRESSION=$((100 - (AVIF_SIZE * 100 / ORIGINAL_SIZE)))
    echo "   ✅ AVIF: ${AVIF_KB}KB (${AVIF_COMPRESSION}% smaller)"
else
    echo "   ⚠️  AVIF not supported by this ImageMagick build"
fi

# Get output file sizes and calculate compression
WEBP_SIZE=$(stat -f%z "$WEBP_OUTPUT" 2>/dev/null || stat -c%s "$WEBP_OUTPUT" 2>/dev/null)
JPEG_SIZE=$(stat -f%z "$JPEG_OUTPUT" 2>/dev/null || stat -c%s "$JPEG_OUTPUT" 2>/dev/null)

WEBP_KB=$((WEBP_SIZE / 1024))
JPEG_KB=$((JPEG_SIZE / 1024))

WEBP_COMPRESSION=$((100 - (WEBP_SIZE * 100 / ORIGINAL_SIZE)))
JPEG_COMPRESSION=$((100 - (JPEG_SIZE * 100 / ORIGINAL_SIZE)))

# Function to format file size
format_size() {
    local size=$1
    if [ $size -gt 1048576 ]; then
        echo "$(echo "scale=1; $size / 1048576" | bc -l)MB"
    elif [ $size -gt 1024 ]; then
        echo "$(echo "scale=0; $size / 1024" | bc -l)KB"
    else
        echo "${size}B"
    fi
}

# Update file-sizes.json with output file sizes
update_file_sizes() {
    local file_path="$1"
    local file_size="$2"
    local json_file="lib/file-sizes.json"
    
    # Create lib directory if it doesn't exist
    mkdir -p "lib"
    
    # Initialize JSON file if it doesn't exist
    if [ ! -f "$json_file" ]; then
        echo "{}" > "$json_file"
    fi
    
    # Use node to update the JSON file (safer than sed/awk for JSON)
    node -e "
        const fs = require('fs');
        const path = '$json_file';
        const filePath = '$file_path';
        const fileSize = '$file_size';
        
        let data = {};
        try {
            const content = fs.readFileSync(path, 'utf8');
            data = JSON.parse(content);
        } catch (e) {
            data = {};
        }
        
        data[filePath] = fileSize;
        
        fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
    " 2>/dev/null || echo "⚠️  Could not update file-sizes.json (node not available)"
}

echo ""
echo "✅ Optimization complete!"
echo "   📁 Output directory: $OUTPUT_DIR"
echo ""
echo "   🖼️  WebP: ${BASENAME}.webp (${WEBP_KB}KB, ${WEBP_COMPRESSION}% smaller)"
echo "   🖼️  JPEG: ${BASENAME}.jpg (${JPEG_KB}KB, ${JPEG_COMPRESSION}% smaller)"
if [ -f "$AVIF_OUTPUT" ]; then
    echo "   🖼️  AVIF: ${BASENAME}.avif (${AVIF_KB}KB, ${AVIF_COMPRESSION}% smaller)"
fi

# Update file-sizes.json with the optimized files (using basename only)
WEBP_SIZE_FORMATTED=$(format_size $WEBP_SIZE)
JPEG_SIZE_FORMATTED=$(format_size $JPEG_SIZE)

# Use basename only (no path, no extension) for the key
update_file_sizes "${BASENAME}" "$WEBP_SIZE_FORMATTED"

if [ -f "$AVIF_OUTPUT" ]; then
    AVIF_SIZE_FORMATTED=$(format_size $AVIF_SIZE)
    # For AVIF, we'll use the same basename but note that WebP is preferred
    # The lookup function will prioritize WebP over AVIF
fi

echo ""
echo "   📤 Ready to upload to Bunny CDN!"
echo "   💡 Use WebP for modern browsers, JPEG for fallback"
echo "   📊 Updated lib/file-sizes.json with output file sizes"
