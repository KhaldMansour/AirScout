# Use the official Node.js image as a base image
FROM node:20-alpine


RUN apk add --no-cache curl bash \
  && curl -sSL https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar -C /usr/local/bin -xz

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Run dockerize to wait for the MySQL service, then run migrations and start the app
CMD ["dockerize", "-wait", "tcp://mysql:3306", "-timeout", "15s", "npm", "run", "migrate", "&&", "npm", "run", "start:dev"]
