import os
from PIL import Image
import numpy as np
import logging
from scipy.ndimage import gaussian_filter

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(message)s',
    datefmt='%H:%M:%S'
)

def resize_image(image, max_size=800):
    """Resize image maintaining aspect ratio with max dimension of 800px"""
    width, height = image.size
    if width > height:
        if width > max_size:
            ratio = max_size / width
            new_size = (max_size, int(height * ratio))
            logging.info(f"Resizing image to {new_size}")
            return image.resize(new_size, Image.Resampling.LANCZOS)
    else:
        if height > max_size:
            ratio = max_size / height
            new_size = (int(width * ratio), max_size)
            logging.info(f"Resizing image to {new_size}")
            return image.resize(new_size, Image.Resampling.LANCZOS)
    return image

def adjust_image(image, brightness=1.1, midtones=1.05):
    """Adjust image brightness and midtones"""
    img_array = np.array(image, dtype=float)
    
    # Adjust brightness
    img_array = img_array + brightness
    np.clip(img_array, 0, 255, out=img_array)
    
    # Adjust midtones (gamma correction)
    img_array = 255 * ((img_array / 255) ** (1/midtones))
    
    # Increase contrast
    img_array = np.clip((img_array - 127) * 1.5 + 127, 0, 255)
    
    return Image.fromarray(np.uint8(img_array))

def floyd_steinberg_dithering(image, scale=8):
    logging.info("Applying Floyd-Steinberg dithering")
    
    # Convert image to grayscale numpy array and normalize to 0-1
    img_array = np.array(image, dtype=float) / 255.0
    height, width = img_array.shape
    
    # Apply scaling factor to increase pixelation
    scaled_width = width // scale
    scaled_height = height // scale
    img_array = np.array(Image.fromarray((img_array * 255).astype('uint8')).resize(
        (scaled_width, scaled_height), 
        Image.Resampling.LANCZOS
    )) / 255.0
    
    height, width = img_array.shape
    
    # Invert the image before dithering
    # img_array = 1.0 - img_array
    
    for y in range(height-1):
        for x in range(width-1):
            old_pixel = img_array[y, x]
            new_pixel = round(old_pixel)
            img_array[y, x] = new_pixel
            error = old_pixel - new_pixel
            
            # Distribute error using Floyd-Steinberg coefficients
            if x + 1 < width:
                img_array[y, x + 1] += error * 7/16  # right
            if y + 1 < height:
                if x > 0:
                    img_array[y + 1, x - 1] += error * 3/16  # down-left
                img_array[y + 1, x] += error * 5/16  # down
                if x + 1 < width:
                    img_array[y + 1, x + 1] += error * 1/16  # down-right
    
    # Convert back to 0-255 range and scale up
    final_img = Image.fromarray((img_array * 255).astype('uint8')).resize(
        (width * scale, height * scale), 
        Image.Resampling.NEAREST
    )
    
    return final_img

def image_to_svg_path(image):
    logging.info("Converting to SVG")
    width, height = image.size
    pixels = np.array(image)
    square_size = 8  # Match the scale from dithering
    
    path_data = []
    current_x = None
    current_y = None
    run_length = 0
    
    for x in range(0, width, square_size):
        for y in range(0, height, square_size):
            # Check if this square should be black
            if pixels[y:y+square_size, x:x+square_size].mean() < 128:
                if current_x is None:
                    path_data.append(f"M{x},{y}h{square_size}v{square_size}h{-square_size}z")
                    current_x = x
                    current_y = y
                elif x == current_x + square_size and y == current_y:
                    run_length += 1
                else:
                    if run_length > 0:
                        path_data[-1] = f"M{current_x},{current_y}h{square_size*run_length}v{square_size}h{-square_size*run_length}z"
                    path_data.append(f"M{x},{y}h{square_size}v{square_size}h{-square_size}z")
                    current_x = x
                    current_y = y
                    run_length = 1
    
    # Handle final run
    if run_length > 0:
        path_data[-1] = f"M{current_x},{current_y}h{square_size*run_length}v{square_size}h{-square_size*run_length}z"
    
    # Create minimal valid SVG
    path_str = "".join(path_data)
    svg = f'<svg viewBox="0 0 {width} {height}"><path d="{path_str}" fill="#000"/></svg>'
    
    return svg

def process_image(input_path, output_path):
    os.makedirs(output_path, exist_ok=True)
    image_files = [f for f in os.listdir(input_path) if f.endswith(('.jpg', '.jpeg', '.png'))]
    
    for img_file in image_files:
        logging.info(f"Processing {img_file}")
        
        # Open and convert image to grayscale
        img = Image.open(os.path.join(input_path, img_file)).convert('L')
        
        # Resize image
        img = resize_image(img)
        
        # Adjust brightness and midtones
        img = adjust_image(img)
        
        # Apply Floyd-Steinberg dithering
        dithered_img = floyd_steinberg_dithering(img)
        
        # Convert to SVG
        svg_content = image_to_svg_path(dithered_img)
        
        # Save SVG file
        output_file = os.path.join(output_path, f"{os.path.splitext(img_file)[0]}.svg")
        with open(output_file, 'w') as f:
            f.write(svg_content)
        
        logging.info(f"Successfully saved {output_file}")

def main():
    input_directory = "./diagrams"
    output_directory = "./static"
    
    logging.info("Starting image processing")
    process_image(input_directory, output_directory)
    logging.info("Processing complete!")

if __name__ == "__main__":
    main()
