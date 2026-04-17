# slideshow-app

Creates a series of slides based on images located in an images directory. Uses Node.js + Express.

## Configuration

- Runtime/content config: `slideshow.config.json`
  - `categories`: folder names and API route names
  - `imageExtensions`: allowed media extensions
  - `imagesDir`: default relative image path
- Environment overrides:
  - `PORT`: HTTP port (default `3000`)
  - `IMAGES_ROOT`: absolute/relative folder used for serving images

## Local run

```bash
npm install
npm start
```

## Docker run

See `README-Docker.md` for full Docker + ZimaOS instructions.


## ZimaOS App Install

For CasaOS/ZimaOS custom app installation steps, see `README-ZimaOS-App.md`.
