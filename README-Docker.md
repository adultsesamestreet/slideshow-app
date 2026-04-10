# Slideshow Website - Docker Setup Guide (including ZimaOS)

This app is now configurable so you do not need to edit `server.js` whenever image paths change.

## What changed

- `server.js` now reads settings from `slideshow.config.json`.
- You can override runtime values with environment variables (`PORT`, `IMAGES_ROOT`).
- `docker-compose.yml` reads values from `docker-config.env` and mounts your host image folder.

## Key configuration files

- `slideshow.config.json`: categories + allowed file extensions + defaults.
- `docker-config.env`: deployment-time settings (ports, mount paths).
- `docker-compose.yml`: wiring for container runtime.

## ZimaOS quick start

1. Put your images on ZimaOS in a persistent folder, for example:
   - `/DATA/Media/slideshow-images`
2. Keep category subfolders inside that path:
   - `landscape`, `portrait`, `square`, `ai-landscape`, `ai-portrait`, `ai-square`, `ai-animated`, `animated-vertical`, `ipad`, `iphone`, `tushy`, `sketch-art`, `home`, `worship`, `diaper-training`.
3. Update `docker-config.env`:
   ```env
   IMAGES_PATH=/DATA/Media/slideshow-images
   HOST_PORT=3000
   PORT=3000
   IMAGES_ROOT=/app/images
   ```
4. Start the stack:
   ```bash
   docker compose up -d --build
   ```
5. Open `http://<your-zimaos-ip>:3000`.

## Customizing categories (no code changes required)

Edit `slideshow.config.json`:

- Add/remove category names in `categories`.
- Update `imageExtensions` if you want to allow more file types.

Then restart:

```bash
docker compose up -d --build
```

## Troubleshooting

### Health check keeps failing

- Ensure `PORT` in `docker-config.env` matches the container port you want the app to listen on.
- Ensure `HOST_PORT` is not already in use.

### Images are missing

- Confirm `IMAGES_PATH` exists on the host and includes category subfolders.
- Confirm mount is present:
  ```bash
  docker inspect slideshow-website --format '{{ json .Mounts }}'
  ```

### Permission issues on ZimaOS

If your image folder is on a protected mount, ensure it can be read by the container runtime.

## Commands reference

```bash
# Start or rebuild
docker compose up -d --build

# Logs
docker compose logs -f slideshow-website

# Stop
docker compose down

# Validate config quickly
curl http://localhost:3000/api/landscape
```
