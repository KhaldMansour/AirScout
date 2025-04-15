# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env.example file to .env
COPY .env .env

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
