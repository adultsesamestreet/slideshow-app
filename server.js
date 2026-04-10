const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const configPath = path.join(__dirname, 'slideshow.config.json');
const rawConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const port = Number(process.env.PORT || rawConfig.port || 3000);
const imageExtensions = new Set(
  (rawConfig.imageExtensions || ['.jpg', '.jpeg', '.png', '.gif', '.mp4']).map(ext =>
    ext.toLowerCase(),
  ),
);
const categories = rawConfig.categories || [];

const imagesRoot = path.resolve(
  process.env.IMAGES_ROOT || path.join(__dirname, rawConfig.imagesDir || 'images'),
);

// Serve all static files from the project root
app.use(express.static(__dirname));

// Serve static images for each category
categories.forEach(category => {
  app.use(`/images/${category}`, express.static(path.join(imagesRoot, category)));
});

// Helper: Create an API endpoint to list images for a given category
function createImageAPI(category) {
  app.get(`/api/${category}`, (req, res) => {
    const folder = path.join(imagesRoot, category);

    fs.readdir(folder, (err, files) => {
      if (err) {
        return res.status(500).json({
          error: `Error reading ${category} images`,
          category,
          folder,
        });
      }

      const imageFiles = files.filter(file => imageExtensions.has(path.extname(file).toLowerCase()));
      const imagePaths = imageFiles.map(file => `/images/${category}/${file}`);
      res.json(imagePaths);
    });
  });
}

categories.forEach(createImageAPI);

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Images root: ${imagesRoot}`);
  console.log(`Categories: ${categories.join(', ')}`);
});
