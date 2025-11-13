#!/bin/bash

# Batch video optimization script
# Usage: ./scripts/batch-optimize-videos.sh [width] [quality]
# Example: ./scripts/batch-optimize-videos.sh 1920 23

set -e

# Default values
DEFAULT_WIDTH=""  # Empty = keep original dimensions
DEFAULT_QUALITY=18  # High quality (18 = near lossless)

# Get arguments
WIDTH="${1:-$DEFAULT_WIDTH}"
QUALITY="${2:-$DEFAULT_QUALITY}"

# Check if optimize-video.sh exists
OPTIMIZE_SCRIPT="scripts/optimize-video.sh"
if [ ! -f "$OPTIMIZE_SCRIPT" ]; then
    echo "❌ Error: $OPTIMIZE_SCRIPT not found"
    exit 1
fi

# Make sure the optimize script is executable
chmod +x "$OPTIMIZE_SCRIPT"

echo "🚀 Batch Video Optimization"
if [ -n "$WIDTH" ]; then
    echo "   Width: ${WIDTH}px"
else
    echo "   Dimensions: Original"
fi
echo "   Quality: $QUALITY (18=high, 23=standard)"
echo "   Output: public/FOR_PRODUCTION/video/"
echo ""

# Find all video files in public directory (excluding FOR_PRODUCTION)
VIDEO_EXTENSIONS="mp4 mov avi mkv webm m4v flv wmv"
TOTAL_COUNT=0
PROCESSED_COUNT=0
SKIPPED_COUNT=0

echo "🔍 Scanning for videos..."

# Use a simpler approach to find and count videos
TEMP_FILE_LIST=$(mktemp)
find public -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" -o -iname "*.webm" -o -iname "*.m4v" -o -iname "*.flv" -o -iname "*.wmv" \) ! -path "*/FOR_PRODUCTION/*" > "$TEMP_FILE_LIST"

TOTAL_COUNT=$(wc -l < "$TEMP_FILE_LIST" | tr -d ' ')

if [ "$TOTAL_COUNT" -eq 0 ]; then
    echo "📂 No videos found in public directory"
    rm "$TEMP_FILE_LIST"
    exit 0
fi

echo "📊 Found $TOTAL_COUNT videos to process"
echo ""

# Process each video from the temp file list
while IFS= read -r file; do
    if [ -f "$file" ]; then
        PROCESSED_COUNT=$((PROCESSED_COUNT + 1))
        FILENAME=$(basename "$file")
        BASENAME_NO_EXT=$(basename "$file" | sed 's/\.[^.]*$//')
        
        echo "[$PROCESSED_COUNT/$TOTAL_COUNT] Processing: $FILENAME"
        
        # Check if output file already exists
        OUTPUT_FILE="public/FOR_PRODUCTION/video/${BASENAME_NO_EXT}.mp4"
        if [ -f "$OUTPUT_FILE" ]; then
            echo "   ⏭️  Skipping (already optimized)"
            SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
            echo ""
            continue
        fi
        
        # Get relative path for the optimize script (remove public/ prefix)
        RELATIVE_PATH=${file#public/}
        
        # Run optimization with the specified parameters
        if ./"$OPTIMIZE_SCRIPT" "$RELATIVE_PATH" "$WIDTH" "$QUALITY"; then
            echo "   ✅ Completed"
        else
            echo "   ❌ Failed"
        fi
        
        echo ""
    fi
done < "$TEMP_FILE_LIST"

# Clean up temp file
rm "$TEMP_FILE_LIST"

echo "🎉 Batch video optimization complete!"
echo "   Total videos: $TOTAL_COUNT"
echo "   Processed: $((PROCESSED_COUNT - SKIPPED_COUNT))"
echo "   Skipped: $SKIPPED_COUNT"
echo "   📁 Output: public/FOR_PRODUCTION/video/"
echo ""
echo "   💡 Tip: Use different settings for different video types:"
echo "      High quality: ./scripts/batch-optimize-videos.sh \"\" 18"
echo "      Standard: ./scripts/batch-optimize-videos.sh 1920 23"
echo "      Web optimized: ./scripts/batch-optimize-videos.sh 1280 25"
