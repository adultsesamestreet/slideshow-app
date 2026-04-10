#!/bin/bash

echo "========================================"
echo "   Slideshow Website Docker Starter"
echo "========================================"
echo

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "ERROR: Docker is not running!"
    echo "Please start Docker and try again."
    echo
    exit 1
fi

echo "Docker is running. Building and starting the container..."
echo
echo "This may take a few minutes on first run..."
echo

# Build and start the container
docker-compose up --build

echo
echo "Container stopped."
