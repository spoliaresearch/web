#!/bin/bash

# Generate poster images (first frame) from videos for CDN upload
# This creates lightweight JPEG thumbnails for appendix videos

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Source and destination directories
VIDEO_DIR="public/FOR_PRODUCTION/video"
POSTER_DIR="public/FOR_PRODUCTION/posters"

# Create poster directory if it doesn't exist
mkdir -p "$POSTER_DIR"

echo -e "${GREEN}🎬 Generating video poster images...${NC}\n"

# Counter for statistics
total=0
generated=0

# Process each video file
for video in "$VIDEO_DIR"/*.mp4; do
    # Get filename without path and extension
    filename=$(basename "$video" .mp4)
    poster_path="$POSTER_DIR/${filename}-poster.jpg"
    
    # Skip if poster already exists
    if [ -f "$poster_path" ]; then
        echo -e "${YELLOW}⏭️  Skipping $filename (poster exists)${NC}"
        ((total++))
        continue
    fi
    
    echo -e "${GREEN}📸 Generating poster for: $filename${NC}"
    
    # Extract frame at 0.5 seconds (usually a good representative frame)
    # -ss 0.5: seek to 0.5 seconds
    # -vframes 1: extract 1 frame
    # -q:v 2: high quality JPEG (scale 2-31, lower is better)
    ffmpeg -ss 0.5 -i "$video" -vframes 1 -q:v 2 "$poster_path" -y 2>/dev/null
    
    if [ $? -eq 0 ]; then
        # Get file size
        size=$(du -h "$poster_path" | cut -f1)
        echo -e "   ✓ Generated: ${filename}-poster.jpg (${size})"
        ((generated++))
    else
        echo -e "   ✗ Failed to generate poster for $filename"
    fi
    
    ((total++))
    echo ""
done

echo -e "\n${GREEN}✨ Complete!${NC}"
echo -e "Processed: $total videos"
echo -e "Generated: $generated new posters"
echo -e "\nPosters saved to: $POSTER_DIR"
echo -e "\n${YELLOW}📤 Next steps:${NC}"
echo -e "1. Review posters in $POSTER_DIR"
echo -e "2. Upload poster images to CDN: ${GREEN}https://s-img.b-cdn.net/${NC}"
echo -e "3. Use naming pattern: ${filename}-poster.jpg"

