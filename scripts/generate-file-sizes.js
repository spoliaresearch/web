const fs = require("fs");
const path = require("path");

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  const sizeInBytes = stats.size;
  const sizeInKB = Math.round(sizeInBytes / 1024);
  const sizeInMB = (sizeInKB / 1024).toFixed(1);
  return sizeInKB > 1024 ? `${sizeInMB}MB` : `${sizeInKB}KB`;
}

function generateFileSizes() {
  const publicDir = path.join(process.cwd(), "public");
  const fileSizes = {};

  function processDirectory(dir, relativePath = "") {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const itemRelativePath = path.join(relativePath, item).replace(/\\/g, "/");

      if (fs.statSync(fullPath).isDirectory()) {
        processDirectory(fullPath, itemRelativePath);
      } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item)) {
        const publicPath = "/" + itemRelativePath;
        fileSizes[publicPath] = getFileSizeInKB(fullPath);
      }
    });
  }

  processDirectory(publicDir);

  // Write to lib folder
  const outputPath = path.join(process.cwd(), "lib", "file-sizes.json");
  fs.writeFileSync(outputPath, JSON.stringify(fileSizes, null, 2));

  console.log(`Generated file sizes for ${Object.keys(fileSizes).length} images`);
  console.log("Saved to:", outputPath);
}

generateFileSizes();
