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

RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
  && chmod +x wait-for-it.sh

# Expose the port that the app will run on
EXPOSE 3000

# Run wait-for-it.sh to wait for the MySQL service, then run migrations and start the app
CMD ["sh", "-c", "./wait-for-it.sh mysql:3306 -- npm run migrate && npm run start:dev"]
