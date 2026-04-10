const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3069;

// Serve all static files from the project root
app.use(express.static(__dirname));

// Serve static images for each category
app.use('/images/landscape', express.static(path.join(__dirname, 'images', 'landscape')));
app.use('/images/portrait', express.static(path.join(__dirname, 'images', 'portrait')));
app.use('/images/square', express.static(path.join(__dirname, 'images', 'square')));
app.use('/images/ai-landscape', express.static(path.join(__dirname, 'images', 'ai-landscape')));
app.use('/images/ai-portrait', express.static(path.join(__dirname, 'images', 'ai-portrait')));
app.use('/images/ai-square', express.static(path.join(__dirname, 'images', 'ai-square')));
app.use('/images/ai-animated', express.static(path.join(__dirname, 'images', 'ai-animated')));
app.use('/images/ipad', express.static(path.join(__dirname, 'images', 'ipad')));
app.use('/images/iphone', express.static(path.join(__dirname, 'images', 'iphone')));
app.use('/images/tushy', express.static(path.join(__dirname, 'images', 'tushy')));
app.use('/images/sketch-art', express.static(path.join(__dirname, 'images', 'sketch-art')));
app.use('/images/home', express.static(path.join(__dirname, 'images', 'home')));
app.use('/images/worship', express.static(path.join(__dirname, 'images', 'worship')));
app.use('/images/animated-vertical', express.static(path.join(__dirname, 'images', 'animated-vertical')));
app.use('/images/diaper-training', express.static(path.join(__dirname, 'images', 'diaper-training')));

// Helper: Create an API endpoint to list images for a given category
function createImageAPI(category) {
  app.get(`/api/${category}`, (req, res) => {
    const folder = path.join(__dirname, 'images', category);
    fs.readdir(folder, (err, files) => {
      if (err) {
        return res.status(500).send(`Error reading ${category} images`);
      }
      const imageFiles = files.filter(file => {
        return ['.jpg', '.jpeg', '.png', '.gif', '.mp4'].includes(path.extname(file).toLowerCase());
      });
      const imagePaths = imageFiles.map(file => `/images/${category}/${file}`);
      res.json(imagePaths);
    });
  });
}

const categories = ['landscape', 'portrait', 'square', 'ipad', 'iphone', 'tushy', 'sketch-art', 'worship', 'diaper-training', 'ai-landscape', 'ai-portrait', 'ai-square', 'ai-animated', 'animated-vertical'];
categories.forEach(createImageAPI);

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// The theme pages (landscape.html, portrait.html, etc.) are served as static files
// Since we use express.static(__dirname), these files will be available by name

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// JavaScript Document