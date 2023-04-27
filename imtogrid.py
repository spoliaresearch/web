import json
from PIL import Image

def image_to_grid(filename, square_size, grid_size_x, grid_size_y, threshold=160):
    im = Image.open(filename).convert("L")  # Convert to grayscale
    im = im.resize((grid_size_x, grid_size_y))  # Resize to match grid size
    im = im.rotate(180)  # Rotate the image 90 degrees to the right

    grid = []

    for y in range(grid_size_y):
        row = []
        for x in range(grid_size_x):
            pixel = im.getpixel((x, y))
            cell_color = 'black' if pixel < threshold else 'white'
            row.append({'color': cell_color})
        grid.append(row)

    return grid

def main():
    square_size = 13.333333333333334
    grid_size_x = 80
    grid_size_y = 80

    num_images = 30
    image_filenames = [f"./images/{i}.jpg" for i in range(1, num_images + 1)]
    thresholds = [155] * num_images  # Use the same threshold for all images

    for i, (image_filename, threshold) in enumerate(zip(image_filenames, thresholds)):
        grid = image_to_grid(image_filename, square_size, grid_size_x, grid_size_y, threshold)

        output_json = f"output{i + 1}.json"
        with open(output_json, "w") as outfile:
            json.dump(grid, outfile)

if __name__ == "__main__":
    main()
