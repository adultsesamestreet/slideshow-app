# ZimaOS App Install Guide (CasaOS UI)

This guide shows how to install **slideshow-app** in ZimaOS/CasaOS using the **App Store → Custom Install** screens (like the screenshots you shared).

---

## Option A (Recommended): Import Docker Compose

This is the easiest and most repeatable method.

### 1) Prepare your image folders on ZimaOS

Create a folder on ZimaOS (example):

- `/DATA/Media/slideshow-images`

Inside it, create category folders:

- `landscape`
- `portrait`
- `square`
- `ai-landscape`
- `ai-portrait`
- `ai-square`
- `ai-animated`
- `animated-vertical`
- `ipad`
- `iphone`
- `tushy`
- `sketch-art`
- `home`
- `worship`
- `diaper-training`

### 2) In ZimaOS open **Custom Install**

- Go to **App Store** → **Custom Install**.
- In the Import dialog, use the **Docker Compose** tab (matches your screenshot with "Drop your Docker Compose file here").

### 3) Paste this compose content

Update only `IMAGES_PATH` and optional host port before submitting:

```yaml
version: '3.8'

services:
  slideshow-website:
    image: node:18-alpine
    container_name: slideshow-website
    working_dir: /app
    command: sh -c "npm ci --only=production && npm start"
    ports:
      - "3000:3000"
    volumes:
      - /DATA/AppData/slideshow-app:/app
      - /DATA/Media/slideshow-images:/app/images:ro
    environment:
      - NODE_ENV=production
      - PORT=3000
      - IMAGES_ROOT=/app/images
    restart: unless-stopped
```

> If you cloned this repo into `/DATA/AppData/slideshow-app`, leave the `/app` bind as-is. If not, replace with your real repo path.

### 4) Submit and install

- Tap **Submit** in Import.
- Review the settings screen.
- Tap **Install**.

### 5) Open the app

- Visit `http://<zimaos-ip>:3000`.
- Example: `http://192.168.68.68:3000`.

---

## Option B: Fill in Docker fields manually (Docker CLI tab flow)

Use this when you prefer entering fields one-by-one in the main settings form.

### Required fields

- **Docker Image**: `node`
- **Tag**: `18-alpine`
- **Title**: `slideshow-app`
- **Network**: `bridge`
- **Restart Policy**: `unless-stopped`

### Ports

Add one port mapping:

- **Host** `3000` → **Container** `3000` (TCP)

### Volumes

Add two mappings:

1. App source (read/write):
   - Host: `/DATA/AppData/slideshow-app`
   - Container: `/app`
2. Images (read-only recommended):
   - Host: `/DATA/Media/slideshow-images`
   - Container: `/app/images`

### Environment variables

Add:

- `NODE_ENV=production`
- `PORT=3000`
- `IMAGES_ROOT=/app/images`

### Container Command

Add command:

```bash
sh -c "cd /app && npm ci --only=production && npm start"
```

Then tap **Install**.

---

## After install: quick checks

1. Open the app URL and confirm homepage loads.
2. Check an API route:
   - `http://<zimaos-ip>:3000/api/landscape`
3. If blank/500:
   - Confirm image folders exist and are mounted to `/app/images`.
   - Confirm category names exactly match folder names.

---

## Troubleshooting

### App installs but page does not load

- Verify port mapping exists (`3000:3000`).
- Ensure no other app already uses host port `3000`.

### App loads but images missing

- Check mount path spelling (`/DATA/Media/slideshow-images`).
- Ensure folders are lowercase and match configured category names.

### Container restarts repeatedly

- Open logs in ZimaOS and check for npm/install errors.
- Confirm `/DATA/AppData/slideshow-app` really contains this repo files (`package.json`, `server.js`, HTML files).

---

## Notes on configuration

The app supports runtime overrides so you usually do **not** need to edit code:

- `PORT` controls listen port.
- `IMAGES_ROOT` controls where image folders are read from.
- `slideshow.config.json` controls category names and allowed extensions.
