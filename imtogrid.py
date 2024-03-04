import json
from PIL import Image

def image_to_grid(filename, grid_size_x, grid_size_y, threshold=160):
    im = Image.open(filename).convert("L")  # Convert to grayscale
    im = im.resize((grid_size_x, grid_size_y))  # Resize to match grid size
    im = im.rotate(90)  # Rotate the image 180 degrees

    white_cells = []  # List to store coordinates of white cells

    for y in range(grid_size_y):
        for x in range(grid_size_x):
            pixel = im.getpixel((x, y))
            if pixel >= threshold:
                white_cells.append((x, y))  # Add coordinates if the cell is white

    return white_cells

def main():
    grid_size_x = 80
    grid_size_y = 80

    num_images = 30
    image_filenames = [f"./images/{i}.jpg" for i in range(1, num_images + 1)]
    thresholds = [155] * num_images  # Use the same threshold for all images

    for i, (image_filename, threshold) in enumerate(zip(image_filenames, thresholds)):
        white_cells = image_to_grid(image_filename, grid_size_x, grid_size_y, threshold)

        output_json = f"./src/components/Sections/grids/output{i + 1}.json"
        with open(output_json, "w") as outfile:
            json.dump(white_cells, outfile)

if __name__ == "__main__":
    main()
