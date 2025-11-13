#!/bin/bash

# Video optimization script
# Usage: ./scripts/optimize-video.sh input.mov [width] [quality]
# Example: ./scripts/optimize-video.sh gesture_final.mov 600 23

set -e

# Default values
DEFAULT_WIDTH=""  # Empty = keep original dimensions
DEFAULT_QUALITY=18  # High quality (18 = near lossless)

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
    echo "Usage: $0 input.mov [width] [quality]"
    echo ""
    echo "Examples:"
    echo "  $0 gesture_final.mov           # From public/, original dimensions, high quality"
    echo "  $0 gesture_final.mov 800       # 800px width, high quality"
    echo "  $0 gesture_final.mov 600 23    # 600px width, standard quality"
    echo ""
    echo "Output: public/FOR_PRODUCTION/[filename].mp4"
    echo ""
    echo "Quality: 18-28 (lower = better quality, larger file)"
    exit 1
fi

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Error: File '$INPUT_FILE' not found"
    exit 1
fi

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: ffmpeg not found. Please install it first:"
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu: sudo apt install ffmpeg"
    exit 1
fi

# Generate output filename in FOR_PRODUCTION/video folder
BASENAME=$(basename "$INPUT_FILE" | sed 's/\.[^.]*$//')
OUTPUT_DIR="public/FOR_PRODUCTION/video"
OUTPUT_FILE="${OUTPUT_DIR}/${BASENAME}.mp4"

# Create FOR_PRODUCTION directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "🎬 Converting to MP4..."
echo "   Input: $INPUT_FILE"
echo "   Output: $OUTPUT_FILE"
if [ -n "$WIDTH" ]; then
    echo "   Width: ${WIDTH}px (maintaining aspect ratio)"
else
    echo "   Dimensions: Original (no scaling)"
fi
echo "   Quality: $QUALITY (18=high, 23=standard)"
echo ""

# Get original file size
ORIGINAL_SIZE=$(stat -f%z "$INPUT_FILE" 2>/dev/null || stat -c%s "$INPUT_FILE" 2>/dev/null)
ORIGINAL_MB=$((ORIGINAL_SIZE / 1024 / 1024))

echo "📊 Original size: ${ORIGINAL_MB}MB"
echo ""

# Build ffmpeg command based on whether width is specified
if [ -n "$WIDTH" ]; then
    # Scale to specified width
    ffmpeg -i "$INPUT_FILE" \
        -vf "scale=${WIDTH}:-2" \
        -c:v libx264 \
        -crf $QUALITY \
        -preset slow \
        -c:a aac \
        -b:a 192k \
        -movflags +faststart \
        -y \
        "$OUTPUT_FILE" < /dev/null
else
    # Keep original dimensions
    ffmpeg -i "$INPUT_FILE" \
        -c:v libx264 \
        -crf $QUALITY \
        -preset slow \
        -c:a aac \
        -b:a 192k \
        -movflags +faststart \
        -y \
        "$OUTPUT_FILE" < /dev/null
fi

# Get output file size
OUTPUT_SIZE=$(stat -f%z "$OUTPUT_FILE" 2>/dev/null || stat -c%s "$OUTPUT_FILE" 2>/dev/null)
OUTPUT_MB=$((OUTPUT_SIZE / 1024 / 1024))
COMPRESSION=$((100 - (OUTPUT_SIZE * 100 / ORIGINAL_SIZE)))

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

# Update file-sizes.json with output file size
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
echo "   Output: $OUTPUT_FILE"
echo "   Final size: ${OUTPUT_MB}MB"
echo "   Compression: ${COMPRESSION}% smaller"
echo "   📁 Saved to: public/FOR_PRODUCTION/"

# Update file-sizes.json with the optimized video (using basename only)
OUTPUT_SIZE_FORMATTED=$(format_size $OUTPUT_SIZE)
OUTPUT_FILENAME=$(basename "$OUTPUT_FILE")
# Remove extension to get basename
BASENAME_NO_EXT="${OUTPUT_FILENAME%.*}"
update_file_sizes "${BASENAME_NO_EXT}" "$OUTPUT_SIZE_FORMATTED"

echo "   📤 Ready to upload to Bunny CDN!"
echo "   📊 Updated lib/file-sizes.json with output file size"
