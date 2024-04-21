# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y

# Copy package.json and package-lock.json and install dependencies before copying code for better caching
COPY package.json .
COPY package-lock.json .

# Install npm dependencies
RUN npm install -g npm && \
    npm install
# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 7000

# Start the React application
CMD ["npm", "run", "start"]