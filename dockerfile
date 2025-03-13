# Use an official Node.js base image (Alpine for a smaller footprint)
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application files (except node_modules)
COPY . .

# Expose the port where the application will run
EXPOSE 8080

# Install nodemon globally for hot reloading
RUN npm install -g nodemon

# Default command for development
CMD ["nodemon", "--inspect=0.0.0.0", "src/index.js"]