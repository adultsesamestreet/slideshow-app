# Slideshow Website - Docker Setup Guide

This guide will help you set up and run the slideshow website using Docker, even if you're new to Docker.

## What This Does

The Docker container runs your slideshow website and allows you to point the `images` directory to any location on your computer. This means:
- You can keep your images on your local drive
- The website will automatically see any new images you add
- You don't need to rebuild the container when adding new images
- Multiple people can use the same container with different image collections

## Prerequisites

1. **Install Docker Desktop** (Windows/Mac) or Docker Engine (Linux)
   - Windows/Mac: Download from [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - Linux: Follow instructions at [Docker Engine](https://docs.docker.com/engine/install/)

2. **Verify Docker is working**
   ```bash
   docker --version
   docker-compose --version
   ```

## Quick Start (Recommended)

### Step 1: Prepare Your Images Directory

1. **Create a folder** anywhere on your computer to store your images
   - Example: `C:\MySlideshowImages` (Windows) or `/home/user/slideshow-images` (Linux/Mac)
   
2. **Copy your images** into this folder, maintaining the same structure:
   ```
   MySlideshowImages/
   ├── landscape/
   ├── portrait/
   ├── square/
   ├── ai-landscape/
   ├── ai-portrait/
   ├── ai-square/
   ├── ai-animated/
   ├── ipad/
   ├── iphone/
   ├── tushy/
   ├── sketch-art/
   ├── home/
   ├── worship/
   └── diaper-training/
   ```

### Step 2: Update the Docker Compose File

1. **Open** `docker-compose.yml` in a text editor
2. **Change this line**:
   ```yaml
   - ./images:/app/images:ro
   ```
   **To point to your images folder**:
   
   **Windows example:**
   ```yaml
   - C:\MySlideshowImages:/app/images:ro
   ```
   
   **Linux/Mac example:**
   ```yaml
   - /home/user/slideshow-images:/app/images:ro
   ```

### Step 3: Build and Run

1. **Open a terminal/command prompt** in the folder containing your website files
2. **Build and start the container**:
   ```bash
   docker-compose up --build
   ```
3. **Wait for the build to complete** (first time takes a few minutes)
4. **Open your browser** and go to: `http://localhost:3000`

### Step 4: Stop the Container

When you're done:
```bash
docker-compose down
```

## Alternative: Using Docker Commands Directly

If you prefer not to use docker-compose:

### Build the Image
```bash
docker build -t slideshow-website .
```

### Run the Container
```bash
docker run -d \
  --name slideshow-website \
  -p 3000:3000 \
  -v "C:\MySlideshowImages:/app/images:ro" \
  slideshow-website
```

**Replace** `C:\MySlideshowImages` with your actual images folder path.

## Troubleshooting

### Port Already in Use
If you get an error about port 3000 being in use:
1. **Change the port** in `docker-compose.yml`:
   ```yaml
   ports:
     - "8080:3000"  # Now accessible at http://localhost:8080
   ```

### Permission Denied (Linux/Mac)
If you get permission errors:
1. **Check folder permissions**:
   ```bash
   ls -la /path/to/your/images
   ```
2. **Fix permissions** if needed:
   ```bash
   chmod 755 /path/to/your/images
   ```

### Images Not Showing
1. **Check the volume mount** in docker-compose.yml
2. **Verify the folder structure** matches what the website expects
3. **Check container logs**:
   ```bash
   docker-compose logs slideshow-website
   ```

### Container Won't Start
1. **Check if Docker is running**
2. **Verify the images folder path** exists
3. **Check the logs**:
   ```bash
   docker-compose logs slideshow-website
   ```

## Advanced Configuration

### Custom Port
Change the port in `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Host port : Container port
```

### Auto-restart
The container is already configured to restart automatically. To disable:
```yaml
restart: "no"
```

### Environment Variables
Add custom environment variables:
```yaml
environment:
  - NODE_ENV=production
  - CUSTOM_VAR=value
```

## File Structure

Your project should look like this:
```
your-website-folder/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── server.js
├── index.html
├── [other HTML/CSS/JS files]
└── README-Docker.md
```

## Updating the Website

To update the website code:
1. **Make your changes** to the HTML/CSS/JS files
2. **Rebuild the container**:
   ```bash
   docker-compose up --build
   ```

**Note**: Your images will remain accessible since they're mounted as a volume.

## Security Notes

- The container runs as a non-root user for security
- The images directory is mounted as read-only (`:ro`)
- The container exposes only port 3000
- Health checks ensure the service is running properly

## Need Help?

If you encounter issues:
1. **Check the logs**: `docker-compose logs slideshow-website`
2. **Verify Docker is running**: `docker info`
3. **Check your images folder path** exists and has the right structure
4. **Ensure no other service** is using port 3000

## Example Commands Reference

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f slideshow-website

# Stop the service
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Check container status
docker-compose ps

# Access container shell (for debugging)
docker exec -it slideshow-website sh
```
