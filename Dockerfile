# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the website files (excluding images directory)
COPY *.html ./
# COPY *.css ./
COPY *.js ./
COPY icons/ ./icons/
COPY style/ ./style/
COPY manifest.json ./

# Create the images directory structure (will be mounted from host)
RUN mkdir -p images/landscape \
    && mkdir -p images/portrait \
    && mkdir -p images/square \
    && mkdir -p images/ai-landscape \
    && mkdir -p images/ai-portrait \
    && mkdir -p images/ai-square \
    && mkdir -p images/ai-animated \
    && mkdir -p images/ipad \
    && mkdir -p images/iphone \
    && mkdir -p images/tushy \
    && mkdir -p images/sketch-art \
    && mkdir -p images/home \
    && mkdir -p images/worship \
    && mkdir -p images/diaper-training

# Expose the port the app runs on
EXPOSE 3000

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S slideshow -u 1001

# Change ownership of the app directory
RUN chown -R slideshow:nodejs /app
USER slideshow

# Start the application
CMD ["npm", "start"]
